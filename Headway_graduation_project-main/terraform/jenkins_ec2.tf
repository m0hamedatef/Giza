resource "aws_default_security_group" "sg" {
  vpc_id = aws_vpc.vpc.id

  ingress {
        from_port       = 22
        to_port         = 22
        protocol        = "tcp" 
        cidr_blocks      = ["0.0.0.0/0"]
    }

    ingress {
        from_port       = 8080
        to_port         = 8080
        protocol        = "tcp" 
        cidr_blocks      = ["0.0.0.0/0"]
    }

    egress {
        from_port       = 0
        to_port         = 0
        protocol        = "-1"
        cidr_blocks      = ["0.0.0.0/0"]
        prefix_list_ids = [] 
    }

    tags = {
        Name = "jenkins_sg"
    }
}


resource "aws_instance" "jenkins" {
  ami           = var.ami
  instance_type = var.ec2_type
  subnet_id     = aws_subnet.public_subnet[0].id
  vpc_security_group_ids = [aws_default_security_group.sg.id]
  availability_zone = var.ec2_avail
  associate_public_ip_address = true
  key_name = var.key

  tags = {
    Name = "jenkins"
  }
}

resource "local_file" "jenkins_ip" {
    filename = "../ansible/inventory"
    content  = "[jenkins]\n${aws_instance.jenkins.public_ip}"
}

resource "aws_ebs_volume" "jenkins_volume" {
  availability_zone = "us-east-1a"
  size              = 10
  type              = "gp2"

  tags = {
    Name = "jenkins-volume"
  }
}

resource "aws_volume_attachment" "ebs_attachment" {
  device_name = "/dev/xvdf"
  instance_id = aws_instance.jenkins.id
  volume_id   = aws_ebs_volume.jenkins_volume.id
}

resource "aws_iam_role" "backup_role" {
  name = "aws_backup_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "backup.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "backup_role_policy" {
  role       = aws_iam_role.backup_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBackupServiceRolePolicyForBackup"
}

# AWS Backup Vault
resource "aws_backup_vault" "backup_vault" {
  name        = "example-backup-vault"
  tags = {
    Name = "example-backup-vault"
  }
}

# AWS Backup Plan
resource "aws_backup_plan" "backup_plan" {
  name = "example-backup-plan"

  rule {
    rule_name         = "daily-backup"
    target_vault_name = aws_backup_vault.backup_vault.name
    schedule          = "cron(0 12 * * ? *)"
    lifecycle {
      delete_after = 30  
    }
  }
}


resource "aws_backup_selection" "backup_selection" {
  name          = "example-backup-selection"
  plan_id       = aws_backup_plan.backup_plan.id
  iam_role_arn  = aws_iam_role.backup_role.arn

  resources = [
    aws_instance.jenkins.arn,
    aws_ebs_volume.jenkins_volume.arn
  ]
}