from fastapi import FastAPI, HTTPException
from typing import List
from models import Product
from database import get_products_table
from boto3.dynamodb.conditions import Attr
from config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Product Service")

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting Product Service with config:")
    logger.info(f"  Environment: {settings.environment}")
    logger.info(f"  AWS Region: {settings.aws_region}")
    logger.info(f"  Products Table: {settings.products_table}")
    if settings.environment == "local":
        logger.info(f"  DynamoDB Endpoint: {settings.dynamodb_endpoint}")

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "product-service"}

@app.get("/products", response_model=List[Product])
def list_products(category: str = None):
    table = get_products_table()
    
    if category:
        response = table.scan(FilterExpression=Attr('category').eq(category))
    else:
        response = table.scan()
    
    return response.get('Items', [])

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    table = get_products_table()
    response = table.get_item(Key={'product_id': product_id})
    
    if 'Item' not in response:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return response['Item']

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
