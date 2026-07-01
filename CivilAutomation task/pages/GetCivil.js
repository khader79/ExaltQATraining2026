import { expect } from "@playwright/test";

export class GetCivil {
  constructor(page) {
    this.page = page;
    this.tableShowData = page.locator("#tableBody");
    this.searchInput = page.locator("#searchInput");
    this.table = page.getByRole("table");
    this.rows = this.table.getByRole("row");
  }

  async getCivilData() {
    return await this.tableShowData.locator("tr").allTextContents();
  }

  getCivilRowById(civilId) {
    return this.rows.filter({
      has: this.page.getByRole("cell", { name: civilId, exact: true }),
    });
  }

  async getOneCivilData(nameOrId) {
    if (nameOrId == null) {
      return;
    }

    await this.searchInput.fill(String(nameOrId));
  }

  async expectedRowVisible(nameOrId) {
    const row = this.rows.filter({ hasText: nameOrId }).first();

    await expect(row).toBeVisible();

    const cell = row.getByRole("cell", {
      name: nameOrId,
      exact: true,
    });

    await expect(cell).toBeVisible();

    return cell;
  }

  async expectedNotRowVisible(nameOrId) {
    const row = this.rows
      .filter({
        has: this.page.getByRole("cell", {
          name: String(nameOrId),
          exact: true,
        }),
      })
      .first();
    await expect(row).not.toBeVisible();
  }
}
