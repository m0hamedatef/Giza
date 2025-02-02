resource "aws_ecr_repository" "ecr" {
  name  = "graduation"
}

output "ecr_endpoint" {
  value = aws_ecr_repository.ecr.repository_url
}