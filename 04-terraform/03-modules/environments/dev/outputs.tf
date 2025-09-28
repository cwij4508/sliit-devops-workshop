output "bucket_name" {
  description = "Development S3 bucket name"
  value       = module.web_app.bucket_name
}

output "bucket_arn" {
  description = "Development S3 bucket ARN"
  value       = module.web_app.bucket_arn
}