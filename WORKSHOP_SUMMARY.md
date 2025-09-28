# SLIIT DevOps Workshop - Complete Guide

This repository provides a comprehensive hands-on DevOps workshop for university students, covering essential tools and practices.

## 🎯 Workshop Objectives

By completing this workshop, students will learn:
- Containerization with Docker
- Multi-service orchestration with Docker Compose
- CI/CD automation with GitHub Actions
- Infrastructure as Code with Terraform

## 📚 Workshop Structure

### 1. Docker Fundamentals (`01-docker/`)
- **What you'll learn**: Container basics, Dockerfile creation, image building
- **Hands-on**: Containerize a Node.js web application
- **Key concepts**: Images, containers, port mapping, layers
- **Time**: 45-60 minutes

### 2. Docker Compose (`02-docker-compose/`)
- **What you'll learn**: Multi-container applications, service orchestration
- **Hands-on**: Deploy a complete web stack (frontend, backend, database, reverse proxy)
- **Key concepts**: Services, networks, volumes, scaling
- **Time**: 60-75 minutes

### 3. GitHub Actions (`03-github-actions/`)
- **What you'll learn**: CI/CD pipelines, automated testing, deployment automation
- **Hands-on**: Create workflows for testing, building, and deploying applications
- **Key concepts**: Workflows, jobs, steps, triggers, secrets
- **Time**: 60-90 minutes

### 4. Terraform (`04-terraform/`)
- **What you'll learn**: Infrastructure as Code, cloud resource management
- **Hands-on**: Deploy cloud infrastructure using declarative configuration
- **Key concepts**: Resources, providers, state, modules, variables
- **Time**: 75-90 minutes

## 🚀 Quick Start

1. **Prerequisites**:
   ```bash
   # Install required tools
   - Docker & Docker Compose
   - Node.js & npm
   - Git
   - Terraform (for section 4)
   ```

2. **Clone and start**:
   ```bash
   git clone https://github.com/njay4928/sliit-devops-workshop.git
   cd sliit-devops-workshop
   
   # Start with Docker section
   cd 01-docker
   ```

3. **Follow the README** in each section for detailed instructions.

## 🧪 Testing Your Setup

### Docker Test
```bash
cd 01-docker
docker build -t test-app .
docker run -p 3000:3000 test-app
# Visit http://localhost:3000
```

### Docker Compose Test
```bash
cd 02-docker-compose
docker-compose up -d
# Visit http://localhost:8080
```

### GitHub Actions Test
```bash
cd 03-github-actions/sample-app
npm install
npm test
npm run lint
```

## 📋 Workshop Checklist

- [ ] Complete Docker section
  - [ ] Build and run containerized application
  - [ ] Understand Dockerfile components
  - [ ] Practice Docker commands
  
- [ ] Complete Docker Compose section
  - [ ] Deploy multi-service application
  - [ ] Test inter-service communication
  - [ ] Practice scaling services
  
- [ ] Complete GitHub Actions section
  - [ ] Create CI pipeline
  - [ ] Set up automated testing
  - [ ] Configure deployment workflow
  
- [ ] Complete Terraform section
  - [ ] Deploy basic infrastructure
  - [ ] Use modules for reusability
  - [ ] Manage multiple environments

## 🎓 Learning Outcomes

After completing this workshop, students will be able to:

1. **Containerize applications** using Docker
2. **Orchestrate multi-container environments** with Docker Compose
3. **Implement CI/CD pipelines** using GitHub Actions
4. **Manage cloud infrastructure** with Terraform
5. **Apply DevOps best practices** in real projects

## 🔧 Troubleshooting

### Common Issues

1. **Docker build fails**: Check Dockerfile syntax and base image availability
2. **Port conflicts**: Use different ports or stop conflicting services
3. **Permission issues**: Check file permissions and user groups
4. **Network connectivity**: Verify service names in docker-compose.yml

### Getting Help

- Check the README in each section
- Review error messages carefully
- Use `docker logs <container>` for debugging
- Ask instructors for assistance

## 🏆 Best Practices Learned

- **Version control**: All infrastructure and configuration as code
- **Automation**: Eliminate manual deployment steps
- **Testing**: Automated testing at every stage
- **Security**: Use secrets management and principle of least privilege
- **Monitoring**: Include health checks and logging
- **Documentation**: Clear, actionable documentation

## 📝 Next Steps

After completing this workshop:

1. **Apply to personal projects**: Containerize your applications
2. **Explore advanced topics**: Kubernetes, advanced CI/CD patterns
3. **Cloud platforms**: Apply concepts to AWS, Azure, or GCP
4. **Monitoring**: Add observability to your applications
5. **Security**: Implement security scanning and compliance

## 🤝 Contributing

This workshop is designed for educational purposes. Contributions and improvements are welcome!

---

**Happy Learning!** 🚀

*This workshop is designed for SLIIT undergraduate students as part of the DevOps curriculum.*