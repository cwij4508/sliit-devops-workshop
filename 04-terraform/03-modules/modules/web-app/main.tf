# Reusable web application module

resource "aws_s3_bucket" "app_storage" {
  bucket = "${var.app_name}-${var.environment}-storage-${random_string.suffix.result}"

  tags = merge(var.tags, {
    Name        = "${var.app_name}-${var.environment}-storage"
    Environment = var.environment
  })
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_s3_bucket_versioning" "app_storage" {
  bucket = aws_s3_bucket.app_storage.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_cloudfront_distribution" "app_cdn" {
  count = var.enable_cdn ? 1 : 0

  origin {
    domain_name = aws_s3_bucket.app_storage.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.app_storage.bucket}"
  }

  enabled = true
  comment = "${var.app_name} ${var.environment} CDN"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.app_storage.bucket}"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = merge(var.tags, {
    Name        = "${var.app_name}-${var.environment}-cdn"
    Environment = var.environment
  })
}