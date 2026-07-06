import { locaters } from '../config/all_locaters.js';
export class SignupPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locaters.signup.usernameInput);
    this.passwordInput = page.locator(locaters.signup.passwordInput);
    this.phoneInput = page.locator(locaters.signup.phoneInput);
    this.submitButton = page.locator(locaters.signup.submitButton);
  }
  async getUsernameInput() {
    return this.usernameInput;
  }
  async getPasswordInput() {
    return this.passwordInput;
  }
  async getPhoneInput() {
    return this.phoneInput;
  }
  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async enterPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  async signup(username, password, phone) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterPhone(phone);
    await this.clickSubmitButton();
  }
}
