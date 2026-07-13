import { expect } from "@playwright/test";

export async function expectSuccessMessage(mainPage, expectedText) {
  await expect(mainPage.getSuccessMessageLocator()).toContainText(expectedText);
}

export async function expectErrorMessage(mainPage, expectedText) {
  await expect(mainPage.getErrorMessageLocator()).toContainText(expectedText);
}

export async function expectStagesVisible(stagesPage) {
  await expect(stagesPage.getStages()).toBeVisible();
}

export async function expectStagesHidden(stagesPage) {
  await expect(stagesPage.getStages()).not.toBeVisible();
}

export async function expectStageCount(stagesPage, count) {
  expect(await stagesPage.getStageCount()).toBe(count);
}

export async function expectButtonEnabled(locator) {
  await expect(locator).toBeEnabled();
}

export async function expectButtonDisabled(locator) {
  await expect(locator).toBeDisabled();
}

export async function expectVisible(locator) {
  await expect(locator).toBeVisible();
}

export async function expectHidden(locator) {
  await expect(locator).toBeHidden();
}
