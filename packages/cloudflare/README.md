# @gabfon/cloudflare

Centralized Cloudflare API v4 client and typed helpers for `gabfon.com`.

Every Cloudflare REST call in this repo goes through `apiFetch`, so auth, URL building, the response envelope, and error normalization live in one place.

## Exports

| Import | What it provides |
| --- | --- |
| `@gabfon/cloudflare` | `apiFetch`, `CloudflareApiError`, `sendCloudflareEmail`, `keys`, `isCloudflareConfigured`, `CF_ACCOUNT_ID_KEY`, `CF_API_TOKEN_KEY` |
| `@gabfon/cloudflare/client` | `apiFetch`, `CloudflareApiError`, `ApiFetchOptions`, `CloudflareApiResponse` |
| `@gabfon/cloudflare/keys` | `keys`, `isCloudflareConfigured`, `CF_ACCOUNT_ID_KEY`, `CF_API_TOKEN_KEY` |
| `@gabfon/cloudflare/email` | `sendCloudflareEmail`, `CloudflareEmailSendOptions`, `CloudflareEmailSendResult` |

## Auth

The client authenticates with a plain Bearer token and scopes requests to an account by id in the URL path. Configure:

- `CF_ACCOUNT_ID` — the Cloudflare account id
- `CF_API_TOKEN` — an API token (account-scoped)

Email Sending uses dedicated `EMAIL_*` keys (see `@gabfon/email`); the `sendCloudflareEmail` helper accepts its account and token explicitly so `@gabfon/email` can pass its own credentials without changing its public API.
