---
title: "PoC Deployment"
layout: default
nav_order: 4
---

# PoC Deployment Guide

Comprehensive guide for deploying Proof-of-Concept (PoC) implementations of the Ona platform.

## Overview

This guide provides step-by-step instructions for deploying a complete PoC environment for the Ona platform. The PoC deployment is designed to validate technical feasibility and demonstrate value to potential clients within 1 week.

### Target Audience

- **Internal Engineering Team**: Primary users for client deployment and infrastructure management
- **Sales Engineering**: For PoC demonstrations and technical discussions with prospects
- **DevOps/SRE**: For PoC deployment and ongoing maintenance
- **Client Success**: For understanding deployment timelines and capabilities

### PoC Objectives

- **Technical Validation**: Prove the platform works with client data
- **Value Demonstration**: Show ROI and business benefits
- **Integration Testing**: Validate data flows and API integrations
- **Performance Assessment**: Evaluate system performance under load
- **User Experience**: Gather feedback on usability and features

## Prerequisites

### System Requirements

- **Python 3.10+**: CRITICAL - Use python3.10, not python3 (system version is 3.9)
- **AWS CLI**: Configured with appropriate credentials and permissions
- **Internet Access**: Required for AWS Bedrock API calls and package installation
- **Storage**: Local storage for upload tracking (`~/.asoba/uploads/`)
- **Memory**: Minimum 4GB RAM for local development
- **Network**: Access to AWS services in target regions

### AWS Requirements

- **AWS Account**: Access to AWS services in target regions
- **IAM Permissions**: EC2, Lambda, API Gateway, S3, DynamoDB, CloudWatch
- **VPC Setup**: Default VPC or custom VPC with public/private subnets
- **Security Groups**: Configured for required services
- **Key Pair**: EC2 key pair for SSH access

### Client Requirements

- **Data Access**: Sample inverter data for testing
- **API Credentials**: Access to client's monitoring systems (if applicable)
- **Network Access**: VPN or direct network access to client infrastructure (if required)
- **Compliance Requirements**: Understanding of client's security and compliance needs

## Quick Deployment Checklist

| Phase | Task | Status | Notes |
|-------|------|--------|-------|
| Pre-Deployment | Client requirements gathering | □ Complete | Technical and business requirements |
| Pre-Deployment | AWS account setup | □ Complete | Target regions and services |
| PoC | MVP infrastructure deployment | □ Complete | Section 0: MVP/PoC Setup |
| PoC | Client data integration | □ Complete | Data upload and validation |
| PoC | End-to-end testing | □ Complete | Complete workflow validation |
| PoC | Demo preparation | □ Complete | Presentation materials |

## MVP/PoC Setup

### Infrastructure Components

#### AWS Services Required

| Service | Purpose | Estimated Cost |
|---------|---------|----------------|
| Lambda Functions | API endpoints and processing | $50/month |
| API Gateway | REST API management | $10/month |
| S3 Bucket | Data storage, web hosting, client outputs | $15/month |
| DynamoDB (api_keys table) | API key management and authentication | $10/month |
| CloudFront CDN | Static website hosting and caching | $10/month |
| CloudWatch Monitoring | Lambda monitoring, logs, metrics | $15/month |
| EC2 g5.2xlarge (PolicyAnalyst LLM) | PolicyAnalyst LLM inference with vLLM | $1,052/month |
| **Total Infrastructure** | | **$1,177/month** |

#### Deployed API Endpoints

| API Gateway ID | API Name | Endpoints | Lambda Function |
|----------------|----------|-----------|-----------------|
| yn058ezh38 | ingestHistoricalLoadData | POST /upload_train<br/>POST /upload_historical | ingestHistoricalData |
| xkg3s0npv0 | ingestNowcastLoadData | POST / | ingestNowcastData |
| x0o7xd1uq7 | TrainForecaster | POST / | trainForecaster |
| ul4rjb4twc | dataInterpolation | POST / | dataInterpolation |
| xcik92yqcg | generateForecast | POST / | generateForecast |
| lxil9blih0 | onDemandActions | POST / | onDemandActions |
| rgkv5lgoll | LogsProxyApi | POST / | LogsProxyApi |

