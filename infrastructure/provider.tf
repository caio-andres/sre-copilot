terraform {
  required_version = ">= 1.3"
  backend "s3" {
    bucket = "caio-andres-terraform-state-bucket"
    key    = "sre-copilot/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}
