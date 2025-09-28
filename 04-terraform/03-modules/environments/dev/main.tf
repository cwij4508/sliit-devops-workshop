# Development environment using the web-app module

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Use the web-app module
module "web_app" {
  source = "../../modules/web-app"

  app_name    = var.app_name
  environment = "dev"
  enable_cdn  = false  # Disable CDN for dev environment

  tags = {
    Environment = "dev"
    Project     = "SLIIT Terraform Workshop"
    ManagedBy   = "Terraform"
    CostCenter  = "Development"
  }
}

# Additional development-specific resources
resource "aws_s3_object" "dev_readme" {
  bucket = module.web_app.bucket_name
  key    = "README.md"
  content = <<EOF
# Development Environment

This is the development environment for the SLIIT Terraform Workshop.

## Resources Created:
- S3 Bucket: ${module.web_app.bucket_name}
- Environment: dev
- CDN: Disabled (cost optimization)

## Usage:
This environment is for testing and development purposes only.
EOF

  content_type = "text/markdown"
}