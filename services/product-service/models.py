from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    product_id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
