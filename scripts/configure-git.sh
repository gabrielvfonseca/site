#!/usr/bin/env bash

set -euo pipefail

# Text formatting helper functions
info() { echo -e "\033[1;34m[INFO]\033[0m $*"; }
success() { echo -e "\033[1;32m[SUCCESS]\033[0m $*"; }
warn() { echo -e "\033[1;33m[WARNING]\033[0m $*"; }
error() { echo -e "\033[1;31m[ERROR]\033[0m $*"; exit 1; }

echo "====================================================="
echo "   Git & Monorepo Configuration Standardization"
echo "====================================================="

# Ensure we are inside the Git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  error "Not in a git repository. Please run from the root of site-main."
fi

# Configure Repository-Level Git settings
info "Configuring repository-level Git configurations..."

# Line endings
git config core.safecrlf true
git config core.autocrlf false
success "Line ending safety configured (safecrlf=true, autocrlf=false)"

# Pull & Rebase workflow
git config pull.rebase true
git config rebase.autosquash true
success "Rebase workflow configured (pull.rebase=true, autosquash=true)"

# Remote hygiene & pruning
git config fetch.prune true
git config gc.pruneExpire "2 weeks ago"
success "Remote pruning configured (fetch.prune=true)"

# Conflict resolution strategy
git config merge.conflictstyle diff3
success "Extended conflict style (diff3) configured"

# Signed Commits (Recommendation)
info "Checking global signed commit settings..."
if git config --global commit.gpgsign | grep -i "true" >/dev/null 2>&1; then
  success "Global commit GPG signing is enabled."
else
  warn "GPG commit signing is not enabled globally."
  info "We highly recommend setting up GPG/SSH key commit signing."
  info "See GitHub guidelines: https://docs.github.com/en/authentication/managing-commit-signature-verification"
fi

echo "====================================================="
success "Local Git repository configuration complete!"
echo "====================================================="
