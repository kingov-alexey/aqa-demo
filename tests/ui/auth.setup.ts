import { test as setup, expect } from "@playwright/test";
import { login } from "../../src/utils/auth";
import { AUTH_FILE } from "../../src/config/auth";

setup("Аутентификация", async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await page.context().storageState({ path: AUTH_FILE });
});
