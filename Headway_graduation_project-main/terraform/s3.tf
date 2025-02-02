resource "aws_s3_bucket" "bucket" {
  bucket = "biboaccesslog"  
}


resource "aws_s3_bucket_policy" "example_bucket_policy" {
  bucket = aws_s3_bucket.bucket.bucket

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "arn:aws:iam::127311923021:root"
        },
        "Action" : "s3:PutObject",
        "Resource" : "arn:aws:s3:::biboaccesslog/AWSLogs/${var.account_id}/*"
      }
    ]
  })
}
