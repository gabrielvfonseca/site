output "project_id" {
  description = "The ID of the Vercel project"
  value       = vercel_project.site.id
}

output "project_url" {
  description = "The URL of the deployed Vercel project"
  value       = vercel_project.site.url
}

output "domain_ids" {
  description = "List of domain IDs associated with the project"
  value       = [for d in vercel_domain.site : d.id]
}
