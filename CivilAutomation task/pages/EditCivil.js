import { expect } from "@playwright/test";
import { CIVIL_VALIDATION } from "../config/testData";

export class EditCivil {
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
    this.table = page.getByRole("table");
    this.rows = this.table.getByRole("row");
  }

  async getCivilRowById(civilId) {
    return this.rows.filter({
      has: this.page.getByRole("cell", { name: civilId, exact: true }),
    });
  }

  async clickEditButton(civilId) {
    const row = await this.getCivilRowById(civilId);
    const EditButton = row.locator("button", { hasText: "Edit" });
    await EditButton.click();
  }

  async editCivilData(updatedData) {
    await this.firstNameInput.fill(updatedData.firstName);
    await this.lastNameInput.fill(updatedData.lastName);
    await this.civilIdInput.fill(updatedData.civilId);
    await this.ageInput.fill(updatedData.age);
    await this.mobileInput.fill(updatedData.mobile);

   if (updatedData.dob) {
      await this.dobInput.focus();
      await this.dobInput.pressSequentially(updatedData.dob);
    } 

    if (updatedData.gender) {
      await this.genderSelect.selectOption({ label: updatedData.gender });
    }

    await this.saveButton.click();
    await this.closeModalIfOpen();
  }

  async editCivilDataPartial(updatedData) {
    if (updatedData.firstName !== undefined) {
      await this.firstNameInput.clear();
      if (updatedData.firstName !== "") {
        await this.firstNameInput.fill(updatedData.firstName);
      }
    }

    if (updatedData.lastName !== undefined) {
      await this.lastNameInput.clear();
      if (updatedData.lastName !== "") {
        await this.lastNameInput.fill(updatedData.lastName);
      }
    }

    if (updatedData.civilId !== undefined) {
      await this.civilIdInput.clear();
      if (updatedData.civilId !== "") {
        await this.civilIdInput.fill(updatedData.civilId);
      }
    }

    if (updatedData.age !== undefined) {
      await this.ageInput.clear();
      if (updatedData.age !== "") {
        await this.ageInput.fill(updatedData.age);
      }
    }

    if (updatedData.mobile !== undefined) {
      await this.mobileInput.clear();
      if (updatedData.mobile !== "") {
        await this.mobileInput.fill(updatedData.mobile);
      }
    }

    if (updatedData.dob !== undefined) {
      await this.dobInput.focus();
      await this.dobInput.clear();
      if (updatedData.dob !== "") {
        await this.dobInput.pressSequentially(updatedData.dob);
      }
    }

    if (updatedData.gender !== undefined) {
      if (updatedData.gender === "") {
        await this.genderSelect.selectOption({ index: 0 });
      } else {
        await this.genderSelect.selectOption({ label: updatedData.gender });
      }
    }

    await this.saveButton.click();
  }

  async closeModalIfOpen() {
    if (!(await this.modal.isVisible().catch(() => false))) {
      return;
    }
    await this.modal.locator(".btn-close").click({ force: true });
    await expect(this.modal).toBeHidden();
  }

  async evaluateMessage(
    fieldName,
    expectedMessage = CIVIL_VALIDATION.ERRORS.FIELD_REQUIRED,
  ) {
    const field = this.page.locator(`#${fieldName}`);
    const isValid = await field.evaluate((el) => el.checkValidity());
    const validationMessage = await field.evaluate(
      (el) => el.validationMessage,
    );

    expect(isValid).toBe(false);
    expect(validationMessage).toContain(expectedMessage);
  }
}