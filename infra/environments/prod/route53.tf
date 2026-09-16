resource "aws_route53_zone" "primary" {
  name = var.domain_name

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "${local.name_prefix}-dns"
  }
}
