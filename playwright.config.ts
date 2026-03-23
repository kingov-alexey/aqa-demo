import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  snapshotPathTemplate: "{testDir}/screenshots/{testFilePath}/{arg}{ext}",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // Настройки, указанные в секции use, будут применяться ко всем тестам и проектам, что обеспечивает единообразие и стабильность выполнения тестов, а также упрощает конфигурацию и поддержку тестовой среды.
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://playwright.dev",
    // Установка размера окна для всех тестов обеспечивает стабильность и консистентность визуальных тестов, так как гарантирует, что элементы будут отображаться в одинаковых условиях на разных устройствах и средах выполнения.
    viewport: { width: 1280, height: 720 },
    // Установка deviceScaleFactor для всех тестов обеспечивает стабильность и консистентность визуальных тестов, особенно при сравнении скриншотов, так как гарантирует, что изображения будут сняты с одинаковым масштабом на разных устройствах и средах выполнения.
    deviceScaleFactor: 1,
    // Установка локали для всех тестов, что обеспечивает стабильность отображения текста и форматов данных, особенно при работе с элементами, зависящими от локали, такими как даты, числа или текстовые элементы.
    locale: "en-US",
    // Установка часового пояса для всех тестов, что обеспечивает стабильность отображения времени и дат в тестах, особенно при работе с элементами, зависящими от часового пояса, такими как календари или временные метки.
    timezoneId: "UTC",
    // Установка цветовой схемы по умолчанию для всех тестов, что обеспечивает стабильность визуальных тестов и предотвращает неожиданные изменения в отображении элементов из-за различий в цветовой схеме между средами выполнения.
    colorScheme: "light",
    // Настройка для запуска тестов в headless режиме, что обеспечивает более стабильное выполнение тестов и оптимальное использование ресурсов, особенно в CI/CD средах.
    headless: true,
    // Настройка для сбора трассировки только при первой повторной попытке, что позволяет оптимизировать использование ресурсов и фокусироваться на анализе проблемных случаев.
    trace: "on-first-retry",
    // Настройка для сохранения скриншотов и видео только при неудачных тестах, что оптимизирует использование ресурсов и упрощает анализ проблемных случаев.
    screenshot: "only-on-failure",
    // Настройка для сохранения видео только при неудачных тестах, что позволяет сохранять ресурсы и фокусироваться на анализе проблемных случаев.
    video: "retain-on-failure",
  },

  // Настройка для сравнения скриншотов с эталонными изображениями, что обеспечивает стабильность визуальных тестов и позволяет выявлять изменения в интерфейсе, 
  // которые могут быть вызваны изменениями в коде или среде выполнения. Установка maxDiffPixelRatio позволяет определить допустимый порог различий между текущим скриншотом и эталонным изображением, что помогает избежать ложных срабатываний из-за незначительных изменений в отображении.
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      caret: "hide",
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { 
      name: 'setup-standart-user',
      testMatch: /.*\.setup\.ts/,
    },
      
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: 'playwright/.auth/standard-user.json', },
      dependencies: ['setup-standart-user'],
    },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },
    
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
