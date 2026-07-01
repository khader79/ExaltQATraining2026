import { BASE_URL } from "../config/testData";

export class CivilSystem {
  constructor(page) {
    this.page = page;
    this.addCivilButton = page.getByRole("button", { name: "Add Civil" });
    this.refreshButton = page.getByRole("button", { name: "Refresh Table" });
    this.deleteAllButton = page.getByRole("button", {
      name: "Delete All CVs",
    });
    this.addCivilForm = page.locator("#civilModal");
    this.tableShowData = page.locator("#tableBody");
  }

  async openCivilSystem() {
    await this.page.goto(BASE_URL);
  }

  async getFormModel() {
    return this.addCivilForm;
  }

  async clickAddCivilButton() {
    await this.addCivilButton.click();
  }

  async clickRefreshButton() {
    await this.refreshButton.click();
  }

  async clickDeleteAllButton() {
    await this.deleteAllButton.click();
  }

  async dialogAccept() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
  }
}
