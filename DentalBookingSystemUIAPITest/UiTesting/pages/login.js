import { locaters } from '../config/all_locaters.js';
import { MainPage } from './main.js';
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locaters.login.usernameInput);
    this.passwordInput = page.locator(locaters.login.passwordInput);
    this.submitButton = page.locator(locaters.login.submitButton);
    this.mainPage = new MainPage(page);
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
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmitButton();
  }

  async CheckLoginSuccess(username, password) {
    await this.login(username, password);
    const messageLocator = await this.mainPage.getMessage();
    await messageLocator.waitFor({ state: 'visible' });
    await expect(messageLocator).toHaveText(
      locaters.messages.messagesText.successLoginMessageText
    );
  }

  async CheckLoginFailure(username, password) {
    await this.login(username, password);
    const messageText = await this.mainPage.getMessageText();
    expect(messageText).toBe(
      locaters.messages.messagesText.invalidLoginMessageText
    );
  }
}
