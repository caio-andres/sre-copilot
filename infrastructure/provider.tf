terraform {
  required_version = ">= 1.3"
  backend "s3" {
    bucket = "meu-terraform-state-bucket"
    key    = "sre-copilot/terraform.tfstate"
    region = var.aws_region
  }
}

provider "aws" {
  region = var.aws_region
}
