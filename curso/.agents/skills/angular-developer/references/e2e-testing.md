# End-to-End (E2E) Testing

This project uses [Playwright](https://playwright.dev) for end-to-end (E2E) testing, which simulates real user interactions in a browser. The E2E tests are located primarily within the `e2e/` package.

## Install

```shell
npx ng add playwright-ng-schematics
# Install Playwright browsers (can be done manually via 'npx playwright install')? (y/N) Yes
```

## Running E2E Tests

```shell
npm run e2e
```

### Angular CLI Integration

Angular projects that previously used Protractor can adopt Playwright as a direct replacement. The test directory conventionally lives at `e2e/` in Angular projects.

```
your-angular-app/
  src/
  e2e/
    tests/
      home.spec.ts
      auth.spec.ts
      products.spec.ts
    fixtures/
      auth.fixture.ts
    tools
      app.page.ts
      helpers.ts
  playwright.config.ts
  angular.json
  package.json
```

## Test Structure

- **Specs:** Test files (specs) are located in `e2e/tests/`.
- **Fixtures:** Establish the environment for each test is located at `e2e/fixtures/`.
- **Tools:** Reusable page object, custom actions and actions are defined in `e2e/tools/`.

### Example E2E Test Snippet

A typical test might look like this:

```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

## Best Practices

## Anti-Patterns

| Don't Do This | Problem | Do This Instead |
|---|---|---|
| `page.locator('[_ngcontent-abc123]')` | Angular scoped style attributes are random and change every build | Use `getByRole`, `getByLabel`, `getByText`, `getByTestId` |
| `page.locator('[ng-reflect-model="value"]')` | `ng-reflect-*` attributes only exist in dev mode; stripped in production | Test the rendered value: `expect(input).toHaveValue('value')` |
| `page.locator('app-my-component')` | Angular component selectors are implementation details | Target the content the component renders using semantic locators |
| `page.locator('.mat-mdc-button')` | Angular Material class names change between versions (MDC migration) | `page.getByRole('button', { name: 'Submit' })` |
| `page.evaluate(() => (window as any).ng)` to access Angular internals | Depends on debug mode; not available in production builds | Test through the DOM; never access the Angular runtime |
| `await page.waitForTimeout(500)` after clicking a button | Zone.js change detection timing varies; arbitrary waits are fragile | `await expect(locator).toHaveText('expected value')` auto-retries |
| `browser.waitForAngular()` (Protractor pattern) | Does not exist in Playwright; not needed -- Playwright auto-waits | Remove entirely; use web-first assertions |
| Test Angular services by injecting them via `page.evaluate` | Services are not accessible from the browser console in production | Test services indirectly through the UI they power; unit test with TestBed |
| Use `ng serve` in CI | Development server is slower, includes debug code, may hide production-only bugs | Use `ng build && http-server` in CI |
| Skip testing CDK overlay components (dialogs, selects, menus) | These are the most interactive parts of the app; bugs here are highly visible | Test overlays with role-based locators; they render in the regular DOM |
