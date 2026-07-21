# Matcha Cake Shop Web App

<img width="800" height="450" alt="Matcha Cake Shop UI" src="./images/Front-end 1.png" />

<img width="800" height="450" alt="Matcha Cake Shop UI" src="./images/Front-end 2.png" />

## Project Overview

Matcha Cake Shop Web App is a demonstration e-commerce application built with AWS cloud-native microservices. It includes a React frontend, Python FastAPI backend services, DynamoDB and PostgreSQL data stores, and SNS/SQS-based messaging.

This project showcases a complete end-to-end architecture:
- Frontend user interface
- Backend microservices
- Data storage layer
- API and access layer
- Integration and notification flow

## Architecture Overview

Below is the architecture diagram for this application:

<img width="800" height="450" alt="AWS Architecture" src="./images/AWS Architecture.png" />

### AWS Services Used
- **Frontend**: S3 + CloudFront + Route53
- **API**: API Gateway (HTTP API) + ALB
- **Compute**: ECS / Fargate
- **Authentication**: Cognito User Pools
- **Databases**: DynamoDB + RDS PostgreSQL
- **Messaging**: SNS + SQS (+ SES)
- **Networking**: VPC, Subnets, Security Groups, NAT Gateway
- **Logging & Management**: CloudWatch, Systems Manager
- **Security**: IAM

## Project Structure

```
Matcha-Cake-Shop-Web-App/
├── services/                    # Backend microservices
│   ├── product-service/         # Python FastAPI
│   ├── cart-service/            # Python FastAPI
│   ├── user-service/            # Python FastAPI
│   └── order-service/           # Python FastAPI
├── frontend/
│   └── react-app/               # React frontend application
├── data/                        # Product data and S3 upload scripts
└── install-prerequisites.sh     # Prerequisite installation script
```

### Microservices
- **Product Service** - Product catalog management (DynamoDB)
- **Cart Service** - Shopping cart operations (DynamoDB)
- **User Service** - User profile management (RDS PostgreSQL)
- **Order Service** - Order processing and orchestration (RDS PostgreSQL)
- **Notification Service** - Asynchronous notification and email delivery (SNS/SQS/SES)

## Quick Start

1. Navigate to the frontend folder: `cd frontend/react-app`
2. Install dependencies: `npm install`
3. Start the local development server: `npm start`


