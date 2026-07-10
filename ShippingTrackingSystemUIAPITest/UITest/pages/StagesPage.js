import { STAGES_LOCATERS } from "../config/locaters.js";

export default class StagesPage {
  constructor(page) {
    this.page = page;
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

  async isStagesVisible() {
    return await this.stages.isVisible();
  }
  async getStages() {
    return await this.stages;
  }
  async getStageCount() {
    return await this.stage.count();
  }

  async getStageText(index) {
    return await this.stage.nth(index).textContent();
  }
  async clickDoneButton() {
    await this.doneButton.click();
  }
  async clickPendingButton() {
    await this.pendingButton.click();
  }
  async clickRejectedButton() {
    await this.rejectedButton.click();
  }
  async getDoneButton(index = 0) {
    return await this.doneButton.nth(index);
  }
  async getPendingButton(index = 0) {
    return await this.pendingButton.nth(index);
  }
  async getRejectedButton(index = 0) {
    return await this.rejectedButton.nth(index);
  }
}
