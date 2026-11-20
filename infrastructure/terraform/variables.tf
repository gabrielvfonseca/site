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
