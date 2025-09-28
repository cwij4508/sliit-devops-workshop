# GitHub Actions - CI/CD Pipelines

This section demonstrates how to create automated CI/CD pipelines using GitHub Actions.

## What is GitHub Actions?

GitHub Actions is a CI/CD platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository.

## Exercise Overview

We'll create several workflow examples:
1. **Basic CI** - Run tests on every push
2. **Docker Build** - Build and push Docker images
3. **Multi-environment Deploy** - Deploy to different environments
4. **Release Management** - Automated releases

## Files in this directory:

- `.github/workflows/` - GitHub Actions workflow files
- `sample-app/` - Sample application for CI/CD
- `scripts/` - Deployment and utility scripts

## Workflow Examples

### 1. Basic CI Workflow

**File**: `.github/workflows/ci.yml`

This workflow:
- Runs on every push and pull request
- Tests the application
- Runs code quality checks

### 2. Docker Build and Push

**File**: `.github/workflows/docker.yml`

This workflow:
- Builds Docker images
- Pushes to container registry
- Tags images properly

### 3. Multi-Environment Deployment

**File**: `.github/workflows/deploy.yml`

This workflow:
- Deploys to staging automatically
- Requires approval for production
- Uses environment secrets

## Setting Up Workflows

### 1. Examine Workflow Files

Look at the `.github/workflows/` directory to understand each workflow.

### 2. Understanding Workflow Structure

```yaml
name: Workflow Name
on: [push, pull_request]  # Triggers
jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Step name
        run: echo "Hello World"
```

### 3. Key Concepts

- **Triggers**: Events that start workflows (push, PR, schedule)
- **Jobs**: Set of steps that execute on the same runner
- **Steps**: Individual tasks in a job
- **Actions**: Reusable units of code
- **Runners**: Servers that run your workflows

### 4. Secrets and Environment Variables

Configure these in your repository settings:
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `DEPLOY_KEY` - SSH key for deployment

## Common Use Cases

1. **Continuous Integration**
   - Run tests on every commit
   - Code quality checks
   - Security scanning

2. **Continuous Deployment**
   - Automatic deployments
   - Environment promotion
   - Rollback capabilities

3. **Release Management**
   - Automated versioning
   - Changelog generation
   - Asset publishing

## Best Practices

- Use specific action versions (not @main)
- Store secrets in GitHub Secrets
- Use matrix builds for multiple environments
- Cache dependencies to speed up builds
- Use conditional steps when appropriate

## Monitoring Workflows

- View workflow runs in the "Actions" tab
- Check logs for debugging
- Use workflow status badges
- Set up notifications for failures