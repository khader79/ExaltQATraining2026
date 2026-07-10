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

test.describe("Stage Page Tests", () => {
  let formPage;
  let mainPage;
  let stagesPage;
  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    mainPage = new MainPage(page);
    stagesPage = new StagesPage(page);
    await mainPage.navigate();

    await formPage.fill_the_form(
      VALID_TRACKING_Data.TrackingId,
      VALID_TRACKING_Data.Password,
    );
  });
  test("Verify that the stages are displayed correctly", async ({ page }) => {
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
    expect(await stagesPage.getDoneButton()).toBeVisible();
    expect(await stagesPage.getPendingButton()).toBeVisible();
    expect(await stagesPage.getRejectedButton()).toBeVisible();
  });
});
