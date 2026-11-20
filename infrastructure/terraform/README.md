# Terraform Configuration

This directory contains Terraform configurations for deploying the application to Cloudflare Workers (vinext).

## Usage

1. Initialize Terraform:

   ```bash
   terraform init
   ```

2. Create a terraform.tfvars file with your variables:

   ```hcl
   cloudflare_api_token = "your-cloudflare-token"
   account_id = "your-cloudflare-account-id"
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

- Cloudflare Zone: gabfon.com
- Worker Routes: gabfon.com/* and _.gabfon.com/_
- D1 Database: site-db

## Variables

- `cloudflare_api_token`: Cloudflare API token (sensitive)
- `account_id`: Cloudflare account ID (sensitive)
