import { test, expect, Page, Locator } from "@playwright/test";
import { MainPage } from "../../src/pages/MainPage";

let mainPage: MainPage;

test.describe("Тестирование элементов хедера", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test("Проверка отображения элементов хедера", async () => {
    await mainPage.checkElementsVisibility();
  });

  test("Проверка названия элементов хедера", async () => {
    await mainPage.checkElementsText();
  });

  test("Проверка атрибутов href элементов хедера", async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test("Проверка переключечния лайт мода", async () => {
    await test.step("нажатие на иконку переключения light mode", async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step("проверка смены значения аттрибута", async () => {
      await mainPage.checkDataThemeAttribute();
    });
  });

  test(`Проверка стилей light mode`, async () => {
    await test.step("установка светлой темы", async () => {
      await mainPage.setLightMode();
    });
    await test.step("Скриншотная проверка с активной светлой темой", async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей Dark mode`, async () => {
    await test.step("установка темной темы", async () => {
      await mainPage.setDarkMode();
    });
    await test.step("Скриншотная проверка с активной темной темой", async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
