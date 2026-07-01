import { expect } from "@playwright/test";

export class DeleteCivil {
  constructor(page) {
    this.page = page;
    this.table = page.getByRole("table");
    this.rows = this.table.getByRole("row");
    this.modal = page.locator("#civilModal");
    this.deleteAllButton = page.getByRole("button", { name: "Delete All CVs" });
  }

  async closeModalIfOpen() {
    if (!(await this.modal.isVisible().catch(() => false))) {
      return;
    }

    await this.modal.locator(".btn-close").click({ force: true });
    await expect(this.modal).toBeHidden();
  }

  async deleteCivil(civilId) {
    const targetRow = this.rows.filter({
      has: this.page.getByRole("cell", { name: civilId, exact: true }),
    });

    if ((await targetRow.count()) === 0) {
      return;
    }

    const deleteButton = targetRow.locator("button", { hasText: "Delete" });

    if ((await deleteButton.count()) === 0) {
      return;
    }

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await deleteButton.click();

    await expect(targetRow).not.toBeVisible({ timeout: 5000 });
  }

  async deleteAllCivils() {
    await this.closeModalIfOpen();

    this.page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBeTruthy();
      await dialog.accept();
    });

    await this.deleteAllButton.click();

    const rowsCount = await this.rows.count();
    if (rowsCount > 0) {
      await expect(this.rows).toHaveCount(0, { timeout: 5000 });
    }
  }
}