### Implementation Timeline

| Day | Task | Deliverable |
|-----|------|-------------|
| Day 1-2 | Infrastructure Setup | AWS resources deployed, PolicyAnalyst LLM running |
| Day 3-4 | API Integration | Terminal app configured, API endpoints tested |
| Day 5-6 | Data Pipeline | Data upload and forecast generation working |
| Day 7 | Testing & Demo | End-to-end workflow demonstration |

### MVP Capabilities

- **Data Operations**: Upload inverter data, generate energy forecasts
- **AI Code Generation**: Generate, analyze, and refactor code using PolicyAnalyst LLM
- **OODA Loop**: Detect faults, diagnose issues, schedule maintenance, create BOMs
- **Search**: Enhanced code search across repositories
- **Authentication**: API key management and secure access
- **Monitoring**: Basic health checks and logging

### MVP Limitations

- **Single Region**: No cross-region redundancy or failover
- **Limited Scale**: Designed for PoC validation, not production load
- **Basic Security**: Standard AWS security, no advanced compliance
- **Manual Operations**: Limited automation and orchestration
- **No SLA**: No guaranteed uptime or performance commitments
- **Limited Integration**: Basic API endpoints, no advanced integrations

## Step-by-Step Deployment

### Step 1: AWS Infrastructure Setup

#### 1.1 Create Security Groups

```bash
# Security group for ALB
aws ec2 create-security-group \
  --group-name PolicyAnalyst-ALB-SG \
  --description "Security group for PolicyAnalyst ALB" \
  --vpc-id $VPC_ID

ALB_SG_ID=$(aws ec2 describe-security-groups --group-names PolicyAnalyst-ALB-SG --query 'SecurityGroups[0].GroupId' --output text)

# Allow HTTP traffic to ALB
aws ec2 authorize-security-group-ingress \
  --group-id $ALB_SG_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Security group for EC2 instances
aws ec2 create-security-group \
  --group-name PolicyAnalyst-EC2-SG \
  --description "Security group for PolicyAnalyst instances" \
  --vpc-id $VPC_ID

EC2_SG_ID=$(aws ec2 describe-security-groups --group-names PolicyAnalyst-EC2-SG --query 'SecurityGroups[0].GroupId' --output text)

# Allow traffic from ALB to instances
aws ec2 authorize-security-group-ingress \
  --group-id $EC2_SG_ID \
  --protocol tcp \
  --port 8000 \
  --source-group $ALB_SG_ID

# Allow SSH (optional, for debugging)
aws ec2 authorize-security-group-ingress \
  --group-id $EC2_SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr YOUR_IP/32
```

#### 1.2 Create IAM Role

```bash
# Create trust policy
cat > trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Create role
aws iam create-role \
  --role-name PolicyAnalyst-EC2-Role \
  --assume-role-policy-document file://trust-policy.json

# Attach policies for CloudWatch and SSM
aws iam attach-role-policy \
  --role-name PolicyAnalyst-EC2-Role \
  --policy-arn arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy

aws iam attach-role-policy \
  --role-name PolicyAnalyst-EC2-Role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# Create instance profile
aws iam create-instance-profile --instance-profile-name PolicyAnalyst-Instance-Profile
aws iam add-role-to-instance-profile \
  --instance-profile-name PolicyAnalyst-Instance-Profile \
  --role-name PolicyAnalyst-EC2-Role
```

#### 1.3 Launch EC2 Instance

```bash
# Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c7217cdde317cfec \
  --count 1 \
  --instance-type g5.2xlarge \
  --key-name your-key-pair \
  --security-group-ids $EC2_SG_ID \
  --subnet-id $SUBNET_ID \
  --iam-instance-profile Name=PolicyAnalyst-Instance-Profile \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=PolicyAnalyst-LLM}]'
```

### Step 2: PolicyAnalyst LLM Setup

#### 2.1 Connect to Instance

```bash
# Get instance IP
INSTANCE_ID=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=PolicyAnalyst-LLM" --query 'Reservations[0].Instances[0].InstanceId' --output text)
INSTANCE_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

# Connect to instance
ssh -i your-key.pem ubuntu@$INSTANCE_IP
```

