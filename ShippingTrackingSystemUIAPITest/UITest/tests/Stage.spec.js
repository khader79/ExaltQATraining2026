import { test, expect } from "@playwright/test";
import {
  MESSAGES,
  SHIPPING_STAGES,
  REJECTION_CAUSES,
} from "../config/constants";
import FormPage from "../pages/FormPage";
import MainPage from "../pages/MainPage";
import StagesPage from "../pages/StagesPage";
import { getDynamicValidCredentials } from "../utils/helper";

test.describe("Stage Page Tests", () => {
  let formPage;
  let mainPage;
  let stagesPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    mainPage = new MainPage(page);
    stagesPage = new StagesPage(page);
    await mainPage.navigate();

    const credentials = getDynamicValidCredentials();
    await formPage.fill_the_form(credentials.trackingId, credentials.password);
  });

  test("Verify that the stages are displayed correctly", async () => {
    const stagesCount = stagesPage.getStageCount();
    await expect(stagesPage.getStages()).toBeVisible();

    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.LOAD_STAGES_SUCCESS,
    );
    expect(await stagesCount).toBe(6);

    expect(await stagesPage.getStageText(0)).toContain(SHIPPING_STAGES.STAGE_1);
    expect(await stagesPage.getStageText(1)).toContain(SHIPPING_STAGES.STAGE_2);
    expect(await stagesPage.getStageText(2)).toContain(SHIPPING_STAGES.STAGE_3);
    expect(await stagesPage.getStageText(3)).toContain(SHIPPING_STAGES.STAGE_4);
    expect(await stagesPage.getStageText(4)).toContain(SHIPPING_STAGES.STAGE_5);
    expect(await stagesPage.getStageText(5)).toContain(SHIPPING_STAGES.STAGE_6);

    for (let i = 0; i < 6; i++) {
      await expect(stagesPage.getDoneButton(i)).toBeVisible();
      await expect(stagesPage.getPendingButton(i)).toBeVisible();
      await expect(stagesPage.getRejectedButton(i)).toBeVisible();
    }
  });

  test("Verify Stage 1 buttons are enabled initially and pending button is disabled", async () => {
    await expect(stagesPage.getDoneButton(0)).toBeEnabled();
    await expect(stagesPage.getPendingButton(0)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(0)).toBeEnabled();
  });

  test("Verify Stage 2 buttons are disabled initially", async () => {
    await expect(stagesPage.getDoneButton(1)).toBeDisabled();
    await expect(stagesPage.getPendingButton(1)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(1)).toBeDisabled();
  });

  test("Verify Stage 3 buttons are disabled initially", async () => {
    await expect(stagesPage.getDoneButton(2)).toBeDisabled();
    await expect(stagesPage.getPendingButton(2)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(2)).toBeDisabled();
  });

  test("Verify Stage 4 buttons are disabled initially", async () => {
    await expect(stagesPage.getDoneButton(3)).toBeDisabled();
    await expect(stagesPage.getPendingButton(3)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(3)).toBeDisabled();
  });

  test("Verify Stage 5 buttons are disabled initially", async () => {
    await expect(stagesPage.getDoneButton(4)).toBeDisabled();
    await expect(stagesPage.getPendingButton(4)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(4)).toBeDisabled();
  });

  test("Verify Stage 6 buttons are disabled initially", async () => {
    await expect(stagesPage.getDoneButton(5)).toBeDisabled();
    await expect(stagesPage.getPendingButton(5)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(5)).toBeDisabled();
  });

  test("Verify rejection controls are hidden initially", async () => {
    const containers = stagesPage.getRejectionContainer();
    const count = await containers.count();
    for (let i = 0; i < count; i++) {
      await expect(containers.nth(i)).toBeHidden();
      await expect(stagesPage.getRejectionInput(i)).toBeHidden();
      await expect(stagesPage.getRejectionSubmit(i)).toBeHidden();
    }
  });

  test("Verify rejection controls are visible when rejected button is clicked", async () => {
    await stagesPage.getRejectedButton(0).click();
    await expect(stagesPage.getRejectionContainer().nth(0)).toBeVisible();
    await expect(stagesPage.getRejectionInput(0)).toBeVisible();
    await expect(stagesPage.getRejectionSubmit(0)).toBeVisible();
  });

  test("Verify stage cannot be rejected without entering a reason", async () => {
    await stagesPage.getRejectedButton(0).click();
    await expect(stagesPage.getRejectionContainer().nth(0)).toBeVisible();
    await expect(stagesPage.getRejectionInput(0)).toBeVisible();
    await expect(stagesPage.getRejectionSubmit(0)).toBeVisible();
    await stagesPage.clickRejectionSubmit(0);

    await expect(stagesPage.getRejectionContainer().nth(0)).toBeVisible();
    await expect(mainPage.getErrorMessageLocator()).toContainText(
      MESSAGES.REJECTION_ERROR,
    );
  });

  test("Verify stage can be rejected after entering a valid reason", async () => {
    await stagesPage.getRejectedButton(0).click();
    await expect(stagesPage.getRejectionContainer().nth(0)).toBeVisible();
    await expect(stagesPage.getRejectionInput(0)).toBeVisible();

    await stagesPage.getRejectionInput(0).fill(REJECTION_CAUSES.CAUSE_1);
    await stagesPage.clickRejectionSubmit(0);

    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.REJECTION_SUCCESS(0),
    );
  });

  test("Verify a rejected stage can be changed to Pending", async () => {
    await stagesPage.getRejectedButton(0).click();
    await stagesPage.getRejectionInput(0).fill(REJECTION_CAUSES.CAUSE_1);
    await stagesPage.clickRejectionSubmit(0);

    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.REJECTION_SUCCESS(0),
    );
    await stagesPage.getPendingButton(0).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.PENDING_SUCCESS(0),
    );
  });

  test("Verify a rejected stage can be changed to Done", async () => {
    await stagesPage.getRejectedButton(0).click();
    await stagesPage.getRejectionInput(0).fill(REJECTION_CAUSES.CAUSE_1);
    await stagesPage.clickRejectionSubmit(0);

    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.REJECTION_SUCCESS(0),
    );
    await stagesPage.getPendingButton(0).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.PENDING_SUCCESS(0),
    );
    await stagesPage.getDoneButton(0).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(0),
    );
  });

  test("Verify users cannot skip shipment stages", async () => {
    await expect(stagesPage.getDoneButton(2)).toBeDisabled();
    await expect(stagesPage.getPendingButton(2)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(2)).toBeDisabled();
  });

  test("Verify Stage 2 becomes available after Stage 1 is completed", async () => {
    await stagesPage.getDoneButton(0).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(0),
    );
    await expect(stagesPage.getDoneButton(1)).toBeEnabled();
    await expect(stagesPage.getPendingButton(1)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(1)).toBeEnabled();
  });

  test("Verify Stage 3 becomes available after Stage 2 is completed", async () => {
    await stagesPage.getDoneButton(0).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(0),
    );
    await stagesPage.getDoneButton(1).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(1),
    );
    await expect(stagesPage.getDoneButton(2)).toBeEnabled();
    await expect(stagesPage.getPendingButton(2)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(2)).toBeEnabled();
  });

  test("Verify Stage 4 becomes available after Stage 3 is completed", async () => {
    await stagesPage.getDoneButton(0).click();
    await stagesPage.getDoneButton(1).click();
    await stagesPage.getDoneButton(2).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(2),
    );
    await expect(stagesPage.getDoneButton(3)).toBeEnabled();
    await expect(stagesPage.getPendingButton(3)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(3)).toBeEnabled();
  });

  test("Verify Stage 5 becomes available after Stage 4 is completed", async () => {
    await stagesPage.getDoneButton(0).click();
    await stagesPage.getDoneButton(1).click();
    await stagesPage.getDoneButton(2).click();
    await stagesPage.getDoneButton(3).click();
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(3),
    );
    await expect(stagesPage.getDoneButton(4)).toBeEnabled();
    await expect(stagesPage.getPendingButton(4)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(4)).toBeEnabled();
  });

  test("Verify Stage 6 becomes available after Stage 5 is completed", async () => {
    for (let i = 0; i < 5; i++) {
      await stagesPage.getDoneButton(i).click();
    }
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(4),
    );
    await expect(stagesPage.getDoneButton(5)).toBeEnabled();
    await expect(stagesPage.getPendingButton(5)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(5)).toBeEnabled();
  });

  test("Verify final shipment stage can be completed", async () => {
    for (let i = 0; i < 6; i++) {
      await stagesPage.getDoneButton(i).click();
    }
    await expect(mainPage.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(5),
    );
  });

  test("Verify a completed stage cannot be modified", async () => {
    await stagesPage.getDoneButton(0).click();
    await expect(stagesPage.getDoneButton(0)).toBeDisabled();
    await expect(stagesPage.getPendingButton(0)).toBeDisabled();
    await expect(stagesPage.getRejectedButton(0)).toBeDisabled();
  });

  test("Verify all shipment stages can be completed sequentially", async () => {
    for (let i = 0; i < 6; i++) {
      await stagesPage.getDoneButton(i).click();
      await expect(mainPage.getSuccessMessageLocator()).toContainText(
        MESSAGES.DONE_SUCCESS(i),
      );
    }
  });
});
