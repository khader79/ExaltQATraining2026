import { expect } from "@playwright/test";

export class AddCivil {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.civilIdInput = page.locator("#civilId");
    this.ageInput = page.locator("#age");
    this.mobileInput = page.locator("#mobile");
    this.genderSelect = page.locator("#gender");
    this.dobInput = page.locator("#dob");
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.modal = page.locator("#civilModal");
  }

  async closeModalIfOpen() {
    if (!(await this.modal.isVisible().catch(() => false))) {
      return;
    }

    await this.modal.locator(".btn-close").click({ force: true });
    await expect(this.modal).toBeHidden();
  }

  async addCivilData(civilData) {
    await this.firstNameInput.fill(civilData.firstName);
    await this.lastNameInput.fill(civilData.lastName);
    await this.civilIdInput.fill(civilData.civilId);
    await this.ageInput.fill(civilData.age);
    await this.mobileInput.fill(civilData.mobile);
    await this.dobInput.fill(civilData.dob);

    if (civilData.gender) {
      await this.genderSelect.selectOption({ label: civilData.gender });
    }

    await this.saveButton.click();
    await this.closeModalIfOpen();
  }

  async evaluateMessage(
    fieldName,
    expectedMessage = "Please fill out this field",
  ) {
    const field = this.page.locator(`#${fieldName}`);

    const isValid = await field.evaluate((el) => el.checkValidity());

    const validationMessage = await field.evaluate(
      (el) => el.validationMessage,
    );

    expect(isValid).toBe(false);
    expect(validationMessage).toContain(expectedMessage);
  }

  async addCivilDataPartial(civilData) {
    if (civilData.firstName !== undefined)
      await this.firstNameInput.fill(civilData.firstName);

    if (civilData.lastName !== undefined)
      await this.lastNameInput.fill(civilData.lastName);

    if (civilData.civilId !== undefined)
      await this.civilIdInput.fill(civilData.civilId);

    if (civilData.age !== undefined) await this.ageInput.fill(civilData.age);

    if (civilData.mobile !== undefined)
      await this.mobileInput.fill(civilData.mobile);
  }
}
