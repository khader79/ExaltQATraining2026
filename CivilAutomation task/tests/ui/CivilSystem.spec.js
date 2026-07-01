import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";

test.describe("Civil System", () => {
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

  test.describe("Delete Civil Record", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
      await addCivil.addCivilData(addCivilData);
    });

    test("Delete button removes the civil record", async () => {
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
    });

    test("Delete All CVs button shows a confirmation dialog", async () => {
      await deleteCivil.deleteAllCivils();
    });
  });

  test.describe("Civil Records Operations", () => {
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
      console.log("Deleting civil record with ID:", addCivilData.civilId);
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
    });
  });

  test.describe("Add Civil Record", () => {
    test.beforeEach(async () => {
      addCivilData = await createUniqueCivilData();
      await civilSystem.clickAddCivilButton();
      const formModel = await civilSystem.getFormModel();
      await expect(formModel).toBeVisible();
    });

    test("Add a Civil Record", async () => {
      console.log("Testing with addCivilData:", addCivilData);
      await addCivil.addCivilData(addCivilData);
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

    test.afterEach(async () => {
      if (!addCivilData) {
        return;
      }
      console.log("Deleting civil record with ID:", addCivilData.civilId);
      await getCivil.getOneCivilData(addCivilData.civilId);
      await deleteCivil.deleteCivil(addCivilData.civilId);
      addCivilData = null;
    });
  });

  test("Verify that the ID field doesn't accept the text input", async () => {
    addCivilData = await createUniqueCivilData();
    await civilSystem.clickAddCivilButton();
    const formModel = await civilSystem.getFormModel();
    await expect(formModel).toBeVisible();

    const invalidData = { ...addCivilData, civilId: "AB" };
    await addCivil.addCivilData(invalidData);
    await getCivil.getOneCivilData("AB");
    await getCivil.expectedNotRowVisible("AB");

    await getCivil.getOneCivilData("AB");
    await deleteCivil.deleteCivil("AB");
    addCivilData = null;
  });
});
