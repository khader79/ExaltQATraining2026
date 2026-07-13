import { test as base, expect } from "@playwright/test";
import MainPage from "./pages/MainPage.js";
import FormPage from "./pages/FormPage.js";
import StagesPage from "./pages/StagesPage.js";
import { getDynamicValidCredentials } from "./utils/helper.js";

const test = base.extend({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await use(mainPage);
  },

  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },

  stagesPage: async ({ page }, use) => {
    await use(new StagesPage(page));
  },

  dynamicCredentials: async ({}, use) => {
    const credentials = getDynamicValidCredentials();
    await use(credentials);
  },
});

export { test, expect };
