output "site_bucket_name" {
  description = "Private S3 bucket containing the exported portfolio."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID used for cache invalidations."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "CloudFront-generated domain name."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "website_url" {
  description = "Temporary HTTPS URL before the custom domain is configured."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "github_deploy_role_arn" {
  description = "IAM role assumed by the production GitHub Actions workflow."
  value       = aws_iam_role.github_deploy.arn
}
