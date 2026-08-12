# Terraform Configuration

This directory contains Terraform configurations for deploying the application to Vercel.

## Usage

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Create a terraform.tfvars file with your variables:
   ```hcl
   vercel_token = "your-vercel-token"
   database_url = "your-database-url"
   ```

3. Review the planned changes:
   ```bash
   terraform plan
   ```

4. Apply the configuration:
   ```bash
   terraform apply
   ```

## Resources

- Vercel Project: Configured for Next.js with TurboRepo
- Custom Domain: gabfon.com
- Environment Variables: Database URL and other secrets

## Variables

- `vercel_token`: Vercel API token (sensitive)
- `database_url`: Database connection string (sensitive)
- `project_name`: Name of the Vercel project (default: "gabfon-site")
- `git_repo`: GitHub repository in format "owner/repo" (default: "gabfon/site")
