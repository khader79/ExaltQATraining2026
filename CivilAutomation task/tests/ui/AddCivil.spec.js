import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/GetCivil";
import { createUniqueCivilData } from "../../utils/civilData";
import { DeleteCivil } from "../../pages/deleteCivil";

test.describe("Civil System - addCivil", () => {
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
  test("Add Button Works", async () => {
    await civilSystem.clickAddCivilButton();
    await expect(await civilSystem.getFormModel()).toBeVisible();
  });
  test.describe("Add Civil Operations", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
    });
    test("Verify that a new civil record can be added successfully", async () => {
      const addCivilData = await createUniqueCivilData();
      await addCivil.addCivilData(addCivilData);
    });

    test.afterEach(async () => {
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
    });
  });
});
