locals {
  project_name = "arsalan-portfolio"
  environment  = "prod"
  name_prefix  = "${local.project_name}-${local.environment}"
  origin_id    = "${local.name_prefix}-s3-origin"
}
