---
title: "Development"
layout: default
nav_order: 9
---

# Development Guide

Guide for contributing to the Ona platform development.

## Overview

This guide covers setting up a development environment, understanding the codebase structure, and contributing to the Ona platform.

## Development Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Docker & Docker Compose
- AWS CLI (configured)
- Git

### Local Development Environment

```bash
# Clone the repository
git clone https://github.com/asobacloud/terminal.git
cd terminal

# Set up Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements-dev.txt

# Set up Node.js dependencies
npm install

# Set up pre-commit hooks
pre-commit install
```

### Environment Configuration

Create a `.env` file in the root directory:

```bash
# API Configuration
ONA_API_KEY=your-dev-api-key
ONA_REGION=af-south-1

# Database
DATABASE_URL=postgresql://localhost/ona_dev

# AWS Configuration
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=af-south-1

# Development Settings
DEBUG=true
LOG_LEVEL=DEBUG
```

## Codebase Structure

```
terminal/
├── src/ona_terminal/          # Main application code
│   ├── cli.py                 # CLI entry point
│   ├── commands/              # Command implementations
│   ├── core/                  # Core business logic
│   ├── ooda/                  # OODA loop implementation
│   ├── servers/               # API server components
│   ├── services/              # Service layer
│   ├── terminal/              # Terminal UI components
│   ├── ui/                    # User interface
│   └── utils/                 # Utility functions
├── tests/                     # Test suite
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
├── docs/                      # Documentation
├── scripts/                   # Development scripts
└── configs/                   # Configuration files
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
python -m pytest tests/unit/test_your_feature.py

# Run linting
pre-commit run --all-files

# Commit changes
git add .
git commit -m "feat: add your feature description"
```

### 2. Testing

```bash
# Run all tests
python -m pytest

# Run specific test file
python -m pytest tests/unit/test_forecast.py

# Run with coverage
python -m pytest --cov=src/ona_terminal

# Run integration tests
python -m pytest tests/integration/

# Run end-to-end tests
python -m pytest tests/e2e/
```

### 3. Code Quality

```bash
# Run linting
flake8 src/ tests/
black src/ tests/
isort src/ tests/

# Run type checking
mypy src/

# Run security checks
bandit -r src/
```

## API Development

### Adding New Endpoints

1. **Create Lambda Function**

```python
# src/ona_terminal/servers/ai_models/new_endpoint.py
import json
from typing import Dict, Any

def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """New API endpoint handler."""
    
    try:
        # Parse request
        body = json.loads(event.get('body', '{}'))
        
        # Process request
        result = process_request(body)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def process_request(data: Dict[str, Any]) -> Dict[str, Any]:
    """Process the API request."""
    # Implement your logic here
    return {'status': 'success', 'data': data}
```

2. **Add API Gateway Configuration**

```yaml
# serverless.yml or similar
functions:
  newEndpoint:
    handler: src/ona_terminal/servers/ai_models/new_endpoint.lambda_handler
    events:
      - http:
          path: /new-endpoint
          method: post
          cors: true
```

3. **Add Tests**

```python
# tests/unit/test_new_endpoint.py
import pytest
from src.ona_terminal.servers.ai_models.new_endpoint import lambda_handler

def test_new_endpoint_success():
    event = {
        'body': '{"test": "data"}'
    }
    
    result = lambda_handler(event, None)
    
    assert result['statusCode'] == 200
    assert 'status' in json.loads(result['body'])

def test_new_endpoint_error():
    event = {
        'body': 'invalid json'
    }
    
    result = lambda_handler(event, None)
    
    assert result['statusCode'] == 500
```

## CLI Development

### Adding New Commands

1. **Create Command Handler**

```python
# src/ona_terminal/commands/handlers/new_command.py
from typing import Dict, Any
from src.ona_terminal.core.base_command import BaseCommand

class NewCommand(BaseCommand):
    """New CLI command implementation."""
    
    def __init__(self):
        super().__init__()
        self.name = "new-command"
        self.description = "Description of the new command"
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--input',
            required=True,
            help='Input parameter for the command'
        )
        parser.add_argument(
            '--output',
            help='Output file path'
        )
    
    def execute(self, args: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the command logic."""
        input_data = args['input']
        
        # Process the command
        result = self.process_input(input_data)
        
        # Handle output
        if args.get('output'):
            self.save_output(result, args['output'])
        
        return result
    
    def process_input(self, input_data: str) -> Dict[str, Any]:
        """Process the input data."""
        # Implement your processing logic
        return {'processed': input_data, 'status': 'success'}
```

2. **Register Command**

```python
# src/ona_terminal/terminal/command_registry.py
from src.ona_terminal.commands.handlers.new_command import NewCommand

def register_commands():
    # ... existing commands ...
    commands['new-command'] = NewCommand()
```

3. **Add Tests**

```python
# tests/unit/test_new_command.py
import pytest
from src.ona_terminal.commands.handlers.new_command import NewCommand

def test_new_command_execution():
    command = NewCommand()
    
    result = command.execute({
        'input': 'test data',
        'output': None
    })
    
    assert result['status'] == 'success'
    assert result['processed'] == 'test data'
```

