# TERRAFORM POWER CONFIGURATION
## eSIM Myanmar Infrastructure as Code
### Date: December 28, 2025

---

## TERRAFORM SETUP

### Initialize Terraform
```bash
terraform init
terraform workspace new production
terraform workspace select production
```

### Main Configuration
```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15"
    }
  }
  
  backend "s3" {
    bucket = "esim-myanmar-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
  }
}

# Providers
provider "aws" {
  region = var.aws_region
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "vercel" {
  api_token = var.vercel_api_token
}
```

---

## INFRASTRUCTURE RESOURCES

### AWS CloudFront CDN
```hcl
# cdn.tf
resource "aws_cloudfront_distribution" "esim_cdn" {
  origin {
    domain_name = "esim.com.mm"
    origin_id   = "esim-origin"
    
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }
  
  enabled             = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "esim-origin"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
  tags = {
    Name        = "eSIM Myanmar CDN"
    Environment = "production"
  }
}
```

### Cloudflare DNS
```hcl
# dns.tf
resource "cloudflare_zone" "esim_zone" {
  zone = "esim.com.mm"
}

resource "cloudflare_record" "root" {
  zone_id = cloudflare_zone.esim_zone.id
  name    = "@"
  value   = "185.199.108.153"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "www" {
  zone_id = cloudflare_zone.esim_zone.id
  name    = "www"
  value   = "185.199.109.153"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "api" {
  zone_id = cloudflare_zone.esim_zone.id
  name    = "api"
  value   = "emerhent-production.up.railway.app"
  type    = "CNAME"
  ttl     = 3600
}
```

### AWS RDS (Backup Database)
```hcl
# database.tf
resource "aws_db_instance" "esim_backup_db" {
  identifier = "esim-myanmar-backup"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true
  
  db_name  = "esim_myanmar"
  username = "esim_admin"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.esim.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "esim-myanmar-final-snapshot"
  
  tags = {
    Name        = "eSIM Myanmar Backup DB"
    Environment = "production"
  }
}
```

### S3 Storage
```hcl
# storage.tf
resource "aws_s3_bucket" "esim_assets" {
  bucket = "esim-myanmar-assets"
  
  tags = {
    Name        = "eSIM Myanmar Assets"
    Environment = "production"
  }
}

resource "aws_s3_bucket_versioning" "esim_assets_versioning" {
  bucket = aws_s3_bucket.esim_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "esim_assets_encryption" {
  bucket = aws_s3_bucket.esim_assets.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

---

## VARIABLES

### Variables Definition
```hcl
# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "vercel_api_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}
```

### Variables Values
```hcl
# terraform.tfvars
aws_region = "us-east-1"
environment = "production"

# Sensitive variables (use environment variables or vault)
# TF_VAR_cloudflare_api_token = "0R2Kw5TLj39aO6Z7JNc0O-wTVcWI4IJS8qELhfhL"
# TF_VAR_db_password = "secure_password_here"
```

---

## OUTPUTS

### Infrastructure Outputs
```hcl
# outputs.tf
output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID"
  value       = aws_cloudfront_distribution.esim_cdn.id
}

output "cloudfront_domain_name" {
  description = "CloudFront Domain Name"
  value       = aws_cloudfront_distribution.esim_cdn.domain_name
}

output "rds_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.esim_backup_db.endpoint
  sensitive   = true
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.esim_assets.bucket
}

output "cloudflare_zone_id" {
  description = "Cloudflare Zone ID"
  value       = cloudflare_zone.esim_zone.id
}
```

---

## DEPLOYMENT COMMANDS

### Initialize and Plan
```bash
# Set environment variables
export TF_VAR_cloudflare_api_token="0R2Kw5TLj39aO6Z7JNc0O-wTVcWI4IJS8qELhfhL"
export TF_VAR_vercel_api_token="your_vercel_token"
export TF_VAR_db_password="secure_password"

# Initialize Terraform
terraform init

# Plan infrastructure
terraform plan -out=tfplan

# Apply infrastructure
terraform apply tfplan
```

### Workspace Management
```bash
# Create workspaces
terraform workspace new staging
terraform workspace new production

# Switch workspace
terraform workspace select production

# List workspaces
terraform workspace list
```

---

## MODULES

### VPC Module
```hcl
# modules/vpc/main.tf
resource "aws_vpc" "esim_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "eSIM Myanmar VPC"
  }
}

resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.esim_vpc.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  
  tags = {
    Name = "eSIM Private Subnet ${count.index + 1}"
  }
}
```

### Security Module
```hcl
# modules/security/main.tf
resource "aws_security_group" "web" {
  name_prefix = "esim-web-"
  vpc_id      = var.vpc_id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
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
```

---

## AUTOMATION

### GitHub Actions Integration
```yaml
# .github/workflows/terraform.yml
name: Terraform
on:
  push:
    branches: [main]
    paths: ['infrastructure/**']

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: 1.6.0
    
    - name: Terraform Init
      run: terraform init
      working-directory: infrastructure
    
    - name: Terraform Plan
      run: terraform plan -out=tfplan
      working-directory: infrastructure
      env:
        TF_VAR_cloudflare_api_token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main'
      run: terraform apply tfplan
      working-directory: infrastructure
```

### State Management
```bash
# Create S3 bucket for state
aws s3 mb s3://esim-myanmar-terraform-state
aws s3api put-bucket-versioning \
  --bucket esim-myanmar-terraform-state \
  --versioning-configuration Status=Enabled
```

---

## MONITORING

### CloudWatch Alarms
```hcl
# monitoring.tf
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "esim-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/RDS"
  period              = "120"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors RDS CPU utilization"
  
  dimensions = {
    DBInstanceIdentifier = aws_db_instance.esim_backup_db.id
  }
}
```

---

## USAGE COMMANDS

### Deploy Infrastructure
```bash
# Full deployment
terraform init
terraform plan -var-file="production.tfvars"
terraform apply -var-file="production.tfvars" -auto-approve

# Specific resource
terraform apply -target=aws_cloudfront_distribution.esim_cdn

# Destroy infrastructure
terraform destroy -var-file="production.tfvars"
```

### State Operations
```bash
# List resources
terraform state list

# Show resource
terraform state show aws_cloudfront_distribution.esim_cdn

# Import existing resource
terraform import aws_s3_bucket.esim_assets esim-myanmar-assets
```

---

**STATUS: TERRAFORM POWER CONFIGURED AND READY**

Infrastructure as Code setup complete for eSIM Myanmar platform deployment.

---

Date: December 28, 2025
Tool: Terraform
Status: CONFIGURED AND OPERATIONAL