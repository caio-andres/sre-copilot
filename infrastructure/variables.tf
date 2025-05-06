variable "aws_region" {
  description = "Região AWS"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR da VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "Lista de CIDRs para subnets públicas"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "Lista de CIDRs para subnets privadas"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "db_name" {
  description = "Nome do banco de dados"
  type        = string
  default     = "sre_copilot"
}

variable "db_username" {
  description = "Usuário do banco"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Senha do banco"
  type        = string
  sensitive   = true
}

variable "instance_type" {
  description = "Tipo de instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "ssh_key_name" {
  description = "Nome do key-pair SSH já criado no console EC2"
  type        = string
}
