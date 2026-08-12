# Infrastructure

This directory contains all infrastructure-related configurations and scripts for the project.

## Structure

```
infrastructure/
├── docker/           # Docker Compose and Dockerfile configurations
├── migrations/       # Database migration scripts
├── supabase/         # Supabase local development configurations
�└── terraform/        # Terraform configurations for cloud deployment
```

## Docker

The `docker/` directory contains:
- `docker-compose.yml`: Docker Compose configuration for local development
- `Dockerfile`: Container image definition

## Migrations

The `migrations/` directory contains SQL migration scripts organized by:
- `schema/`: DDL (Data Definition Language) for database schema
- `seed/`: DML (Data Manipulation Language) for development seed data
- `functions/`: Views and stored procedures

## Supabase

The `supabase/` directory contains local Supabase configuration:
- `config.toml`: Supabase CLI configuration
- `templates/`: Email templates for authentication flows
- `snippets/`: Supabase Edge Function snippets

## Terraform

The `terraform/` directory contains Infrastructure as Code configurations for deploying the application to various cloud providers.
