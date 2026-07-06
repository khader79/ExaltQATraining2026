import { BASE_URL } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.message = page.locator(locaters.messages.message);
  }

  async navigateToWebsite() {
    await this.page.goto(BASE_URL);
  }
  async getMessageText() {
    return await this.message.textContent();
  }
  async getMessage() {
    return await this.message;
  }

  async getFieldValidationMessage(inputLocator) {
    return await inputLocator.evaluate((element) => element.validationMessage);
  }
}
