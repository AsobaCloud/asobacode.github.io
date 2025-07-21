---
title: "MCP Server Development"
layout: default
nav_order: 7
---

## MCP Server Development Guide {#mcp-server-development}

> **Complete guide to developing custom MCP servers for AsobaCode's extensible architecture**

Learn how to create powerful custom MCP (Model Context Protocol) servers that extend AsobaCode's capabilities with domain-specific tools, integrations, and automation workflows.

---

## Overview {#overview}

AsobaCode's **Model Context Protocol (MCP) architecture** provides unlimited extensibility through specialized servers. Each server focuses on a specific domain and can be developed independently, tested thoroughly, and deployed seamlessly.

### Core MCP Servers in AsobaCode {#core-servers}

- **🤖 AI Models Server**: Multi-provider AI model routing and code generation
- **🐙 GitHub Integration Server**: Repository management and automation workflows  
- **🔍 Code Analysis Server**: Static analysis, security scanning, and quality metrics

### Why Build Custom MCP Servers? {#why-custom-servers}

**Extend AsobaCode for your specific needs:**

- **Domain-Specific Tools**: Create specialized tools for your industry or use case
- **External Integrations**: Connect to your existing tools and services
- **Custom AI Providers**: Add support for new AI models or APIs
- **Workflow Automation**: Implement complex multi-step processes
- **Team Specialization**: Build tools tailored to your team's specific workflows

---

## Quick Start: Your First MCP Server {#quick-start}

Create a simple MCP server in 5 minutes:

### 1. Basic Server Structure {#basic-structure}

```python
# custom_server.py - Your first MCP server
from fastmcp import FastMCP

# Create MCP server instance
app = FastMCP("custom-domain-server")

@app.tool
def analyze_custom_metrics(code: str, language: str = "python") -> dict:
    """Analyze custom code metrics specific to your domain."""
    # Your custom analysis logic here
    lines = code.count('\n') + 1
    complexity_score = len(code.split('if ')) + len(code.split('for ')) - 2
    
    return {
        "metrics": {
            "lines_of_code": lines,
            "estimated_complexity": max(1, complexity_score),
            "domain_specific_score": 8.5,
            "compliance_level": "high"
        },
        "recommendations": [
            "Consider adding error handling",
            "Add unit tests for critical functions"
        ],
        "server": "custom-domain"
    }

@app.tool  
def generate_domain_template(template_type: str, parameters: dict) -> dict:
    """Generate domain-specific templates and configurations."""
    templates = {
        "api_endpoint": """
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/{endpoint}', methods=['GET'])
def {function_name}():
    return jsonify({{"status": "success", "data": {data}}})

if __name__ == '__main__':
    app.run(debug=True)
        """,
        "database_model": f"""
class {parameters.get('model_name', 'Entity')}(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Add your fields here
        """,
    }
    
    template = templates.get(template_type, "# Template not found")
    
    return {
        "success": True,
        "template": template,
        "template_type": template_type,
        "parameters": parameters
    }

if __name__ == "__main__":
    print("🚀 Custom Domain Server starting...")
    app.run()
```

### 2. Register Your Server {#register-server}

```yaml
# Add to configs/default.yaml
mcp:
  servers:
    custom-domain-server:
      enabled: true
      command: ["python", "-m", "your_project.servers.custom_server"]
      capabilities: ["analyze_custom_metrics", "generate_domain_template"]
      description: "Custom domain-specific analysis and template generation"
```

### 3. Test Your Server {#test-server}

```bash
# Test your new server
asoba-code servers --health  # Should show your custom server

# Use your custom tools
asoba-code ask "Analyze my Python code using custom domain metrics"
asoba-code ask "Generate an API endpoint template for user management"
```

---

## MCP Protocol Deep Dive {#protocol-deep-dive}

### Understanding MCP Architecture {#mcp-architecture}

```
┌─────────────────────────────────────────────────────────────┐
│                  AsobaCode CLI (Client)                    │
│               Natural Language Router                      │
├─────────────────────────────────────────────────────────────┤
│                    MCP Protocol Layer                      │
│            (Tool Discovery & Execution)                    │
├─────────────────────────────────────────────────────────────┤
│   Built-in Servers          │      Your Custom Servers     │
│  ┌─────────────────┐       │    ┌─────────────────────┐    │
│  │ AI Models       │       │    │ Domain Analytics    │    │
│  │ GitHub          │       │    │ External APIs       │    │
│  │ Code Analysis   │       │    │ Custom Workflows    │    │
│  └─────────────────┘       │    └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### MCP Server Lifecycle {#server-lifecycle}

1. **Discovery**: AsobaCode discovers available servers via configuration
2. **Registration**: Servers register their available tools and capabilities  
3. **Tool Calls**: Natural language requests are routed to appropriate tools
4. **Execution**: Tools execute and return structured results
5. **Response**: Results are formatted and returned to the user

### Tool Registration Patterns {#tool-patterns}

```python
# Pattern 1: Simple Function Tool
@app.tool
def simple_analysis(code: str) -> dict:
    """Simple code analysis tool."""
    return {"result": "analysis complete"}

