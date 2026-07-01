import { test, expect } from "@playwright/test";
import { EditCivil } from "../../pages/EditCivil";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { createUniqueCivilData } from "../../utils/civilData";
import { DeleteCivil } from "../../pages/deleteCivil";

test.describe("Civil System - Edit Operations", () => {
  let editCivil;
  let civilSystem;
  let addCivil;
  let getCivil;
  let deleteCivil;

  test.beforeEach(async ({ page }) => {
    civilSystem = new CivilSystem(page);
    getCivil = new GetCivil(page);
    addCivil = new AddCivil(page);
    editCivil = new EditCivil(page);
    deleteCivil = new DeleteCivil(page);
    await civilSystem.openCivilSystem();
  });
  test.describe("Edit Operations Constraints", () => {
    let targetCivilData;

    test.beforeEach(async () => {
      targetCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      await addCivil.addCivilData(targetCivilData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.clickEditButton(targetCivilData.civilId);

      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
    });

    test("Verify that an existing civil record can be edited successfully without changing the ID", async () => {
      const updatedData = { ...targetCivilData, firstName: "UpdatedName" };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      const rowElement = await editCivil.getCivilRowById(
        targetCivilData.civilId,
      );
      await expect(
        rowElement.getByRole("cell", { name: "UpdatedName", exact: true }),
      ).toBeVisible();
    });

    test("Verify that invalid data cannot be saved during editing (Empty FirstName)", async () => {
      const invalidEdit = { firstName: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("firstName");
      await editCivil.closeModalIfOpen();
    });

    test("Verify that invalid data cannot be saved during editing (Empty LastName)", async () => {
      const invalidEdit = { lastName: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("lastName");
      await editCivil.closeModalIfOpen();
    });

    test("Verify that invalid data cannot be saved during editing (Empty Age)", async () => {
      const invalidEdit = { age: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("age");
      await editCivil.closeModalIfOpen();
    });

    test("Verify that invalid data cannot be saved during editing (Empty Mobile)", async () => {
      const invalidEdit = { mobile: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("mobile");
      await editCivil.closeModalIfOpen();
    });

    test("Verify that invalid data cannot be saved during editing (Empty Gender)", async () => {
      const invalidEdit = { gender: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "gender",
        "Please select an item in the list.",
      );
      await editCivil.closeModalIfOpen();
    });

    test("Verify that invalid data cannot be saved during editing (Future Date of Birth)", async () => {
      const invalidEdit = { dob: "2027-12-01" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "dob",
        "Value must be 12/31/2025 or earlier.",
      );
      await editCivil.closeModalIfOpen();
    });

    test.afterEach(async () => {
      if (targetCivilData && targetCivilData.civilId) {
        await getCivil.getOneCivilData(targetCivilData.civilId);
        await deleteCivil.deleteCivil(targetCivilData.civilId);
        targetCivilData = null;
      }
    });
  });
});
