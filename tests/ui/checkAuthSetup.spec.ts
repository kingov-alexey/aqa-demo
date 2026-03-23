import { test, expect } from "@playwright/test";

test("Проверка окружения на наличие авторизованного пользователя", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
//   await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");  
});
