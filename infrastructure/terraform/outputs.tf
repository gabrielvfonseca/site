output "zone_id" {
  description = "The Cloudflare zone ID"
  value       = cloudflare_zone.site.id
}

output "worker_route_ids" {
  description = "IDs of the worker routes"
  value       = [cloudflare_workers_route.site.id, cloudflare_workers_route.wildcard.id]
}

output "d1_database_id" {
  description = "The D1 database ID"
  value       = cloudflare_d1_database.site_db.id
}

output "d1_database_name" {
  description = "The D1 database name"
  value       = cloudflare_d1_database.site_db.name
}
