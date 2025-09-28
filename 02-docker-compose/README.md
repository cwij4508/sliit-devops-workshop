# Docker Compose - Multi-Container Applications

This section demonstrates how to use Docker Compose to orchestrate multiple containers working together.

## What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services.

## Exercise Overview

We'll create a simple web application stack with:
- **Frontend**: Node.js web server
- **Backend**: Express API server
- **Database**: Redis for caching
- **Reverse Proxy**: Nginx

## Files in this directory:

- `docker-compose.yml` - Defines all services
- `frontend/` - Frontend web application
- `backend/` - Backend API server
- `nginx/` - Nginx configuration

## Steps

### 1. Examine the Architecture

Look at the `docker-compose.yml` file to understand how services are connected.

### 2. Build and Start All Services

```bash
# Build and start all services in detached mode
docker-compose up -d --build

# View running services
docker-compose ps

# View logs from all services
docker-compose logs

# View logs from a specific service
docker-compose logs frontend
```

### 3. Test the Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001/api/health`
- Through Nginx: `http://localhost:8080`

### 4. Scale Services

```bash
# Scale the backend service to 3 instances
docker-compose up -d --scale backend=3

# Check the scaled services
docker-compose ps
```

### 5. Monitor and Debug

```bash
# Execute commands in running containers
docker-compose exec frontend sh
docker-compose exec backend sh

# View resource usage
docker-compose top
```

### 6. Stop and Clean Up

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

## Key Docker Compose Concepts

- **Service**: A container definition
- **Network**: Communication between containers
- **Volume**: Persistent data storage
- **Environment**: Configuration variables
- **Scaling**: Running multiple instances

## Common Docker Compose Commands

- `docker-compose up` - Start services
- `docker-compose down` - Stop and remove services
- `docker-compose ps` - List services
- `docker-compose logs` - View logs
- `docker-compose exec` - Execute commands in containers
- `docker-compose build` - Build service images