# Pattern 2: Complex Tool with Validation
@app.tool
def complex_operation(
    input_data: str, 
    operation_type: str = "standard",
    options: dict = None
) -> dict:
    """Complex operation with input validation and error handling."""
    
    # Input validation
    if not input_data or len(input_data) < 10:
        return {
            "error": "Input data too short",
            "error_type": "validation_error",
            "requirements": "Input must be at least 10 characters"
        }
    
    valid_operations = ["standard", "advanced", "expert"]
    if operation_type not in valid_operations:
        return {
            "error": f"Invalid operation type: {operation_type}",
            "error_type": "validation_error", 
            "valid_options": valid_operations
        }
    
    try:
        # Your complex logic here
        result = perform_complex_analysis(input_data, operation_type, options or {})
        
        return {
            "success": True,
            "result": result,
            "operation_type": operation_type,
            "processing_time": "1.2s"
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "error_type": "processing_error",
            "input_data_length": len(input_data)
        }

# Pattern 3: Stateful Tool with Context
class StatefulServer:
    def __init__(self):
        self.app = FastMCP("stateful-server")
        self.context = {}
        self._register_tools()
        
    def _register_tools(self):
        @self.app.tool
        def store_context(key: str, value: str) -> dict:
            """Store context for future operations."""
            self.context[key] = {
                "value": value,
                "timestamp": datetime.utcnow().isoformat(),
                "access_count": 0
            }
            return {
                "stored": key,
                "value": value,
                "context_size": len(self.context)
            }
        
        @self.app.tool
        def retrieve_context(key: str) -> dict:
            """Retrieve stored context."""
            if key in self.context:
                self.context[key]["access_count"] += 1
                return {
                    "key": key,
                    "data": self.context[key],
                    "found": True
                }
            else:
                return {
                    "key": key,
                    "found": False,
                    "available_keys": list(self.context.keys())
                }
```

---

## Advanced Server Development {#advanced-development}

### External API Integration {#api-integration}

```python
# Example: Slack Integration Server
import requests
from datetime import datetime, timedelta

