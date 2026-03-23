import { test, expect } from "@playwright/test";

test("Проверка окружения c авторизованным пользователем", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");
});
