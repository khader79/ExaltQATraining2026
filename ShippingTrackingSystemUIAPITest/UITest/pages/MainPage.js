import { BASE_URL } from "../config/constants.js";

import { Message_LOCATERS } from "../config/locaters.js";
export default class MainPage {
  constructor(page) {
    this.page = page;
    this.url = BASE_URL;
    this.successMessage = this.page.locator(
      Message_LOCATERS["message success"],
    );
    this.errorMessage = this.page.locator(Message_LOCATERS["message error"]);
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async isMessageVisible() {
    return await this.message.isVisible();
  }

  async getSuccessMessageText() {
    return await this.successMessage.textContent();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}