class SlackIntegrationServer:
    def __init__(self):
        self.app = FastMCP("slack-integration-server")
        self.webhook_url = os.getenv("SLACK_WEBHOOK_URL")
        self.token = os.getenv("SLACK_BOT_TOKEN")
        self._register_tools()
    
    def _register_tools(self):
        @self.app.tool
        def send_code_review_summary(repository: str, pr_number: int, summary: str) -> dict:
            """Send code review summary to Slack channel."""
            message = {
                "text": f"📋 Code Review Summary",
                "blocks": [
                    {
                        "type": "header",
                        "text": {"type": "plain_text", "text": f"Code Review: {repository} PR #{pr_number}"}
                    },
                    {
                        "type": "section", 
                        "text": {"type": "mrkdwn", "text": summary}
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {"type": "plain_text", "text": "View PR"},
                                "url": f"https://github.com/{repository}/pull/{pr_number}"
                            }
                        ]
                    }
                ]
            }
            
            try:
                response = requests.post(self.webhook_url, json=message)
                return {
                    "success": response.status_code == 200,
                    "message_sent": True,
                    "repository": repository,
                    "pr_number": pr_number
                }
            except Exception as e:
                return {"error": str(e), "success": False}
        
        @self.app.tool
        def create_deployment_alert(environment: str, status: str, details: dict) -> dict:
            """Create deployment status alerts in Slack."""
            color = {"success": "good", "failure": "danger", "warning": "warning"}.get(status, "good")
            
            message = {
                "attachments": [
                    {
                        "color": color,
                        "title": f"🚀 Deployment to {environment}",
                        "fields": [
                            {"title": "Status", "value": status.upper(), "short": True},
                            {"title": "Environment", "value": environment, "short": True},
                            {"title": "Timestamp", "value": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"), "short": True}
                        ],
                        "text": details.get("message", "Deployment completed")
                    }
                ]
            }
            
            try:
                response = requests.post(self.webhook_url, json=message)
                return {
                    "alert_sent": response.status_code == 200,
                    "environment": environment,
                    "status": status
                }
            except Exception as e:
                return {"error": str(e), "alert_sent": False}

    def run(self):
        self.app.run()
```

### Database Integration {#database-integration}

```python
# Example: Database Analysis Server
import sqlite3
from typing import List, Dict, Any

class DatabaseAnalysisServer:
    def __init__(self, db_connections: Dict[str, str]):
        self.app = FastMCP("database-analysis-server")
        self.db_connections = db_connections
        self._register_tools()
    
    def _register_tools(self):
        @self.app.tool
        def analyze_table_structure(database: str, table: str) -> dict:
            """Analyze database table structure and relationships."""
            if database not in self.db_connections:
                return {"error": f"Database {database} not configured"}
            
            try:
                conn = sqlite3.connect(self.db_connections[database])
                cursor = conn.cursor()
                
                # Get table info
                cursor.execute(f"PRAGMA table_info({table})")
                columns = cursor.fetchall()
                
                # Get foreign keys
                cursor.execute(f"PRAGMA foreign_key_list({table})")
                foreign_keys = cursor.fetchall()
                
                # Get indexes
                cursor.execute(f"PRAGMA index_list({table})")
                indexes = cursor.fetchall()
                
                conn.close()
                
                return {
                    "table": table,
                    "database": database,
                    "columns": [
                        {
                            "name": col[1],
                            "type": col[2],
                            "nullable": not col[3],
                            "primary_key": col[5] == 1
                        }
                        for col in columns
                    ],
                    "foreign_keys": [
                        {
                            "column": fk[3],
                            "references_table": fk[2],
                            "references_column": fk[4]
                        }
                        for fk in foreign_keys
                    ],
                    "indexes": [idx[1] for idx in indexes]
                }
                
            except Exception as e:
                return {"error": str(e), "table": table}
        
        @self.app.tool
        def generate_optimization_suggestions(database: str, query: str) -> dict:
            """Analyze SQL query and suggest optimizations."""
            try:
                # Simple optimization analysis (extend with more sophisticated logic)
                suggestions = []
                
                if "SELECT *" in query.upper():
                    suggestions.append("Avoid SELECT * - specify only needed columns")
                
                if "WHERE" not in query.upper() and "SELECT" in query.upper():
                    suggestions.append("Consider adding WHERE clause to limit results")
                
                if query.upper().count("JOIN") > 3:
                    suggestions.append("Complex joins detected - consider query optimization")
                
                return {
                    "query": query,
                    "database": database,
                    "optimization_suggestions": suggestions,
                    "complexity_score": len(query.split()) / 10,
                    "analysis_timestamp": datetime.utcnow().isoformat()
                }
                
            except Exception as e:
                return {"error": str(e), "query": query}
```

---

## Testing and Quality Assurance {#testing}

### Unit Testing Your MCP Server {#unit-testing}

```python
# test_custom_server.py
import pytest
import json
from unittest.mock import patch, MagicMock
from your_project.servers.custom_server import app

class TestCustomServer:
    def test_analyze_custom_metrics(self):
        """Test custom metrics analysis tool."""
        test_code = """
def hello_world():
    if True:
        for i in range(10):
            print(f"Hello {i}")
"""
        
        result = app.call_tool("analyze_custom_metrics", {
            "code": test_code, 
            "language": "python"
        })
        
        assert result["success"] is True
        assert "metrics" in result
        assert result["metrics"]["lines_of_code"] > 0
        assert result["server"] == "custom-domain"
    
    def test_generate_domain_template(self):
        """Test template generation."""
        result = app.call_tool("generate_domain_template", {
            "template_type": "api_endpoint",
            "parameters": {
                "endpoint": "users",
                "function_name": "get_users",
                "data": '{"users": []}'
            }
        })
        
        assert result["success"] is True
        assert "template" in result
        assert "from flask import Flask" in result["template"]
    
    def test_error_handling(self):
        """Test error handling for invalid inputs."""
        result = app.call_tool("analyze_custom_metrics", {
            "code": "",  # Empty code should handle gracefully
            "language": "python"
        })
        
        # Should either handle gracefully or return meaningful error
        assert "error" in result or result.get("metrics", {}).get("lines_of_code") == 0

    @patch('requests.post')
    def test_external_api_integration(self, mock_post):
        """Test external API calls with mocking."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"success": True}
        mock_post.return_value = mock_response
        
        # Test external API call
        result = app.call_tool("external_api_call", {"data": "test"})
        
        assert result["success"] is True
        mock_post.assert_called_once()
```

### Integration Testing {#integration-testing}

```python
# test_integration.py
import subprocess
import time
import requests
from asoba_code.client.manager import MCPClientManager

class TestServerIntegration:
    @classmethod
    def setup_class(cls):
        """Start the test server before running tests."""
        cls.server_process = subprocess.Popen([
            "python", "-m", "your_project.servers.custom_server"
        ])
        time.sleep(2)  # Wait for server to start
    
    @classmethod
    def teardown_class(cls):
        """Stop the test server after tests."""
        cls.server_process.terminate()
        cls.server_process.wait()
    
    def test_server_discovery(self):
        """Test that AsobaCode can discover the custom server."""
        client = MCPClientManager()
        servers = client.discover_servers()
        
        assert "custom-domain-server" in servers
    
    def test_tool_execution_through_client(self):
        """Test tool execution through the MCP client."""
        client = MCPClientManager()
        
        result = client.call_server_tool(
            "custom-domain-server",
            "analyze_custom_metrics",
            {
                "code": "def test(): pass",
                "language": "python"
            }
        )
        
        assert result["success"] is True
        assert "metrics" in result
    
    def test_error_propagation(self):
        """Test that errors are properly propagated through the MCP layer."""
        client = MCPClientManager()
        
        result = client.call_server_tool(
            "custom-domain-server", 
            "non_existent_tool",
            {}
        )
        
        assert "error" in result
        assert "tool not found" in result["error"].lower()
```

### Load Testing {#load-testing}

```python
# test_performance.py
import asyncio
import time
from concurrent.futures import ThreadPoolExecutor
from asoba_code.client.manager import MCPClientManager

class TestServerPerformance:
    def test_concurrent_requests(self):
        """Test server performance under concurrent load."""
        client = MCPClientManager()
        
        def make_request(request_id):
            start_time = time.time()
            result = client.call_server_tool(
                "custom-domain-server",
                "analyze_custom_metrics", 
                {
                    "code": f"def test_{request_id}(): pass",
                    "language": "python"
                }
            )
            end_time = time.time()
            return {
                "request_id": request_id,
                "success": result.get("success", False),
                "response_time": end_time - start_time
            }
        
        # Execute 50 concurrent requests
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(make_request, i) for i in range(50)]
            results = [future.result() for future in futures]
        
        # Analyze results
        successful_requests = [r for r in results if r["success"]]
        avg_response_time = sum(r["response_time"] for r in results) / len(results)
        
        assert len(successful_requests) == 50, "All requests should succeed"
        assert avg_response_time < 1.0, f"Average response time too high: {avg_response_time}s"
        
        print(f"✅ Performance test passed:")
        print(f"   Successful requests: {len(successful_requests)}/50")
        print(f"   Average response time: {avg_response_time:.3f}s")
```

---

## Deployment and Production {#deployment}

### Docker Deployment {#docker-deployment}

```dockerfile
# Dockerfile for your custom MCP server
FROM python:3.11-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY src/ ./src/
COPY configs/ ./configs/

# Create non-root user for security
RUN groupadd -r mcp && useradd -r -g mcp mcp
RUN chown -R mcp:mcp /app
USER mcp

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run the server
CMD ["python", "-m", "src.servers.custom_server"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  custom-mcp-server:
    build: .
    ports:
      - "8000:8000"
    environment:
      - LOG_LEVEL=INFO
      - SERVER_HOST=0.0.0.0
      - SERVER_PORT=8000
    volumes:
      - ./configs:/app/configs:ro
    restart: unless-stopped
    networks:
      - mcp-network

  # Optional: Add database or other dependencies
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: custom_server_db
      POSTGRES_USER: mcp_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - mcp-network

networks:
  mcp-network:
    driver: bridge

volumes:
  postgres_data:
```

### Production Configuration {#production-config}

```python
# production_server.py - Production-ready server
import logging
import os
from fastmcp import FastMCP
from prometheus_client import Counter, Histogram, generate_latest
from flask import Response

# Set up production logging
logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Prometheus metrics
REQUEST_COUNT = Counter('mcp_requests_total', 'Total MCP requests', ['tool', 'status'])
REQUEST_DURATION = Histogram('mcp_request_duration_seconds', 'MCP request duration', ['tool'])

class ProductionMCPServer:
    def __init__(self):
        self.app = FastMCP("production-custom-server")
        self.logger = logging.getLogger(__name__)
        self._register_tools()
        self._setup_monitoring()
    
    def _register_tools(self):
        @self.app.tool
        def production_analysis(data: str, options: dict = None) -> dict:
            """Production-ready analysis tool with monitoring."""
            tool_name = "production_analysis"
            
            with REQUEST_DURATION.labels(tool=tool_name).time():
                try:
                    # Your business logic here
                    result = self._perform_analysis(data, options or {})
                    
                    REQUEST_COUNT.labels(tool=tool_name, status='success').inc()
                    self.logger.info(f"Analysis completed successfully for {len(data)} chars of data")
                    
                    return {
                        "success": True,
                        "result": result,
                        "server": "production-custom-server",
                        "version": "1.0.0"
                    }
                    
                except Exception as e:
                    REQUEST_COUNT.labels(tool=tool_name, status='error').inc()
                    self.logger.error(f"Analysis failed: {str(e)}", exc_info=True)
                    
                    return {
                        "success": False,
                        "error": str(e),
                        "error_type": type(e).__name__
                    }
    
    def _setup_monitoring(self):
        """Set up health check and metrics endpoints."""
        @self.app.route('/health')
        def health_check():
            return {"status": "healthy", "server": "production-custom-server"}
        
        @self.app.route('/metrics')
        def metrics():
            return Response(generate_latest(), mimetype='text/plain')
    
    def _perform_analysis(self, data: str, options: dict) -> dict:
        """Placeholder for your analysis logic."""
        return {
            "data_length": len(data),
            "options_count": len(options),
            "analysis_complete": True
        }

if __name__ == "__main__":
    server = ProductionMCPServer()
    server.app.run(
        host=os.getenv('SERVER_HOST', '0.0.0.0'),
        port=int(os.getenv('SERVER_PORT', 8000))
    )
```

### Monitoring and Observability {#monitoring}

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'custom-mcp-server'
    static_configs:
      - targets: ['custom-mcp-server:8000']
    scrape_interval: 10s
    metrics_path: /metrics

  - job_name: 'asobacode-client'
    static_configs:  
      - targets: ['asobacode-client:9090']
```

```yaml
# monitoring/grafana-dashboard.json
{
  "dashboard": {
    "title": "Custom MCP Server Monitoring",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(mcp_requests_total[5m])",
            "legendFormat": "{{tool}} - {{status}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph", 
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(mcp_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      }
    ]
  }
}
```

---

## Best Practices and Patterns {#best-practices}

### Server Design Patterns {#design-patterns}

#### 1. Repository Pattern for Data Access {#repository-pattern}

```python
from abc import ABC, abstractmethod

class DataRepository(ABC):
    @abstractmethod
    def get_data(self, query: str) -> List[Dict]:
        pass
    
    @abstractmethod
    def save_data(self, data: Dict) -> bool:
        pass

class DatabaseRepository(DataRepository):
    def __init__(self, connection_string: str):
        self.connection = create_connection(connection_string)
    
    def get_data(self, query: str) -> List[Dict]:
        # Database-specific implementation
        pass
    
    def save_data(self, data: Dict) -> bool:
        # Database-specific implementation  
        pass

class MockRepository(DataRepository):
    def __init__(self):
        self.data = []
    
    def get_data(self, query: str) -> List[Dict]:
        return [item for item in self.data if query in str(item)]
    
    def save_data(self, data: Dict) -> bool:
        self.data.append(data)
        return True

# Use in your MCP server
class DataAnalysisServer:
    def __init__(self, repository: DataRepository):
        self.repository = repository
        self.app = FastMCP("data-analysis-server")
        self._register_tools()
    
    def _register_tools(self):
        @self.app.tool
        def analyze_dataset(query: str) -> dict:
            data = self.repository.get_data(query)
            analysis = self._perform_analysis(data)
            return analysis
```

#### 2. Plugin Architecture {#plugin-architecture}

```python
# Plugin system for extensible MCP servers
class MCPPlugin(ABC):
    @abstractmethod
    def register_tools(self, app: FastMCP) -> None:
        pass
    
    @abstractmethod
    def get_plugin_info(self) -> Dict[str, Any]:
        pass

class SecurityPlugin(MCPPlugin):
    def register_tools(self, app: FastMCP) -> None:
        @app.tool
        def security_scan(code: str) -> dict:
            # Security scanning logic
            return {"vulnerabilities": [], "score": 9.5}
    
    def get_plugin_info(self) -> Dict[str, Any]:
        return {
            "name": "Security Scanner",
            "version": "1.0.0",
            "tools": ["security_scan"]
        }

class PluginManager:
    def __init__(self):
        self.plugins: List[MCPPlugin] = []
    
    def register_plugin(self, plugin: MCPPlugin):
        self.plugins.append(plugin)
    
    def setup_server(self, app: FastMCP):
        for plugin in self.plugins:
            plugin.register_tools(app)

# Usage
def create_extensible_server():
    app = FastMCP("extensible-server")
    plugin_manager = PluginManager()
    
    # Register plugins
    plugin_manager.register_plugin(SecurityPlugin())
    # plugin_manager.register_plugin(PerformancePlugin())
    # plugin_manager.register_plugin(CompliancePlugin())
    
    plugin_manager.setup_server(app)
    return app
```

#### 3. Configuration Management {#configuration-management}

```python
from dataclasses import dataclass
from typing import Optional
import yaml

@dataclass
class ServerConfig:
    name: str
    port: int
    host: str = "localhost"
    debug: bool = False
    database_url: Optional[str] = None
    api_keys: Dict[str, str] = None
    
    @classmethod
    def from_yaml(cls, config_path: str) -> 'ServerConfig':
        with open(config_path, 'r') as f:
            config_data = yaml.safe_load(f)
        return cls(**config_data)
    
    @classmethod
    def from_env(cls) -> 'ServerConfig':
        return cls(
            name=os.getenv('SERVER_NAME', 'custom-server'),
            port=int(os.getenv('SERVER_PORT', '8000')),
            host=os.getenv('SERVER_HOST', 'localhost'),
            debug=os.getenv('DEBUG', 'false').lower() == 'true',
            database_url=os.getenv('DATABASE_URL'),
            api_keys={
                'service_a': os.getenv('SERVICE_A_API_KEY', ''),
                'service_b': os.getenv('SERVICE_B_API_KEY', '')
            }
        )

class ConfigurableServer:
    def __init__(self, config: ServerConfig):
        self.config = config
        self.app = FastMCP(config.name)
        self._setup_server()
    
    def _setup_server(self):
        if self.config.debug:
            logging.getLogger().setLevel(logging.DEBUG)
        
        # Configure based on settings
        if self.config.database_url:
            self._setup_database()
        
        self._register_tools()
    
    def run(self):
        self.app.run(host=self.config.host, port=self.config.port, debug=self.config.debug)
```

### Security Best Practices {#security}

#### 1. Input Validation and Sanitization {#input-validation}

```python
from typing import Any, Dict
import re
from html import escape

class InputValidator:
    @staticmethod
    def validate_code_input(code: str) -> Dict[str, Any]:
        """Validate code input for security and sanity."""
        if not code or not code.strip():
            return {"valid": False, "error": "Code input cannot be empty"}
        
        if len(code) > 50000:  # 50KB limit
            return {"valid": False, "error": "Code input too large (max 50KB)"}
        
        # Check for potential security risks
        dangerous_patterns = [
            r'import\s+os',
            r'subprocess\.',
            r'eval\s*\(',
            r'exec\s*\(',
            r'__import__',
        ]
        
        for pattern in dangerous_patterns:
            if re.search(pattern, code, re.IGNORECASE):
                return {
                    "valid": False, 
                    "error": f"Potentially dangerous code pattern detected: {pattern}",
                    "security_risk": True
                }
        
        return {"valid": True, "sanitized_code": escape(code)}
    
    @staticmethod
    def validate_file_path(path: str) -> Dict[str, Any]:
        """Validate file path to prevent directory traversal."""
        if not path:
            return {"valid": False, "error": "Path cannot be empty"}
        
        # Prevent directory traversal
        if '..' in path or path.startswith('/'):
            return {
                "valid": False,
                "error": "Invalid path: directory traversal not allowed",
                "security_risk": True
            }
        
        # Only allow certain extensions
        allowed_extensions = ['.py', '.js', '.ts', '.java', '.go', '.rs', '.cpp', '.c']
        if not any(path.endswith(ext) for ext in allowed_extensions):
            return {
                "valid": False,
                "error": f"File extension not allowed. Allowed: {allowed_extensions}"
            }
        
        return {"valid": True, "safe_path": os.path.normpath(path)}

# Usage in tools
@app.tool
def secure_code_analysis(code: str, file_path: str = "") -> dict:
    """Securely analyze code with input validation."""
    
    # Validate code input
    code_validation = InputValidator.validate_code_input(code)
    if not code_validation["valid"]:
        return {
            "error": code_validation["error"],
            "security_risk": code_validation.get("security_risk", False)
        }
    
    # Validate file path if provided
    if file_path:
        path_validation = InputValidator.validate_file_path(file_path)
        if not path_validation["valid"]:
            return {
                "error": path_validation["error"],
                "security_risk": path_validation.get("security_risk", False)
            }
    
    # Proceed with safe analysis
    safe_code = code_validation["sanitized_code"]
    return {"analysis_result": f"Code analysis complete for {len(safe_code)} characters"}
```

#### 2. Rate Limiting and Resource Management {#rate-limiting}

```python
import time
from collections import defaultdict, deque
from threading import Lock

class RateLimiter:
    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(deque)
        self.lock = Lock()
    
    def is_allowed(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        
        with self.lock:
            # Remove old requests
            client_requests = self.requests[client_id]
            while client_requests and client_requests[0] < window_start:
                client_requests.popleft()
            
            # Check if under limit
            if len(client_requests) < self.max_requests:
                client_requests.append(now)
                return True
            
            return False
    
    def get_remaining(self, client_id: str) -> int:
        with self.lock:
            current_requests = len(self.requests[client_id])
            return max(0, self.max_requests - current_requests)

class ResourceManager:
    def __init__(self, max_memory_mb: int = 512, max_processing_time: int = 30):
        self.max_memory_mb = max_memory_mb
        self.max_processing_time = max_processing_time
        self.rate_limiter = RateLimiter()
    
    def check_resources(self, client_id: str = "default") -> Dict[str, Any]:
        # Check rate limiting
        if not self.rate_limiter.is_allowed(client_id):
            return {
                "allowed": False,
                "reason": "rate_limit_exceeded",
                "remaining_requests": self.rate_limiter.get_remaining(client_id)
            }
        
        # Check memory usage
        import psutil
        memory_usage = psutil.Process().memory_info().rss / 1024 / 1024  # MB
        
        if memory_usage > self.max_memory_mb * 0.9:  # 90% threshold
            return {
                "allowed": False,
                "reason": "memory_limit_approached",
                "current_memory_mb": memory_usage,
                "limit_mb": self.max_memory_mb
            }
        
        return {"allowed": True}

# Usage in MCP server
resource_manager = ResourceManager()

@app.tool
def resource_managed_analysis(code: str, client_id: str = "default") -> dict:
    """Analysis with resource management."""
    
    # Check resources before processing
    resource_check = resource_manager.check_resources(client_id)
    if not resource_check["allowed"]:
        return {
            "error": f"Request denied: {resource_check['reason']}",
            "details": resource_check
        }
    
    # Process with timeout
    import signal
    
    def timeout_handler(signum, frame):
        raise TimeoutError("Processing timeout")
    
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(resource_manager.max_processing_time)
    
    try:
        result = perform_analysis(code)
        signal.alarm(0)  # Cancel timeout
        return {"success": True, "result": result}
        
    except TimeoutError:
        return {"error": "Processing timeout exceeded"}
    except Exception as e:
        signal.alarm(0)
        return {"error": str(e)}
```

---

## Real-World Examples {#real-world-examples}

### Example 1: DevOps Automation Server {#devops-automation}

```python
# DevOps automation MCP server
import subprocess
import yaml
from datetime import datetime

class DevOpsAutomationServer:
    def __init__(self):
        self.app = FastMCP("devops-automation-server")
        self._register_tools()
    
    def _register_tools(self):
        @self.app.tool
        def generate_ci_pipeline(
            project_type: str,
            deployment_targets: List[str],
            testing_framework: str = "pytest"
        ) -> dict:
            """Generate CI/CD pipeline configuration."""
            
            pipelines = {
                "python": {
                    "github_actions": """
name: Python CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run tests
        run: {testing_framework}
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: echo "Deploy to {targets}"
""".format(testing_framework=testing_framework, targets=", ".join(deployment_targets))
                },
                
                "javascript": {
                    "github_actions": """
name: Node.js CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: echo "Deploy to {targets}"
""".format(targets=", ".join(deployment_targets))
                }
            }
            
            if project_type not in pipelines:
                return {
                    "error": f"Unsupported project type: {project_type}",
                    "supported_types": list(pipelines.keys())
                }
            
            return {
                "success": True,
                "project_type": project_type,
                "pipeline_config": pipelines[project_type]["github_actions"],
                "deployment_targets": deployment_targets,
                "created_at": datetime.utcnow().isoformat()
            }
        
        @self.app.tool
        def deploy_infrastructure(environment: str, config_path: str) -> dict:
            """Deploy infrastructure using configuration files."""
            try:
                # Validate environment
                valid_environments = ["development", "staging", "production"]
                if environment not in valid_environments:
                    return {
                        "error": f"Invalid environment: {environment}",
                        "valid_environments": valid_environments
                    }
                
                # Read configuration
                with open(config_path, 'r') as f:
                    config = yaml.safe_load(f)
                
                # Simulate deployment (in real implementation, use Terraform/CloudFormation)
                deployment_steps = [
                    f"Validating {environment} environment configuration",
                    f"Creating infrastructure resources for {environment}",
                    f"Configuring networking and security groups",
                    f"Deploying application services",
                    f"Running health checks"
                ]
                
                return {
                    "success": True,
                    "environment": environment,
                    "deployment_id": f"deploy-{int(time.time())}",
                    "steps_completed": deployment_steps,
                    "estimated_completion": "5-10 minutes",
                    "monitoring_url": f"https://monitoring.example.com/deployments/{environment}"
                }
                
            except FileNotFoundError:
                return {"error": f"Configuration file not found: {config_path}"}
            except yaml.YAMLError as e:
                return {"error": f"Invalid YAML configuration: {str(e)}"}
            except Exception as e:
                return {"error": f"Deployment failed: {str(e)}"}
        
        @self.app.tool
        def monitor_application_health(service_urls: List[str]) -> dict:
            """Monitor application health across multiple services."""
            health_results = []
            
            for url in service_urls:
                try:
                    import requests
                    response = requests.get(f"{url}/health", timeout=5)
                    
                    health_results.append({
                        "url": url,
                        "status": "healthy" if response.status_code == 200 else "unhealthy",
                        "response_time": response.elapsed.total_seconds(),
                        "status_code": response.status_code
                    })
                    
                except requests.RequestException as e:
                    health_results.append({
                        "url": url,
                        "status": "error",
                        "error": str(e)
                    })
            
            overall_health = all(result["status"] == "healthy" for result in health_results)
            
            return {
                "overall_status": "healthy" if overall_health else "degraded",
                "services_checked": len(service_urls),
                "healthy_services": len([r for r in health_results if r["status"] == "healthy"]),
                "results": health_results,
                "checked_at": datetime.utcnow().isoformat()
            }

    def run(self):
        self.app.run()

if __name__ == "__main__":
    server = DevOpsAutomationServer()
    server.run()
```

### Example 2: Database Management Server {#database-management}

```python
# Database management and optimization MCP server
import sqlite3
import psycopg2
from typing import Dict, Any, List, Optional

class DatabaseManagementServer:
    def __init__(self):
        self.app = FastMCP("database-management-server")
        self.connections = {}
        self._register_tools()
    
    def _register_tools(self):
        @self.app.tool
        def connect_database(
            db_type: str,
            connection_string: str,
            alias: str = "default"
        ) -> dict:
            """Connect to a database and store connection."""
            try:
                if db_type.lower() == "sqlite":
                    conn = sqlite3.connect(connection_string)
                elif db_type.lower() == "postgresql":
                    conn = psycopg2.connect(connection_string)
                else:
                    return {
                        "error": f"Unsupported database type: {db_type}",
                        "supported_types": ["sqlite", "postgresql"]
                    }
                
                # Test connection
                cursor = conn.cursor()
                cursor.execute("SELECT 1")
                cursor.fetchone()
                
                self.connections[alias] = {"connection": conn, "type": db_type}
                
                return {
                    "success": True,
                    "database_type": db_type,
                    "alias": alias,
                    "status": "connected"
                }
                
            except Exception as e:
                return {
                    "error": f"Failed to connect to database: {str(e)}",
                    "database_type": db_type
                }
        
        @self.app.tool
        def analyze_table_performance(
            table_name: str,
            database_alias: str = "default"
        ) -> dict:
            """Analyze table performance and suggest optimizations."""
            if database_alias not in self.connections:
                return {"error": f"No connection found for alias: {database_alias}"}
            
            try:
                conn_info = self.connections[database_alias]
                conn = conn_info["connection"]
                db_type = conn_info["type"]
                cursor = conn.cursor()
                
                # Get table statistics
                if db_type == "sqlite":
                    # SQLite-specific queries
                    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                    row_count = cursor.fetchone()[0]
                    
                    cursor.execute(f"PRAGMA table_info({table_name})")
                    columns = cursor.fetchall()
                    
                    cursor.execute(f"PRAGMA index_list({table_name})")
                    indexes = cursor.fetchall()
                    
                elif db_type == "postgresql":
                    # PostgreSQL-specific queries
                    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                    row_count = cursor.fetchone()[0]
                    
                    cursor.execute("""
                        SELECT column_name, data_type 
                        FROM information_schema.columns 
                        WHERE table_name = %s
                    """, (table_name,))
                    columns = cursor.fetchall()
                    
                    cursor.execute("""
                        SELECT indexname, indexdef 
                        FROM pg_indexes 
                        WHERE tablename = %s
                    """, (table_name,))
                    indexes = cursor.fetchall()
                
                # Analyze performance
                analysis = {
                    "table_name": table_name,
                    "row_count": row_count,
                    "column_count": len(columns),
                    "index_count": len(indexes),
                    "performance_score": self._calculate_performance_score(row_count, len(indexes)),
                    "recommendations": []
                }
                
                # Generate recommendations
                if row_count > 10000 and len(indexes) == 0:
                    analysis["recommendations"].append("Consider adding indexes for frequently queried columns")
                
                if len(columns) > 20:
                    analysis["recommendations"].append("Consider normalizing table - too many columns")
                
                if row_count > 1000000:
                    analysis["recommendations"].append("Consider partitioning for very large table")
                
                return analysis
                
            except Exception as e:
                return {"error": f"Analysis failed: {str(e)}"}
        
        @self.app.tool
        def optimize_query(query: str, database_alias: str = "default") -> dict:
            """Analyze and optimize SQL query performance."""
            if database_alias not in self.connections:
                return {"error": f"No connection found for alias: {database_alias}"}
            
            try:
                conn_info = self.connections[database_alias]
                conn = conn_info["connection"]
                db_type = conn_info["type"]
                cursor = conn.cursor()
                
                # Get query execution plan
                if db_type == "sqlite":
                    cursor.execute(f"EXPLAIN QUERY PLAN {query}")
                    plan = cursor.fetchall()
                elif db_type == "postgresql":
                    cursor.execute(f"EXPLAIN (FORMAT JSON) {query}")
                    plan = cursor.fetchone()[0]
                
                # Analyze query for common issues
                optimization_suggestions = []
                query_upper = query.upper()
                
                if "SELECT *" in query_upper:
                    optimization_suggestions.append({
                        "issue": "SELECT * usage",
                        "recommendation": "Specify only needed columns instead of SELECT *",
                        "impact": "Reduces network traffic and memory usage"
                    })
                
                if "WHERE" not in query_upper and "SELECT" in query_upper:
                    optimization_suggestions.append({
                        "issue": "Missing WHERE clause",
                        "recommendation": "Add WHERE clause to limit result set",
                        "impact": "Prevents full table scans"
                    })
                
                join_count = query_upper.count("JOIN")
                if join_count > 3:
                    optimization_suggestions.append({
                        "issue": "Complex joins",
                        "recommendation": "Consider breaking complex query into smaller parts",
                        "impact": "Improves readability and potentially performance"
                    })
                
                return {
                    "original_query": query,
                    "execution_plan": plan,
                    "optimization_suggestions": optimization_suggestions,
                    "complexity_score": self._calculate_query_complexity(query),
                    "estimated_improvement": f"{len(optimization_suggestions) * 15}% potential improvement"
                }
                
            except Exception as e:
                return {"error": f"Query optimization failed: {str(e)}"}
    
    def _calculate_performance_score(self, row_count: int, index_count: int) -> float:
        """Calculate a simple performance score."""
        base_score = 100
        
        # Penalize for large tables without indexes
        if row_count > 10000 and index_count == 0:
            base_score -= 30
        elif row_count > 100000 and index_count < 2:
            base_score -= 20
        
        # Bonus for appropriate indexing
        if index_count > 0 and row_count > 1000:
            base_score += min(10, index_count * 2)
        
        return max(0, min(100, base_score))
    
    def _calculate_query_complexity(self, query: str) -> int:
        """Calculate query complexity score."""
        query_upper = query.upper()
        complexity = 0
        
        complexity += query_upper.count("JOIN") * 2
        complexity += query_upper.count("SUBQUERY") * 3
        complexity += query_upper.count("CASE") * 1
        complexity += query_upper.count("GROUP BY") * 2
        complexity += query_upper.count("ORDER BY") * 1
        
        return complexity

    def run(self):
        self.app.run()

if __name__ == "__main__":
    server = DatabaseManagementServer()
    server.run()
```

---

## Support and Community {#support}

### Getting Help with MCP Development {#getting-help}

- **📧 Technical Support**: [support@asoba.co](mailto:support@asoba.co) - Get help with MCP server development
- **💬 Developer Community**: [Join Our Discord](https://discord.gg/nNV5evcr) - Connect with other MCP developers
- **📚 Documentation**: [docs.asobacode.dev](https://docs.asobacode.dev) - Complete documentation and examples
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/AsobaCloud/asoba-code/issues) - Report bugs or request features

### Contributing to MCP Ecosystem {#contributing}

**Share Your MCP Server:**
- Create a repository with your MCP server code
- Add comprehensive documentation and examples
- Submit to our community MCP server registry
- Help others learn from your implementation

**Best Practices for Sharing:**
- Include detailed README with setup instructions
- Provide example usage and integration guides
- Add comprehensive tests and CI/CD
- Follow security best practices

### Advanced MCP Development Resources {#advanced-resources}

1. **[Custom Model Integration](custom-model-integration.html)** - Integrate custom AI models
2. **[Model Integration Guide](model-integration.html)** - Add new AI providers
3. **[Advanced Features](analyst.html)** - Enterprise workflows and patterns
4. **[Troubleshooting Guide](troubleshooting.html)** - Debug and optimize MCP servers

### Enterprise MCP Development {#enterprise-development}

For organizations building complex MCP server architectures:

- **🏢 Architecture Consulting**: Custom MCP server design and implementation
- **🔧 Development Support**: Dedicated development team assistance
- **📊 Performance Optimization**: Enterprise-scale MCP server optimization
- **🔒 Security Review**: Security assessment and hardening for MCP servers

**Contact**: [enterprise@asoba.co](mailto:enterprise@asoba.co)

---

**Ready to extend AsobaCode with your own powerful MCP servers?**

[Start building your first MCP server →](sdk.html#installation)