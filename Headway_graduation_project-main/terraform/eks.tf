resource "aws_iam_role" "eks_cluster" {
  name = "eks-cluster-mycluster"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "eks_cluster" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role = aws_iam_role.eks_cluster.name
}

resource "aws_eks_cluster" "mycluster" {
  name = var.cluster_name
  role_arn = aws_iam_role.eks_cluster.arn
  vpc_config {
    subnet_ids = [
      aws_subnet.private_subnet[0].id,
      aws_subnet.private_subnet[1].id,
      aws_subnet.public_subnet[0].id,
      aws_subnet.public_subnet[1].id
    ]
  }

  depends_on = [ aws_iam_role_policy_attachment.eks_cluster ]
}

