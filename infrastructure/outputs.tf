output "db_endpoint" {
  description = "Endpoint RDS PostgreSQL"
  value       = aws_db_instance.postgres.address
}

output "app_public_ip" {
  description = "IP público da instância EC2"
  value       = aws_instance.app.public_ip
}
