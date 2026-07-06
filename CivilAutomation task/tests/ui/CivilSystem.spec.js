import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/GetCivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";
import { UiValid } from "../../pages/UiValid";

test.describe("Civil System", () => {
  let civilSystem;
  let addCivil;
  let getCivil;
  let deleteCivil;
  let addCivilData;
  let uiValid;

  test.beforeEach(async ({ page }) => {
    civilSystem = new CivilSystem(page);
    getCivil = new GetCivil(page);
    addCivil = new AddCivil(page);
    deleteCivil = new DeleteCivil(page);
    uiValid = new UiValid(page);
    await civilSystem.openCivilSystem();
  });

  test.describe("UI validation", () => {
    test.only("Verify UI elements are visible", async () => {
      await uiValid.validateUi();
    });

    test("Chart is visible", async () => {
      await uiValid.validateGraph();
    });
  });
});
