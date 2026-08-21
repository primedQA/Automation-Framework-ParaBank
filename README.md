# ParaBank Playwright Automation Framework

A TypeScript + Playwright test automation framework for [ParaBank](https://parabank.parasoft.com), Parasoft's public banking demo application, built using the Page Object Model (POM) pattern.

## Tech Stack

- [Playwright](https://playwright.dev) (TypeScript)
- GitHub Actions for CI

## Project Structure

```
pages/        Page Object classes - one per page, each extends BasePage
tests/        Spec files - one per feature/flow
testData/     Factory functions that generate test data objects
helpers/      Composed, reusable flows built on top of page objects (e.g. register + navigate + read)
```

## Design Conventions

- **Page Object Model**: every page is its own class extending `BasePage`, which owns shared behavior (navigation, title reads). Each page object owns a `private readonly url` and a `goto()` method — callers never hardcode a path.
- **Locators built once**: locator fields are private and initialized in the constructor, verified directly against the live DOM rather than guessed.
- **Test data via factories**: rather than static hardcoded data, `testData/` exposes factory functions (e.g. `createRegistrationDetails()`) so values like usernames that must be unique per run are generated fresh each call.
- **Flows layer for composition**: `helpers/userFlows.ts` composes multiple page-object calls into single reusable functions (e.g. `registerAndOpenAccount`) for sequences that many tests need, without pushing navigation or multi-step logic into the page objects themselves.
- **Guard checks vs. test assertions**: shared setup helpers (e.g. `registerNewUser`) include a fail-fast assertion confirming the setup step succeeded, so a broken precondition surfaces immediately rather than as a confusing failure several steps later. The actual behavior under test is always asserted in the spec file, not the helper.

## Running Tests

```
npm ci
npx playwright install --with-deps
npx playwright test --project=chromium
```

## Continuous Integration

Every pull request against `main` triggers a GitHub Actions workflow (`.github/workflows/playwright.yml`) that installs dependencies and runs the full Playwright suite headless on Ubuntu, gating merges on a passing run.

## Test Coverage

- **Registration & Login**: new user registration, auto-login behavior, invalid credential handling
- **Accounts Overview**: reading account IDs and balances
- **Open New Account**: opening checking/savings accounts and verifying correct labeling
- **Transfer Funds**: transferring between two accounts, verifying balances and confirmation details
- **Bill Pay**: paying a bill from a verified source account and verifying the confirmation message

## Known Site Behavior

ParaBank's public demo instance sits behind Cloudflare bot-protection, which can return an "Access denied" block page instead of the application under sustained automated traffic. This surfaces as misleading symptoms unrelated to the framework itself — inconsistent pass/fail on identical test runs, false "username already exists" errors, and element-not-found timeouts. Root-caused via Playwright's trace viewer (Network tab), which showed the actual response as Cloudflare's block page rather than an application error.

Mitigations applied in `playwright.config.ts`: capped worker concurrency (`workers: 3`) to reduce simultaneous request volume, and one automatic retry (`retries: 1`) to absorb an occasional block without manual intervention.
