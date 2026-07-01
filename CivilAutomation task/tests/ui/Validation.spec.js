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
      try {
        await getCivil.expectedNotRowVisible("AB");
      } finally {
        await deleteCivil.deleteCivil("AB");
        addCivilData = null;
      }
    });

    test("Verify that the age field doesn't accept input less than zero", async () => {
      const invalidData = { ...addCivilData, age: "-1" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "age",
        "Value must be greater than or equal to 0.",
      );
    });

    test("Verify that the age field accept input with value zero", async () => {
      const validData = { ...addCivilData, age: "0" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input less than 120", async () => {
      const validData = { ...addCivilData, age: "119" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field doesn't accept input more than 120", async () => {
      const invalidData = { ...addCivilData, age: "121" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "age",
        "Value must be less than or equal to 120.",
      );
    });

    test("Verify that the phone number field doesn't accept the text input", async () => {
      const invalidData = { ...addCivilData, mobile: "ABasasdads" };
      await addCivil.addCivilData(invalidData);
      await getCivil.getOneCivilData(invalidData.civilId);
      try {
        await getCivil.expectedNotRowVisible(invalidData.civilId);
      } finally {
        await deleteCivil.deleteCivil(invalidData.civilId);
        addCivilData = null;
      }
    });

    test("Verify that the gender field except only female or male", async () => {
      await addCivil.addCivilData(addCivilData);
      await getCivil.getOneCivilData(addCivilData.civilId);
      await getCivil.expectedRowVisible(addCivilData.civilId);
      const rowElement = civilSystem.page
        .getByRole("table")
        .getByRole("row")
        .filter({
          has: civilSystem.page.getByRole("cell", {
            name: addCivilData.civilId,
            exact: true,
          }),
        });
      await expect(
        rowElement.getByRole("cell", {
          name: addCivilData.gender,
          exact: true,
        }),
      ).toBeVisible();
    });

    test("Verify that the Date of Birth field does not accept future dates", async () => {
      const invalidData = { ...addCivilData, dob: "2027-12-01" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "dob",
        "Value must be 12/31/2025 or earlier.",
      );
    });

    test("Verify that the Date of Birth field cannot be left empty", async () => {
      const invalidData = { ...addCivilData, dob: "" };
      await addCivil.addCivilData(invalidData);
      await getCivil.getOneCivilData(invalidData.civilId);
      try {
        await getCivil.expectedNotRowVisible(invalidData.civilId);
      } finally {
        await deleteCivil.deleteCivil(invalidData.civilId);
        addCivilData = null;
      }
    });

    test("Verify that the firstname field accepts valid text input", async () => {
      const validData = { ...addCivilData, firstName: "Waleed" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the lastname field accepts valid text input", async () => {
      const validData = { ...addCivilData, lastName: "Qanbar" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the ID field accepts only numeric input", async () => {
      const validData = { ...addCivilData, civilId: "12" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData("12");
      try {
        await getCivil.expectedRowVisible("12");
      } finally {
        await deleteCivil.deleteCivil("12");
        addCivilData = null;
      }
    });

    test("Verify that the age field accepts only numeric input", async () => {
      const validData = { ...addCivilData, age: "6" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input more than zero", async () => {
      const validData = { ...addCivilData, age: "1" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input with value 120", async () => {
      const validData = { ...addCivilData, age: "120" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the phone number field accepts only numeric input", async () => {
      const validData = { ...addCivilData, mobile: "0569974804" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the phone number field accepte unique value only", async () => {
      const uniqueMobile = "0569974504";
      const firstRecord = { ...addCivilData, mobile: uniqueMobile };
      await addCivil.addCivilData(firstRecord);
      const secondRecord = await createUniqueCivilData();
      secondRecord.mobile = uniqueMobile;
      await civilSystem.clickAddCivilButton();
      await addCivil.addCivilData(secondRecord);
      await getCivil.getOneCivilData(secondRecord.civilId);
      try {
        await getCivil.expectedNotRowVisible(secondRecord.civilId);
      } finally {
        await deleteCivil.deleteCivil(secondRecord.civilId);
        await getCivil.getOneCivilData(firstRecord.civilId);
        await deleteCivil.deleteCivil(firstRecord.civilId);
        addCivilData = null;
      }
    });

    test("Verify that the Date of Birth field accepts a valid date format", async () => {
      const validData = { ...addCivilData, dob: "1990-06-15" };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the Date of Birth field dosen't accepts a invalid date format", async () => {
      const invalidData = { ...addCivilData, dob: "1990-15-06" };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage("dob");
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