#### 2.2 Install Dependencies

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Python 3.10
sudo apt install -y python3.10 python3.10-pip python3.10-venv

# Install NVIDIA drivers
sudo apt install -y nvidia-driver-535

# Install CUDA toolkit
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
sudo sh cuda_11.8.0_520.61.05_linux.run --silent --driver --toolkit --samples

# Set environment variables
echo 'export PATH=/usr/local/cuda-11.8/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

#### 2.3 Install vLLM and PolicyAnalyst

```bash
# Install vLLM
pip3.10 install vllm

# Install Ona Terminal
pip3.10 install ona-terminal

# Test GPU
nvidia-smi
python3.10 -c "import torch; print(torch.cuda.is_available())"
```

#### 2.4 Download and Load Model

```bash
# Create model directory
mkdir -p /home/ubuntu/models
cd /home/ubuntu/models

# Download model (this will take time)
python3.10 -c "
from vllm import LLM
llm = LLM(model='mistralai/Mistral-7B-Instruct-v0.2', gpu_memory_utilization=0.9)
print('Model loaded successfully')
"
```

### Step 3: API Gateway Setup

#### 3.1 Create API Gateway

```bash
# Create REST API
aws apigateway create-rest-api \
  --name "PolicyAnalyst-API" \
  --description "PolicyAnalyst API Gateway"

# Get API ID
API_ID=$(aws apigateway get-rest-apis --query 'items[?name==`PolicyAnalyst-API`].id' --output text)

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[?path==`/`].id' --output text)
```

#### 3.2 Create Resources and Methods

```bash
# Create /health resource
aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part "health"

HEALTH_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[?path==`/health`].id' --output text)

# Create GET method for /health
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $HEALTH_ID \
  --http-method GET \
  --authorization-type NONE

# Create integration
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $HEALTH_ID \
  --http-method GET \
  --type MOCK \
  --request-templates '{"application/json":"{\"statusCode\": 200}"}'

# Create method response
aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $HEALTH_ID \
  --http-method GET \
  --status-code 200 \
  --response-models '{"application/json":"Empty"}'
```

### Step 4: Lambda Functions Setup

#### 4.1 Create Lambda Functions

```bash
# Create ingestHistoricalData function
aws lambda create-function \
  --function-name ingestHistoricalData \
  --runtime python3.10 \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512

# Create ingestNowcastData function
aws lambda create-function \
  --function-name ingestNowcastData \
  --runtime python3.10 \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 512

# Create trainForecaster function
aws lambda create-function \
  --function-name trainForecaster \
  --runtime python3.10 \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 300 \
  --memory-size 1024
```

#### 4.2 Configure Lambda Integrations

```bash
# Create Lambda integration for ingestHistoricalData
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:af-south-1:lambda:path/2015-03-31/functions/arn:aws:lambda:af-south-1:YOUR_ACCOUNT:function:ingestHistoricalData/invocations

# Add Lambda permission
aws lambda add-permission \
  --function-name ingestHistoricalData \
  --statement-id apigateway-access \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:af-south-1:YOUR_ACCOUNT:$API_ID/*/*"
```

### Step 5: Data Pipeline Setup

#### 5.1 S3 Bucket Configuration

```bash
# Create S3 bucket for data storage
aws s3 mb s3://policyanalyst-data-YOUR_ACCOUNT

# Configure bucket policy
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowLambdaAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::policyanalyst-data-YOUR_ACCOUNT/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket policyanalyst-data-YOUR_ACCOUNT \
  --policy file://bucket-policy.json
```

#### 5.2 DynamoDB Table Setup

```bash
# Create api_keys table
aws dynamodb create-table \
  --table-name api_keys \
  --attribute-definitions AttributeName=api_key,AttributeType=S \
  --key-schema AttributeName=api_key,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Create users table
aws dynamodb create-table \
  --table-name users \
  --attribute-definitions AttributeName=user_id,AttributeType=S \
  --key-schema AttributeName=user_id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

### Step 6: Monitoring and Logging

#### 6.1 CloudWatch Setup

```bash
# Create CloudWatch log group
aws logs create-log-group --log-group-name /aws/lambda/ingestHistoricalData
aws logs create-log-group --log-group-name /aws/lambda/ingestNowcastData
aws logs create-log-group --log-group-name /aws/lambda/trainForecaster

