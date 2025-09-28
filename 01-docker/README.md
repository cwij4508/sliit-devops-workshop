# Docker Fundamentals

This section introduces Docker containerization with a simple Node.js web application.

## What is Docker?

Docker is a platform that enables you to package applications and their dependencies into lightweight, portable containers.

## Exercise Overview

We'll create a simple "Hello World" web server and containerize it using Docker.

## Files in this directory:

- `app.js` - Simple Node.js web server
- `package.json` - Node.js project configuration
- `Dockerfile` - Instructions to build Docker image
- `docker-compose.yml` - Alternative way to run the container

## Steps

### 1. Examine the Application

Look at the `app.js` file to understand what our application does.

### 2. Build the Docker Image

```bash
# Build the Docker image
docker build -t sliit-workshop-app .

# List images to see your newly created image
docker images
```

### 3. Run the Container

```bash
# Run the container in detached mode
docker run -d -p 3000:3000 --name my-app sliit-workshop-app

# Check running containers
docker ps

# View logs
docker logs my-app
```

### 4. Test the Application

Open your browser and navigate to `http://localhost:3000`

### 5. Stop and Clean Up

```bash
# Stop the container
docker stop my-app

# Remove the container
docker rm my-app

# Remove the image (optional)
docker rmi sliit-workshop-app
```

## Key Docker Concepts

- **Image**: A template for creating containers
- **Container**: A running instance of an image
- **Dockerfile**: Instructions for building an image
- **Port mapping**: Exposing container ports to the host

## Common Docker Commands

- `docker build` - Build an image from a Dockerfile
- `docker run` - Create and start a container
- `docker ps` - List running containers
- `docker images` - List available images
- `docker stop` - Stop a running container
- `docker rm` - Remove a container
- `docker rmi` - Remove an image