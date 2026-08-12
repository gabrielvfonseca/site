terraform {
  required_version = ">= 1.0.0"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
  }
}

provider "vercel" {
  # Token can be set via VERCEL_TOKEN environment variable
  # token = var.vercel_token
}

# Vercel project configuration
resource "vercel_project" "site" {
  name = "gabfon-site"
  framework = "nextjs"
  build_command = "bun install && turbo build --filter=site"
  output_directory = "apps/web/.next"
  
  git_repository {
    repo = "gabfon/site"
    type = "github"
  }
  
  environment {
    key = "NODE_ENV"
    value = "production"
    target = ["production"]
  }
}

# Vercel domain
resource "vercel_domain" "site" {
  project_id = vercel_project.site.id
  domain_name = "gabfon.com"
}

# Vercel environment variables (example)
resource "vercel_env_var" "database_url" {
  project_id = vercel_project.site.id
  key        = "DATABASE_URL"
  value      = var.database_url
  target     = ["production", "preview"]
}

# Input variables
variable "vercel_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "database_url" {
  description = "Database connection URL"
  type        = string
  sensitive   = true
}
