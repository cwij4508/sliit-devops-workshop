# Basic Terraform example - creates simple cloud resources
# This example uses AWS, but can be adapted for other providers

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = var.aws_region
  
  # For workshop purposes, you can use localstack for testing
  # endpoints {
  #   s3 = "http://localhost:4566"
  # }
}

# Data source to get current AWS account info
data "aws_caller_identity" "current" {}

# Create an S3 bucket for static website hosting
resource "aws_s3_bucket" "workshop_bucket" {
  bucket = "${var.project_name}-bucket-${random_string.bucket_suffix.result}"
  
  tags = {
    Name        = "SLIIT Workshop Bucket"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Generate random string for unique bucket name
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Configure bucket for static website hosting
resource "aws_s3_bucket_website_configuration" "workshop_website" {
  bucket = aws_s3_bucket.workshop_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Create a simple index.html file
resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.workshop_bucket.id
  key          = "index.html"
  content_type = "text/html"
  
  content = <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>SLIIT Terraform Workshop</title>
    <style>
        body { font-family: Arial; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 SLIIT Terraform Workshop</h1>
        <p>This webpage was created using Infrastructure as Code!</p>
        <p><strong>Bucket:</strong> ${aws_s3_bucket.workshop_bucket.bucket}</p>
        <p><strong>Region:</strong> ${var.aws_region}</p>
        <p><strong>Environment:</strong> ${var.environment}</p>
        <p><strong>Created:</strong> ${timestamp()}</p>
    </div>
</body>
</html>
EOF

  tags = {
    Name = "Workshop Index Page"
  }
}

# Make bucket publicly readable (for demo purposes only)
resource "aws_s3_bucket_public_access_block" "workshop_bucket_pab" {
  bucket = aws_s3_bucket.workshop_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "workshop_bucket_policy" {
  bucket = aws_s3_bucket.workshop_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.workshop_bucket.arn}/*"
      },
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.workshop_bucket_pab]
}