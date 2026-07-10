import { CONTAINER_LOCATERS, FORM_LOCATERS } from "../config/locaters.js";

export default class FormPage {
  constructor(page) {
    this.page = page;
    this.container = this.page.locator(CONTAINER_LOCATERS.CONTAINER);
    this.form = this.page.locator(FORM_LOCATERS.FORM);
    this.trackingIdInput = this.page.locator(FORM_LOCATERS.TRACKING_ID_INPUT);
    this.passwordInput = this.page.locator(FORM_LOCATERS.PASSWORD_INPUT);
    this.submitButton = this.page.locator(FORM_LOCATERS.SUBMIT_BUTTON);
  }

  async enterTrackingId(trackingId) {
    await this.trackingIdInput.fill(trackingId);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async isFormVisible() {
    return await this.form.isVisible();
  }

  async isContainerVisible() {
    return await this.container.isVisible();
  }

  async getTrackingIdValue() {
    return await this.trackingIdInput.inputValue();
  }

  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }

  async getSubmitButtonText() {
    return await this.submitButton.textContent();
  }
  async getContainerText() {
    return await this.container.textContent();
  }

  async fill_the_form(trackingId, password) {
    await this.enterTrackingId(trackingId);
    await this.enterPassword(password);
    await this.submitForm();
  }
}
