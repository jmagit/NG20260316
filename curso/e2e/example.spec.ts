import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Angular/);
});

test('navega', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Calculadora' }).click();
  await page.getByRole('link', { name: 'Formulario' }).click();
});

