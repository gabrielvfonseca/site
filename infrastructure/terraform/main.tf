terraform {
  required_version = ">= 1.0.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  # Token can be set via CLOUDFLARE_API_TOKEN environment variable
  # token = var.cloudflare_api_token
}

# Cloudflare zone for gabfon.com
resource "cloudflare_zone" "site" {
  zone  = "gabfon.com"
  plan  = "free"
  paused = false
}

# Worker route for the site worker on the apex domain
resource "cloudflare_workers_route" "site" {
  zone_id   = cloudflare_zone.site.id
  pattern   = "gabfon.com/*"
  script_name = "site"
}

# Worker route for the wildcard domain
resource "cloudflare_workers_route" "wildcard" {
  zone_id   = cloudflare_zone.site.id
  pattern   = "*.gabfon.com/*"
  script_name = "site"
}

# D1 database for the site
resource "cloudflare_d1_database" "site_db" {
  name = "site-db"
}

# Input variables
variable "cloudflare_api_token" {
  description = "Cloudflare API token (Worker Scripts: Edit, Routes: Edit, D1: Edit)"
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare account ID"
  type        = string
  sensitive   = true
}
