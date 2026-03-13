import { test, expect, Page, Locator } from "@playwright/test";

interface ElementsHeader {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elementsHeader: ElementsHeader[] = [
  {
    locator: (page: Page) =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo link",
    text: "Playwright",
    attribute: {
      type: "href",
      value: "/",
    },
  },
  {
    locator: (page: Page) => page.getByRole("link", { name: "Docs" }),
    name: "Docs link",
    text: "Docs",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
  {
    locator: (page: Page) => page.getByRole("link", { name: "API" }),
    name: "API link",
    text: "API",

    attribute: {
      type: "href",
      value: "/docs/api/class-playwright",
    },
  },
  {
    locator: (page: Page) => page.getByRole("button", { name: "Node.js" }),
    name: "Node.js button",
    text: "Node.js",
  },
  {
    locator: (page: Page) => page.getByRole("link", { name: "Community" }),
    name: "Community link",
    text: "Community",
    attribute: {
      type: "href",
      value: "/community/welcome",
    },
  },
  {
    locator: (page: Page) =>
      page.getByRole("link", { name: "GitHub repository" }),
    name: "GitHub ICON",
    attribute: {
      type: "href",
      value: "https://github.com/microsoft/playwright",
    },
  },
  {
    locator: (page: Page) => page.getByRole("link", { name: "Discord server" }),
    name: "Discord ICON",
    attribute: {
      type: "href",
      value: "https://aka.ms/playwright/discord",
    },
  },
  {
    locator: (page: Page) =>
      page.getByRole("button", { name: "Switch between dark and light" }),
    name: "light-dark mode ICON",
  },
  {
    locator: (page: Page) =>
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    name: "Title",
    text: "Playwright enables reliable end-to-end testing for modern web apps.",
  },
  {
    locator: (page: Page) => page.getByRole("link", { name: "Get started" }),
    name: "Get started button",
    text: "Get started",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
];

const themeSLDmode = ["light", "dark", "system"];

test.describe("Тестирование элементов хедера", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Проверка отображения элементов хедера", async ({ page }) => {
    elementsHeader.forEach(({ locator, name }) => {
      test.step(`проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test("Проверка названия элементов хедера", async ({ page }) => {
    elementsHeader.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка элемента ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test("Проверка атрибутов href элементов хедера", async ({ page }) => {
    elementsHeader.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка атрибута ${name}`, async () => {
          await expect
            .soft(locator(page))
            .toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    });
  });

  themeSLDmode.forEach((value) => {
    test(`Проверка *system*light*dark* theme, текущий: ${value} mode`, async ({ page }) => {
      await page.evaluate((value)=>{
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`${value}_mode.png`);
    });
  });
});