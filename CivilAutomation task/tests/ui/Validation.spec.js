import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";

test.describe("Civil System - Form Input Validation", () => {
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

  test.describe("Empty & Format Constraints", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
    });

    test("Verify that the firstname field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, firstName: "" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage("firstName");
    });

    test("Verify that the lastname field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, lastName: "" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage("lastName");
    });

    test("Verify that the ID field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, civilId: "" };
      await addCivil.addCivilData(invalidData);
      await addCivil.evaluateMessage("civilId");
    });

    test("Verify that the age field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, age: "" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage("age");
    });

    test("Verify that the phone number field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, mobile: "" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage("mobile");
    });

    test("Verify that the gender field does not accepts empty value", async () => {
      const invalidData = { ...addCivilData, gender: "" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "gender",
        "Please select an item in the list.",
      );
    });
    test("Verify that the ID field doesn't accept the text input", async () => {
      const invalidData = { ...addCivilData, civilId: "AB" };
      await addCivil.addCivilData(invalidData);
      await getCivil.getOneCivilData("AB");
      await getCivil.expectedNotRowVisible("AB");

      await getCivil.getOneCivilData("AB");
      await deleteCivil.deleteCivil("AB");
      addCivilData = null;
    });

    test.afterEach(async () => {
      if (!addCivilData || !addCivilData.civilId) {
        console.log("Cleanup skipped: No record ID created.");
        await addCivil.closeModalIfOpen();
        return;
      }

      console.log(
        "Cleanup: Deleting civil record with ID:",
        addCivilData.civilId,
      );
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
      addCivilData = null;
    });
  });
});
