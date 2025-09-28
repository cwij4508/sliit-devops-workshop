output "bucket_name" {
  description = "Production S3 bucket name"
  value       = module.web_app.bucket_name
}

output "bucket_arn" {
  description = "Production S3 bucket ARN"
  value       = module.web_app.bucket_arn
}

output "cdn_domain_name" {
  description = "CloudFront CDN domain name"
  value       = module.web_app.cdn_domain_name
}

output "cdn_distribution_id" {
  description = "CloudFront distribution ID"
  value       = module.web_app.cdn_distribution_id
}