## Database Development

### Schema Changes

1. **Create Migration**

```python
# migrations/001_add_new_table.py
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'new_table',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime, default=sa.func.now())
    )

def downgrade():
    op.drop_table('new_table')
```

2. **Run Migration**

```bash
# Apply migration
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Docker Development

### Local Docker Setup

```bash
# Build development image
docker build -f docker/Dockerfile.dev -t ona-terminal-dev .

# Run development container
docker run -it --rm \
  -v $(pwd):/app \
  -p 8000:8000 \
  ona-terminal-dev

# Run with docker-compose
docker-compose up -d
```

### Production Docker

```bash
# Build production image
docker build -f docker/Dockerfile -t ona-terminal .

# Run production container
docker run -d \
  -p 8000:8000 \
  -e ONA_API_KEY=your-key \
  ona-terminal
```

## Testing Strategy

### Unit Tests

```python
# tests/unit/test_example.py
import pytest
from unittest.mock import Mock, patch
from src.ona_terminal.core.example import ExampleClass

class TestExampleClass:
    def test_method_returns_expected_value(self):
        # Arrange
        example = ExampleClass()
        
        # Act
        result = example.method()
        
        # Assert
        assert result == "expected_value"
    
    @patch('src.ona_terminal.core.example.external_service')
    def test_method_with_mock(self, mock_service):
        # Arrange
        mock_service.return_value = "mocked_value"
        example = ExampleClass()
        
        # Act
        result = example.method_with_external_service()
        
        # Assert
        assert result == "mocked_value"
        mock_service.assert_called_once()
```

### Integration Tests

```python
# tests/integration/test_api_integration.py
import pytest
import requests
from src.ona_terminal.servers.ai_models.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_api_endpoint(client):
    response = client.post('/api/endpoint', json={
        'data': 'test'
    })
    
    assert response.status_code == 200
    assert response.json['status'] == 'success'
```

### End-to-End Tests

```python
# tests/e2e/test_full_workflow.py
import pytest
from src.ona_terminal.cli import main

def test_full_forecast_workflow():
    # Test complete workflow from CLI to API
    result = main([
        'forecast',
        '--customer-id', 'test-customer',
        '--horizon', '24'
    ])
    
    assert result['status'] == 'success'
    assert 'forecast_id' in result
```

## Performance Testing

### Load Testing

```python
# tests/performance/test_load.py
import asyncio
import aiohttp
import time
from src.ona_terminal.sdk import OnaClient

async def test_api_load():
    client = OnaClient("test-api-key")
    
    start_time = time.time()
    
    # Send concurrent requests
    tasks = []
    for i in range(100):
        task = client.generate_forecast(
            customer_id=f"customer-{i}",
            forecast_horizon=24
        )
        tasks.append(task)
    
    results = await asyncio.gather(*tasks)
    
    end_time = time.time()
    duration = end_time - start_time
    
    # Assert performance requirements
    assert duration < 30  # Should complete within 30 seconds
    assert all(r['status'] == 'success' for r in results)
```

## Documentation

### Code Documentation

```python
def complex_function(param1: str, param2: int) -> Dict[str, Any]:
    """
    Process complex data with multiple parameters.
    
    Args:
        param1: String parameter for processing
        param2: Integer parameter for calculations
        
    Returns:
        Dictionary containing processed results
        
    Raises:
        ValueError: If param2 is negative
        ConnectionError: If external service is unavailable
        
    Example:
        >>> result = complex_function("test", 42)
        >>> print(result['status'])
        'success'
    """
    if param2 < 0:
        raise ValueError("param2 must be positive")
    
    # Implementation here
    return {'status': 'success', 'data': f"{param1}_{param2}"}
```

### API Documentation

```python
# Use docstring format for API endpoints
def api_endpoint():
    """
    POST /api/endpoint
    
    Process data through the API.
    
    ---
    parameters:
      - name: data
        in: body
        required: true
        schema:
          type: object
          properties:
            input:
              type: string
              description: Input data to process
    responses:
      200:
        description: Successful processing
        schema:
          type: object
          properties:
            status:
              type: string
              example: "success"
      400:
        description: Invalid input
    """
    pass
```

## Deployment

### Staging Deployment

```bash
# Deploy to staging
./scripts/deploy-staging.sh

# Run staging tests
./scripts/test-staging.sh

# Monitor staging deployment
./scripts/monitor-staging.sh
```

### Production Deployment

```bash
# Deploy to production
./scripts/deploy-production.sh

# Run smoke tests
./scripts/smoke-tests.sh

# Monitor production
./scripts/monitor-production.sh
```

## Contributing Guidelines

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Follow coding standards
   - Add tests for new functionality
   - Update documentation

3. **Run Tests**
   ```bash
   python -m pytest
   pre-commit run --all-files
   ```

4. **Submit PR**
   - Fill out PR template
   - Link related issues
   - Request reviews

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Backward compatibility maintained

## Support

- 📧 **Development Support**: [dev@asoba.co](mailto:dev@asoba.co)
- 💬 **Developer Discord**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md)
- 🐛 **Issue Tracker**: [GitHub Issues](https://github.com/asobacloud/terminal/issues)
