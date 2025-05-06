resource "aws_db_subnet_group" "main" {
  name       = "sre-copilot-db-subnet-group"
  subnet_ids = values(aws_subnet.private)[*].id
  tags       = { Name = "sre-copilot-db-sng" }
}

resource "aws_security_group" "db_sg" {
  name        = "sre-copilot-db-sg"
  description = "Allow Postgres access"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "postgres" {
  identifier             = "sre-copilot-db"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  allocated_storage      = 20
  storage_type           = "gp2"
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  skip_final_snapshot    = true
  publicly_accessible    = false
  tags                   = { Name = "sre-copilot-rds" }
}
