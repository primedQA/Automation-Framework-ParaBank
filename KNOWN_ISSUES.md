# Known API/Application Defects

Bugs discovered in ParaBank's live application/API during test development.
These aren't bugs in this framework — ParaBank is Parasoft's demo app — they're
documented here as evidence the automated suite is specifically watching for,
so a future behavior change gets flagged rather than silently missed.

## 1. Non-existent account ID returns 500 instead of 404

**Endpoint:** `GET /parabank/services_proxy/bank/accounts/{id}`
**Steps to reproduce:** While authenticated, request an account ID that doesn't exist (e.g. `999999999`).
**Expected:** `404 Not Found` — a request for a resource that doesn't exist should be handled gracefully.
**Actual:** `500 Internal Server Error` — suggests an unhandled exception server-side.
**Covered by test:** `tests/api/AccountApi.spec.ts` — "GET account by non-existent id returns 500 instead of 404"