import { locaters } from '../config/all_locaters.js';
import { MainPage } from './main.js';
import { expect } from '@playwright/test';
import { BookingPage } from './booking.js';
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locaters.login.usernameInput);
    this.passwordInput = page.locator(locaters.login.passwordInput);
    this.submitButton = page.locator(locaters.login.submitButton);
    this.mainPage = new MainPage(page);
    this.bookingSection = new BookingPage(page);
  }

  async getUsernameInput() {
    return this.usernameInput;
  }

  async getPasswordInput() {
    return this.passwordInput;
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async login(username, password) {
    await this.usernameInput.clear();
    await this.enterUsername(username);
    await this.passwordInput.clear();
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }
}
