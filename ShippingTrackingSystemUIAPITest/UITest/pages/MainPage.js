import { MESSAGE_LOCATERS } from "./locaters.js";

export default class MainPage {
  constructor(page) {
    this.page = page;
    this.successMessage = this.page.locator(MESSAGE_LOCATERS.SUCCESS);
    this.errorMessage = this.page.locator(MESSAGE_LOCATERS.ERROR);
  }

  async navigate() {
    await this.page.goto("/");
  }

  getSuccessMessageLocator() {
    return this.successMessage;
  }

  getErrorMessageLocator() {
    return this.errorMessage;
  }

  async getSuccessMessageText() {
    return await this.successMessage.textContent();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  async verifySuccessMessage(expectedText) {
    const { expect } = await import("@playwright/test");
    await expect(this.successMessage).toContainText(expectedText);
  }

  async verifyErrorMessage(expectedText) {
    const { expect } = await import("@playwright/test");
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
