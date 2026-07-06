export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator(locaters.login.usernameInput);
    this.passwordInput = page.locator(locaters.login.passwordInput);
    this.submitButton = page.locator(locaters.login.submitButton);
  }
}
