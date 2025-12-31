---
title: "Code Development"
layout: default
nav_order: 2
parent: Use Cases
---

# Code Development Use Case

Use Zorora's `/develop` workflow for multi-step code development.

## Scenario

You have a Flask application and want to add user authentication with JWT tokens, password hashing, and protected routes. You need to:
- Explore the existing codebase
- Plan the changes
- Get approval
- Execute the changes
- Validate the results

<div style="width: 100%; max-width: 800px; margin: 24px auto;">
  <div style="width: 100%; height: 300px; background: var(--background-light); border: 2px dashed var(--border-grey); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
    <span>Code Development Example Screenshot<br/><small>(Placeholder - Add screenshot showing /develop workflow for code development)</small></span>
  </div>
</div>

## Step-by-Step Guide

### Step 1: Start Development Workflow

**Terminal:**
```bash
zorora
[1] ⚙ > /develop Add user authentication to my Flask app with JWT tokens and password hashing
```

### Step 2: Pre-flight Checks

**What happens:**
- Verifies git repository exists
- Warns if uncommitted changes present
- Asks for confirmation

**Output:**
```
[Phase 0/5] Pre-flight checks...
✓ Git repository found
⚠ Uncommitted changes detected
Proceed? (yes/no)
```

### Step 3: Codebase Exploration

**What happens:**
- Analyzes project structure
- Detects Flask framework
- Reads requirements.txt
- Maps dependencies
- Identifies entry points

**Output:**
```
[Phase 1/5] Exploring codebase...
✓ Detected Flask project
✓ Found app.py, requirements.txt
✓ Identified existing routes: /, /api/data
✓ Dependencies: Flask, requests
```

### Step 4: Planning

**What happens:**
- Uses reasoning model to create plan
- Identifies files to create/modify
- Specifies dependencies to add
- Orders tasks logically
- Includes testing recommendations

**Output:**
```
[Phase 2/5] Creating development plan...

Plan:
1. Create models/user.py (User model with password hashing)
2. Create routes/auth.py (authentication routes: login, register, logout)
3. Create utils/jwt.py (JWT token generation and validation)
4. Modify app.py (add auth blueprint, protect routes)
5. Update requirements.txt (add flask-jwt-extended, bcrypt)
6. Create tests/test_auth.py (unit tests for authentication)

Dependencies to add:
- flask-jwt-extended
- bcrypt
- python-dotenv (for JWT secret)
```

### Step 5: User Approval

**What happens:**
- Displays plan with rich formatting
- Shows files to be created/modified
- Lists dependencies to add
- Asks for explicit approval

**Output:**
```
[Phase 3/5] Approval required

Files to create:
- models/user.py
- routes/auth.py
- utils/jwt.py
- tests/test_auth.py

Files to modify:
- app.py
- requirements.txt

Dependencies to add:
- flask-jwt-extended
- bcrypt
- python-dotenv

Approve? (yes/no/modify)
```

**User Response:**
```bash
yes
```

### Step 6: Execution

**What happens:**
- Executes approved plan step-by-step
- Uses Codestral for code generation
- Creates/modifies files as planned
- Handles errors gracefully

**Output:**
```
[Phase 4/5] Executing plan...
✓ Created models/user.py
✓ Created routes/auth.py
✓ Created utils/jwt.py
✓ Modified app.py
✓ Updated requirements.txt
✓ Created tests/test_auth.py
```

### Step 7: Lint & Validate

**What happens:**
- Runs linters (ruff, eslint, etc.)
- Validates syntax
- Reports issues
- Suggests fixes

**Output:**
```
[Phase 5/5] Linting and validation...
✓ Ruff: No issues
✓ Syntax: Valid
✓ Imports: Resolved
```

## Example Generated Code

### models/user.py

```python
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.created_at = datetime.now()
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
```

### routes/auth.py

```python
from flask import Blueprint, request, jsonify
from models.user import User
from utils.jwt import generate_token, verify_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(data['username'], data['email'], data['password'])
    # Save user to database
    token = generate_token(user.username)
    return jsonify({'token': token}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_username(data['username'])
    if user and user.check_password(data['password']):
        token = generate_token(user.username)
        return jsonify({'token': token}), 200
    return jsonify({'error': 'Invalid credentials'}), 401
```

## Best Practices

### Writing Development Requests

**Be Specific:**
- "Add user authentication with JWT tokens and password hashing" ✓
- "Add auth" ✗

**Include Requirements:**
- "Add user authentication with email/password, JWT tokens, and password reset" ✓
- "User auth" ✗

**Specify Framework:**
- "Add user authentication to my Flask app" ✓
- "Add authentication" ✗

### Reviewing Plans

**Check File Changes:**
- Review files to be created/modified
- Verify file locations
- Check for conflicts

**Review Dependencies:**
- Verify dependencies are correct
- Check for version conflicts
- Consider security implications

**Approve Carefully:**
- Understand all changes
- Verify plan matches request
- Request modifications if needed

### After Execution

**Review Generated Code:**
- Check for errors
- Verify logic
- Test functionality
- Review security

**Run Tests:**
- Execute unit tests
- Run integration tests
- Verify functionality

**Commit Changes:**
```bash
git add .
git commit -m "Add user authentication"
```

## Advanced Usage

### Complex Features

**Multi-File Changes:**
```bash
/develop Refactor the API to use async/await and add comprehensive error handling
```

**With Testing:**
```bash
/develop Add user authentication with unit tests achieving 80% coverage
```

### Iterative Development

**Step 1: Initial Implementation**
```bash
/develop Add basic user authentication
```

**Step 2: Enhancements**
```bash
/develop Add password reset functionality to existing auth system
```

**Step 3: Testing**
```bash
/develop Add integration tests for authentication endpoints
```

## Troubleshooting

### Plan Not Accurate

**Problem:** Generated plan doesn't match request

**Solution:**
- Request modifications in approval phase
- Be more specific in request
- Break down complex requests

### Execution Fails

**Problem:** Code execution fails

**Solution:**
- Check error messages
- Review generated code
- Fix issues manually
- Re-run workflow

### Lint Errors

**Problem:** Linter reports errors

**Solution:**
- Review lint report
- Fix errors manually
- Re-run linter
- Consider auto-fix options

## See Also

- [Development Workflow](/guides/development-workflow) - Development workflow guide
- [Code Generation](/guides/code-generation) - Code generation guide
- [Slash Commands](/guides/slash-commands) - Command reference
