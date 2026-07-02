import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";

test.describe("Civil System - Get / Read Operations", () => {
  let civilSystem;
  let addCivil;
  let getCivil;
  let deleteCivil;
  let addCivilData;

  test.beforeEach(async ({ page }) => {
    civilSystem = new CivilSystem(page);
    getCivil = new GetCivil(page);
    addCivil = new AddCivil(page);
    deleteCivil = new DeleteCivil(page);

    await civilSystem.openCivilSystem();
  });

  test.describe("Querying Records", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();

      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
      await addCivil.addCivilData(addCivilData);
    });

    test("Verify that all civil records are displayed automatically when the website opens", async () => {
      const tableData = await getCivil.getCivilData();
      expect(tableData.length).toBeGreaterThan(0);

      const totalText = await civilSystem.page
        .getByText(/Total Civils:/)
        .textContent();
      expect(totalText).not.toBeNull();
    });

    test("Verify that when search the user by id the whole information appears correctly", async () => {
      await getCivil.getOneCivilData(addCivilData.civilId);
      await getCivil.expectedRowVisible(addCivilData.civilId);
    });

    test("Verify that when search the user by name the whole information appears correctly", async () => {
      await getCivil.getOneCivilData(addCivilData.firstName);
      await getCivil.expectedRowVisible(addCivilData.firstName);
    });

    test("Refresh Button Works", async () => {
      await civilSystem.clickRefreshButton();
      const tableData = await getCivil.getCivilData();
      expect(tableData.length).toBeGreaterThan(0);
    });

    test.afterEach(async () => {
      if (!addCivilData || !addCivilData.civilId) {
        await addCivil.closeModalIfOpen();
        return;
      }
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
      addCivilData = null;
    });
  });
});
