# Terraform - Infrastructure as Code

This section introduces Infrastructure as Code (IaC) using Terraform with simple, practical examples.

## What is Terraform?

Terraform is an open-source tool that allows you to define infrastructure using declarative configuration files. You can version, reuse, and share your infrastructure configurations.

## Exercise Overview

We'll create infrastructure examples for:
1. **Basic Resources** - Simple cloud resources
2. **Web Application Stack** - Complete application infrastructure
3. **Multi-Environment** - Different environments with modules

## Files in this directory:

- `01-basic/` - Simple resource creation
- `02-web-stack/` - Complete web application infrastructure
- `03-modules/` - Reusable infrastructure modules
- `terraform.tfvars.example` - Example variables file

## Prerequisites

1. Install Terraform: https://www.terraform.io/downloads.html
2. Configure cloud provider credentials (AWS/Azure/GCP)
3. Basic understanding of cloud services

## Getting Started

### 1. Verify Terraform Installation

```bash
terraform version
```

### 2. Basic Terraform Commands

```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Destroy resources
terraform destroy
```

## Exercise 1: Basic Resources

Navigate to `01-basic/` directory:

```bash
cd 01-basic
terraform init
terraform plan
terraform apply
```

This creates:
- Storage bucket
- Virtual network
- Basic security group

## Exercise 2: Web Application Stack

Navigate to `02-web-stack/` directory:

```bash
cd 02-web-stack
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform plan
terraform apply
```

This creates:
- Load balancer
- Auto-scaling group
- Database
- Monitoring setup

## Exercise 3: Modular Infrastructure

Navigate to `03-modules/` directory:

```bash
cd 03-modules
terraform init
terraform plan
terraform apply
```

This demonstrates:
- Reusable modules
- Multiple environments
- Best practices

## Key Terraform Concepts

- **Resources**: Infrastructure objects (VMs, networks, etc.)
- **Providers**: APIs to create resources (AWS, Azure, GCP)
- **Variables**: Input parameters
- **Outputs**: Return values
- **State**: Current infrastructure state
- **Modules**: Reusable configurations

## Terraform File Structure

```
├── main.tf          # Primary configuration
├── variables.tf     # Input variables
├── outputs.tf       # Output values
├── providers.tf     # Provider configurations
├── terraform.tfvars # Variable values
└── modules/         # Reusable modules
```

## Best Practices

1. **Version Control**: Always version your Terraform code
2. **State Management**: Use remote state storage
3. **Modules**: Create reusable components
4. **Variables**: Parameterize configurations
5. **Planning**: Always run `terraform plan` first
6. **Environments**: Separate dev/staging/prod

## Common Commands Reference

```bash
# Initialize working directory
terraform init

# Create execution plan
terraform plan

# Apply changes
terraform apply

# Show current state
terraform show

# List resources
terraform state list

# Import existing resources
terraform import

# Destroy infrastructure
terraform destroy

# Format code
terraform fmt

# Validate configuration
terraform validate
```

## Troubleshooting

- Check provider credentials
- Verify region/zone settings
- Review terraform.tfvars file
- Check resource naming conflicts
- Review state file for inconsistencies

## Clean Up

Always clean up resources when done:

```bash
terraform destroy
```

This prevents unnecessary cloud costs!