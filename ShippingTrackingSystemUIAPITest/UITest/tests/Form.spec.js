import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  VALID_TRACKING_Data,
  MESSAGES,
  INVALID_TRACKING_Data,
  SHIPPING_STAGES,
} from "../config/constants";
import { CONTAINER_LOCATERS, FORM_LOCATERS } from "../config/locaters";
import FormPage from "../pages/FormPage";
import MainPage from "../pages/MainPage";
import StagesPage from "../pages/StagesPage";

test.describe("Form Page Tests", () => {
  let formPage;
  let mainPage;
  let stagesPage;
  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    mainPage = new MainPage(page);
    stagesPage = new StagesPage(page);
    await mainPage.navigate();
  });

  test("Verify successful tracking with valid Tracking ID and Password", async ({
    page,
  }) => {
    await formPage.fill_the_form(
      VALID_TRACKING_Data.TrackingId,
      VALID_TRACKING_Data.Password,
    );
    expect(await stagesPage.getStages()).toBeVisible();
    expect(await mainPage.getSuccessMessageText()).toContain(
      MESSAGES.LOAD_STAGES_SUCCESS,
    );
    expect(await stagesPage.getStageCount()).toBe(6);
    expect(await stagesPage.getStageText(0)).toContain(SHIPPING_STAGES.STAGE_1);
    expect(await stagesPage.getStageText(1)).toContain(SHIPPING_STAGES.STAGE_2);
    expect(await stagesPage.getStageText(2)).toContain(SHIPPING_STAGES.STAGE_3);
    expect(await stagesPage.getStageText(3)).toContain(SHIPPING_STAGES.STAGE_4);
    expect(await stagesPage.getStageText(4)).toContain(SHIPPING_STAGES.STAGE_5);
    expect(await stagesPage.getStageText(5)).toContain(SHIPPING_STAGES.STAGE_6);
  });

  test("Confirm that the tracking process failed when an invalid ID number was entered.", async ({
    page,
  }) => {
    await formPage.fill_the_form(
      INVALID_TRACKING_Data.TrackingId,
      VALID_TRACKING_Data.Password,
    );
    expect(await stagesPage.getStages()).not.toBeVisible();
    expect(await mainPage.getErrorMessageText()).toContain(
      MESSAGES.ID_PASSWORD_ERROR,
    );
  });

  test("Confirm that the tracking process failed when an invalid Password was entered.", async ({
    page,
  }) => {
    await formPage.fill_the_form(
      VALID_TRACKING_Data.TrackingId,
      INVALID_TRACKING_Data.Password,
    );
    expect(await stagesPage.getStages()).not.toBeVisible();
    expect(await mainPage.getErrorMessageText()).toContain(
      MESSAGES.ID_PASSWORD_ERROR,
    );
  });

  test("Confirm that the tracking process failed when an empty ID number was entered.", async ({
    page,
  }) => {
    await formPage.fill_the_form(
      INVALID_TRACKING_Data.empty,
      VALID_TRACKING_Data.Password,
    );
    expect(await stagesPage.getStages()).not.toBeVisible();
    expect(await mainPage.getErrorMessageText()).toContain(
      MESSAGES.ID_PASSWORD_ERROR,
    );
  });

  test("Confirm that the tracking process failed when an empty Password was entered.", async ({
    page,
  }) => {
    await formPage.fill_the_form(
      VALID_TRACKING_Data.TrackingId,
      INVALID_TRACKING_Data.empty,
    );
    expect(await stagesPage.getStages()).not.toBeVisible();
    expect(await mainPage.getErrorMessageText()).toContain(
      MESSAGES.ID_PASSWORD_ERROR,
    );
  });
});
