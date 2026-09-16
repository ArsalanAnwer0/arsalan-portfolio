variable "aws_region" {
  description = "AWS region for regional portfolio resources."
  type        = string
  default     = "us-east-1"
}

variable "github_repository_owner" {
  description = "GitHub account that owns the portfolio repository."
  type        = string
  default     = "ArsalanAnwer0"
}

variable "github_repository_name" {
  description = "GitHub repository allowed to deploy the portfolio."
  type        = string
  default     = "arsalan-portfolio"
}

variable "github_deployment_branch" {
  description = "Git branch allowed to deploy to production."
  type        = string
  default     = "main"
}

variable "domain_name" {
  description = "Public domain used by the portfolio."
  type        = string
  default     = "arsalan.xyz"
}