# Create CloudWatch dashboard
cat > dashboard.json << EOF
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/Lambda", "Invocations", "FunctionName", "ingestHistoricalData"],
          ["AWS/Lambda", "Invocations", "FunctionName", "ingestNowcastData"],
          ["AWS/Lambda", "Invocations", "FunctionName", "trainForecaster"]
        ],
        "period": 300,
        "stat": "Sum",
        "region": "af-south-1",
        "title": "Lambda Invocations"
      }
    }
  ]
}
EOF

aws cloudwatch put-dashboard \
  --dashboard-name PolicyAnalyst-Dashboard \
  --dashboard-body file://dashboard.json
```

#### 6.2 Health Check Endpoint

```bash
# Test health endpoint
curl https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/health

# Expected response: {"status": "healthy", "timestamp": "2024-01-15T10:30:00Z"}
```

## ML Models and Requirements

### Model Specifications

| Model | Type | Size | Hardware | Purpose |
|-------|------|------|----------|---------|
| PolicyAnalyst-v0.1 | LLM (Mistral 7B) | ~14.5GB | GPU (A10G) | Regulatory compliance analysis and recommendations |
| Enhanced LSTM Model | Stacked LSTM + Attention | ~50MB | CPU (c5.2xlarge) | Advanced energy forecasting with weather integration |

### LSTM Model Capabilities

| Feature | Description | MVP Support |
|---------|-------------|-------------|
| Attention Mechanism | Focuses on relevant parts of input sequences for better forecasting | ✅ |
| Weather Integration | Visual Crossing API for temperature, humidity, wind, precipitation | ✅ |
| Hyperparameter Tuning | Bayesian optimization, random search, grid search | ✅ |
| Transfer Learning | Pre-train on similar sites, fine-tune for new locations | ✅ |
| Feature Engineering | Temporal features, holiday detection, PCA, day/hour encoding | ✅ |
| Performance Profiling | TensorFlow profiling for optimization and debugging | ✅ |

## Testing and Validation

### End-to-End Testing

```bash
# Test data upload
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"customer_id": "test-customer", "data": "sample_data"}' \
  https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/upload_historical

# Test forecast generation
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"customer_id": "test-customer", "forecast_horizon": 24}' \
  https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/generate_forecast

# Test PolicyAnalyst LLM
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Analyze this solar installation data for compliance issues"}' \
  http://$INSTANCE_IP:8000/v1/completions
```

### Performance Testing

```bash
# Load test API endpoints
ab -n 100 -c 10 -H "x-api-key: YOUR_API_KEY" \
  https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/health

# Test concurrent requests
for i in {1..10}; do
  curl -H "x-api-key: YOUR_API_KEY" \
    https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/health &
done
wait
```

## Demo Preparation

### Demo Script

1. **Introduction (5 minutes)**
   - Platform overview and capabilities
   - Target use cases and value proposition

2. **Live Demo (15 minutes)**
   - Data upload and processing
   - AI-powered analysis and insights
   - Energy forecasting demonstration
   - OODA loop workflow

3. **Technical Deep Dive (10 minutes)**
   - Architecture overview
   - API endpoints and integration
   - Performance metrics and monitoring

4. **Q&A and Next Steps (10 minutes)**
   - Address technical questions
   - Discuss production deployment timeline
   - Define success criteria

### Demo Data Preparation

```bash
# Prepare sample data
cat > sample_inverter_data.csv << EOF
timestamp,power_output,temperature,irradiance
2024-01-15 10:00:00,150.5,25.3,850.2
2024-01-15 10:15:00,152.1,25.8,855.7
2024-01-15 10:30:00,148.9,26.1,848.3
EOF

# Upload sample data
curl -X POST \
  -H "Content-Type: multipart/form-data" \
  -H "x-api-key: YOUR_API_KEY" \
  -F "file=@sample_inverter_data.csv" \
  -F "customer_id=demo-customer" \
  https://$API_ID.execute-api.af-south-1.amazonaws.com/prod/upload_historical
