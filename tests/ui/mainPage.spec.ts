import { test, expect } from '../../src/fixtures/mainPageFixture';

test.describe("Тестирование элементов хедера", () => {
  test("Проверка отображения элементов хедера", async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test("Проверка названия элементов хедера", async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test("Проверка атрибутов href элементов хедера", async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test("Проверка переключечния лайт мода", async ({ mainPage }) => {
    await test.step("нажатие на иконку переключения light mode", async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step("проверка смены значения аттрибута", async () => {
      await mainPage.checkDataThemeAttribute();
    });
  });

  test(`Проверка стилей light mode`, async ({ mainPage }) => {
    await test.step("установка светлой темы", async () => {
      await mainPage.setLightMode();
    });
    await test.step("Скриншотная проверка с активной светлой темой", async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Проверка стилей Dark mode`, async ({ mainPage }) => {
    await test.step("установка темной темы", async () => {
      await mainPage.setDarkMode();
    });
    await test.step("Скриншотная проверка с активной темной темой", async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
