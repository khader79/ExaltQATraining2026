import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";

test.describe("Civil System - Delete Operations", () => {
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

  test.describe("Executing Deletions", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
      await addCivil.addCivilData(addCivilData);
      await addCivil.closeModalIfOpen();
    });

    test("Delete button removes the civil record", async () => {
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
      await getCivil.getOneCivilData(addCivilData.civilId);
      await getCivil.expectedNotRowVisible(addCivilData.civilId);
    });

    test("Delete All CVs button shows a confirmation dialog", async () => {
      await deleteCivil.deleteAllCivils();
    });

    test.afterEach(async () => {
      if (!addCivilData || !addCivilData.civilId) {
        await addCivil.closeModalIfOpen();
        return;
      }
    });
  });
});