```

## Success Criteria

### Technical Success Criteria

- ✅ Can ingest and store inverter data
- ✅ Basic anomaly detection working
- ✅ Web dashboard displays data
- ✅ Can generate simple reports
- ✅ Email alerts functional
- ✅ Demo can be presented to stakeholders

### Business Success Criteria

- ✅ Client sees clear value proposition
- ✅ Technical feasibility validated
- ✅ Integration requirements understood
- ✅ Performance expectations set
- ✅ Next steps defined

## Troubleshooting

### Common Issues

#### Lambda Function Errors

```bash
# Check Lambda logs
aws logs describe-log-streams \
  --log-group-name /aws/lambda/ingestHistoricalData \
  --order-by LastEventTime \
  --descending

# Get recent log events
aws logs get-log-events \
  --log-group-name /aws/lambda/ingestHistoricalData \
  --log-stream-name STREAM_NAME
```

#### API Gateway Issues

```bash
# Test API Gateway
aws apigateway test-invoke-method \
  --rest-api-id $API_ID \
  --resource-id $RESOURCE_ID \
  --http-method GET \
  --path-with-query-string "/health"

# Check API Gateway logs
aws logs describe-log-groups --log-group-name-prefix "API-Gateway-Execution-Logs"
```

#### EC2 Instance Issues

```bash
# Check instance status
aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].State.Name'

# Get console output
aws ec2 get-console-output --instance-id $INSTANCE_ID

# Check system logs
ssh -i your-key.pem ubuntu@$INSTANCE_IP "sudo journalctl -u policyanalyst -f"
```

### Performance Issues

```bash
# Monitor CPU and memory
ssh -i your-key.pem ubuntu@$INSTANCE_IP "htop"

# Monitor GPU usage
ssh -i your-key.pem ubuntu@$INSTANCE_IP "nvidia-smi"

# Check disk usage
ssh -i your-key.pem ubuntu@$INSTANCE_IP "df -h"
```

## Cleanup

### Remove Resources

```bash
# Terminate EC2 instance
aws ec2 terminate-instances --instance-ids $INSTANCE_ID

# Delete Lambda functions
aws lambda delete-function --function-name ingestHistoricalData
aws lambda delete-function --function-name ingestNowcastData
aws lambda delete-function --function-name trainForecaster

# Delete API Gateway
aws apigateway delete-rest-api --rest-api-id $API_ID

# Delete DynamoDB tables
aws dynamodb delete-table --table-name api_keys
aws dynamodb delete-table --table-name users

# Delete S3 bucket
aws s3 rb s3://policyanalyst-data-YOUR_ACCOUNT --force

# Delete CloudWatch log groups
aws logs delete-log-group --log-group-name /aws/lambda/ingestHistoricalData
aws logs delete-log-group --log-group-name /aws/lambda/ingestNowcastData
aws logs delete-log-group --log-group-name /aws/lambda/trainForecaster

# Delete IAM role
aws iam detach-role-policy --role-name PolicyAnalyst-EC2-Role --policy-arn arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy
aws iam detach-role-policy --role-name PolicyAnalyst-EC2-Role --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam remove-role-from-instance-profile --instance-profile-name PolicyAnalyst-Instance-Profile --role-name PolicyAnalyst-EC2-Role
aws iam delete-instance-profile --instance-profile-name PolicyAnalyst-Instance-Profile
aws iam delete-role --role-name PolicyAnalyst-EC2-Role

# Delete security groups
aws ec2 delete-security-group --group-id $EC2_SG_ID
aws ec2 delete-security-group --group-id $ALB_SG_ID
```

## Support

- 📧 **PoC Support**: [poc@asoba.co](mailto:poc@asoba.co)
- 💬 **Technical Discord**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **Documentation**: [Complete documentation](https://code.asoba.co)
- 🐛 **Issues**: [GitHub Issues](https://github.com/asobacloud/terminal/issues)

## Related Documentation

- **[Ona Terminal CLI Deployment](deployment.md)** - CLI tool deployment
- **[Production Deployment Guide](production-deployment.md)** - Production infrastructure deployment
- **[API Reference](api-reference.md)** - Complete API documentation
- **[Integration Guide](integration.md)** - SDK and webhook integration
