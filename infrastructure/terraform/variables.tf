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

variable "project_name" {
  description = "Name of the Vercel project"
  type        = string
  default     = "gabfon-site"
}

variable "git_repo" {
  description = "GitHub repository in format 'owner/repo'"
  type        = string
  default     = "gabfon/site"
}
