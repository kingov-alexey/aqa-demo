import { Page, expect } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
}
