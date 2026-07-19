import MainPage from "./MainPage.js";
import { STAGES_LOCATERS } from "./locaters.js";
import { SHIPPING_STAGES_LIST } from "../config/stages.js";
import { MESSAGES } from "../config/messages.js";

export default class StagesPage extends MainPage {
  constructor(page) {
    super(page);
    this.stages = this.page.locator(STAGES_LOCATERS.STAGES);
    this.stage = this.page.locator(STAGES_LOCATERS.STAGE);
    this.doneButton = this.page.locator(STAGES_LOCATERS.DONE_BUTTON);
    this.pendingButton = this.page.locator(STAGES_LOCATERS.PENDING_BUTTON);
    this.rejectedButton = this.page.locator(STAGES_LOCATERS.REJECTED_BUTTON);
    this.rejectionContainer = this.page.locator(
      STAGES_LOCATERS.REJECTION_CONTAINER,
    );
    this.rejectionInput = this.page.locator(STAGES_LOCATERS.REJECTION_INPUT);
    this.rejectionSubmit = this.page.locator(STAGES_LOCATERS.REJECTION_SUBMIT);
  }

  isStagesVisible() {
    return this.stages.isVisible();
  }

  getStages() {
    return this.stages;
  }

  async getStageCount() {
    return await this.stage.count();
  }

  async getStageText(index) {
    return await this.stage.nth(index).textContent();
  }

  getRejectionContainer() {
    return this.rejectionContainer;
  }

  getRejectionInput(index = 0) {
    return this.rejectionInput.nth(index);
  }

  getRejectionSubmit(index = 0) {
    return this.rejectionSubmit.nth(index);
  }

  async clickRejectionSubmit(index = 0) {
    await this.rejectionSubmit.nth(index).click();
  }

  getDoneButton(index = 0) {
    return this.doneButton.nth(index);
  }

  getPendingButton(index = 0) {
    return this.pendingButton.nth(index);
  }

  getRejectedButton(index = 0) {
    return this.rejectedButton.nth(index);
  }

  async clickDoneButton(index) {
    await this.doneButton.nth(index).click();
  }

  async clickPendingButton(index) {
    await this.pendingButton.nth(index).click();
  }

  async clickRejectedButton(index) {
    await this.rejectedButton.nth(index).click();
  }

  async verifyAllStagesDisplayed() {
    const { expect } = await import("@playwright/test");
    const { expectSuccessMessage } = await import(
      "../assertions/common.js"
    );

    await expect(this.stages).toBeVisible();
    expect(await this.getStageCount()).toBe(SHIPPING_STAGES_LIST.length);

    for (let i = 0; i < SHIPPING_STAGES_LIST.length; i++) {
      expect(await this.getStageText(i)).toContain(SHIPPING_STAGES_LIST[i]);
      await expect(this.getDoneButton(i)).toBeVisible();
      await expect(this.getPendingButton(i)).toBeVisible();
      await expect(this.getRejectedButton(i)).toBeVisible();
    }
  }

  async verifyStageButtonsState(index, { done, pending, rejected }) {
    const { expect } = await import("@playwright/test");

    if (done) {
      await expect(this.getDoneButton(index)).toBeEnabled();
    } else {
      await expect(this.getDoneButton(index)).toBeDisabled();
    }

    if (pending) {
      await expect(this.getPendingButton(index)).toBeEnabled();
    } else {
      await expect(this.getPendingButton(index)).toBeDisabled();
    }

    if (rejected) {
      await expect(this.getRejectedButton(index)).toBeEnabled();
    } else {
      await expect(this.getRejectedButton(index)).toBeDisabled();
    }
  }

  async completeStage(index) {
    const { expect } = await import("@playwright/test");
    await this.clickDoneButton(index);
    await expect(this.getSuccessMessageLocator()).toContainText(
      MESSAGES.DONE_SUCCESS(index),
    );
  }

  async completeAllStagesSequentially() {
    for (let i = 0; i < SHIPPING_STAGES_LIST.length; i++) {
      await this.completeStage(i);
    }
  }

  async rejectStageWithCause(index, cause) {
    const { expect } = await import("@playwright/test");
    await this.clickRejectedButton(index);
    await expect(this.rejectionContainer.nth(index)).toBeVisible();
    await this.getRejectionInput(index).fill(cause);
    await this.clickRejectionSubmit(index);
    await expect(this.getSuccessMessageLocator()).toContainText(
      MESSAGES.REJECTION_SUCCESS(index),
    );
  }

  async changeRejectedStageToPending(index) {
    const { expect } = await import("@playwright/test");
    await this.getPendingButton(index).click();
    await expect(this.getSuccessMessageLocator()).toContainText(
      MESSAGES.PENDING_SUCCESS(index),
    );
  }

  async changeRejectedStageToDone(index) {
    await this.getDoneButton(index).click();
  }

  async verifyRejectionControlsHidden() {
    const { expect } = await import("@playwright/test");
    const count = await this.rejectionContainer.count();
    for (let i = 0; i < count; i++) {
      await expect(this.rejectionContainer.nth(i)).toBeHidden();
      await expect(this.getRejectionInput(i)).toBeHidden();
      await expect(this.getRejectionSubmit(i)).toBeHidden();
    }
  }

  async verifyRejectionControlsVisible(index) {
    const { expect } = await import("@playwright/test");
    await expect(this.rejectionContainer.nth(index)).toBeVisible();
    await expect(this.getRejectionInput(index)).toBeVisible();
    await expect(this.getRejectionSubmit(index)).toBeVisible();
  }

  async submitRejectionWithoutCause(index) {
    const { expect } = await import("@playwright/test");
    await this.clickRejectedButton(index);
    await expect(this.rejectionContainer.nth(index)).toBeVisible();
    await this.clickRejectionSubmit(index);
    await expect(this.rejectionContainer.nth(index)).toBeVisible();
  }
}
