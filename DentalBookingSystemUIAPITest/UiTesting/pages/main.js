import { BASE_URL } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.message = page.locator(locaters.messages.message);
    this.logoutButton = page.locator(locaters.booking.logoutButton);
  }

  async navigateToWebsite() {
    await this.page.goto(BASE_URL);
  }

  async getMessage() {
    return this.message;
  }

  async getLogoutButton() {
    return this.logoutButton;
  }

  async getFieldValidationMessage(inputLocator) {
    return await inputLocator.evaluate((element) => element.validationMessage);
  }
}
