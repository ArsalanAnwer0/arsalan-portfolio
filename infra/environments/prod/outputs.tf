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

output "route53_zone_id" {
  description = "Route 53 hosted zone ID for the portfolio domain."
  value       = aws_route53_zone.primary.zone_id
}

output "route53_name_servers" {
  description = "Authoritative nameservers that must be configured at the registrar."
  value       = aws_route53_zone.primary.name_servers
}
