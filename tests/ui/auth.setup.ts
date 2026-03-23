import { test as setup, expect } from "@playwright/test";

const authFile = 'playwright/.auth/standard-user.json';

setup("Аутентификация", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await page.context().storageState({ path: authFile });
});
