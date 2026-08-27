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

## 2. Customer profile update sends password and SSN as plain-text query string parameters

**Endpoint:** `POST /parabank/services_proxy/bank/customers/update/{customerId}`
**Steps to reproduce:** While authenticated, submit the Update Contact Info form (including a username/password change) and inspect the outgoing request in DevTools.
**Expected:** Sensitive fields like `password` and `ssn` should travel in the request body, not be appended to the URL as query string parameters — query strings are routinely captured in server access logs, proxy logs, browser history, and `Referer` headers, all of which can persist and leak this data well past the lifetime of the request itself.
**Actual:** Both `password` and `ssn` are sent as plain-text query string parameters alongside the non-sensitive fields (`firstName`, `lastName`, `street`, `city`, `state`, `zipCode`, `phoneNumber`, `username`) — e.g. `.../customers/update/67046?...&ssn=1234567890&username=hktest&password=123`.
**Covered by test:** Not yet — found via manual DevTools inspection while mapping API endpoints, not through an automated assertion. Worth a dedicated test if the suite ever grows a security-focused testing angle.