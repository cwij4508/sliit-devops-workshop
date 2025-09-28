# Production environment using the web-app module

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
  environment = "prod"
  enable_cdn  = true  # Enable CDN for production

  tags = {
    Environment = "prod"
    Project     = "SLIIT Terraform Workshop"
    ManagedBy   = "Terraform"
    CostCenter  = "Production"
    Backup      = "Required"
  }
}

# Production-specific resources
resource "aws_s3_bucket_notification" "prod_notifications" {
  bucket = module.web_app.bucket_name
}

resource "aws_s3_object" "prod_readme" {
  bucket = module.web_app.bucket_name
  key    = "README.md"
  content = <<EOF
# Production Environment

This is the production environment for the SLIIT Terraform Workshop.

## Resources Created:
- S3 Bucket: ${module.web_app.bucket_name}
- CloudFront CDN: ${module.web_app.cdn_domain_name}
- Environment: prod

## Features:
- CDN enabled for global content delivery
- Versioning enabled
- Production monitoring
- Backup policies applied

## Warning:
This is a PRODUCTION environment. All changes should go through proper approval process.
EOF

  content_type = "text/markdown"
}