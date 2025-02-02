resource "aws_subnet" "database_subnet" {
  count = 2
  vpc_id     = aws_vpc.vpc.id
  cidr_block = var.database_subnets[count.index]
  availability_zone = var.avail_zones[count.index]

  tags = {
    "Name" = var.databse_subnet_name[count.index]
  }
}

resource "aws_security_group" "database_security_group" {
  name        = "database security group"
  description = "enable port 5432"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description      = "mysql/aurora access"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["10.0.0.0/16"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = -1
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags   = {
    Name = "postgres-sg"
  }
}


# create the subnet group for the rds instance
resource "aws_db_subnet_group" "database_subnet_group" {
  name         = "database_subnets"
  subnet_ids   = [aws_subnet.database_subnet[0].id, aws_subnet.database_subnet[1].id]

  tags   = {
    Name = "database_subnet_group"
  }
}



# create the rds instance
resource "aws_db_instance" "db_instance" {
  engine                  = var.engine
  engine_version          = var.engine_version
  identifier              = "dbheadway"
  username                = var.credentials.username
  password                = var.credentials.password
  instance_class          = var.instance_class
  allocated_storage       = var.allocated_storage
  db_subnet_group_name    = aws_db_subnet_group.database_subnet_group.name
  vpc_security_group_ids  = [aws_security_group.database_security_group.id]
  availability_zone       = var.avail_zones[0]
  db_name                 = var.db_name
  skip_final_snapshot    = true
  final_snapshot_identifier = "my-final-snapshot-2025"
}