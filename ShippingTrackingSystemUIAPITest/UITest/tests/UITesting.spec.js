import { test, expect } from "@playwright/test";
import { BASE_URL, VALID_TRACKING_Data } from "../config/constants";
import { CONTAINER_LOCATERS, FORM_LOCATERS } from "../config/locaters";
import FormPage from "../pages/FormPage";
import MainPage from "../pages/MainPage";

test.describe("UI Testing", () => {
  let formPage;
  let mainPage;
  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    mainPage = new MainPage(page);
    await mainPage.navigate();
  });

  test("Verify that the form is visible on the page", async ({ page }) => {
    expect(await formPage.isFormVisible()).toBe(true);
  });

  test("Verify that the container is visible on the page", async ({ page }) => {
    expect(await formPage.isContainerVisible()).toBe(true);
  });

  test("Make sure all fields and buttons in the form are visible.", async ({
    page,
  }) => {
    expect(await formPage.trackingIdInput.isVisible()).toBe(true);
    expect(await formPage.passwordInput.isVisible()).toBe(true);
    expect(await formPage.submitButton.isVisible()).toBe(true);
  });
});
