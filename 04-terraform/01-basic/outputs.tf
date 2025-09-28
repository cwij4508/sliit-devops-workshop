# Output values for basic Terraform configuration

output "bucket_name" {
  description = "Name of the created S3 bucket"
  value       = aws_s3_bucket.workshop_bucket.bucket
}

output "bucket_website_url" {
  description = "Website URL of the S3 bucket"
  value       = "http://${aws_s3_bucket.workshop_bucket.bucket}.s3-website-${var.aws_region}.amazonaws.com"
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.workshop_bucket.arn
}

output "aws_account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

output "aws_region" {
  description = "AWS Region used"
  value       = var.aws_region
}

output "project_info" {
  description = "Project information"
  value = {
    name        = var.project_name
    environment = var.environment
    region      = var.aws_region
  }
}