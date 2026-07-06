import { test, expect } from "@playwright/test";
import { EditCivil } from "../../pages/EditCivil";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/Getcivil";
import { createUniqueCivilData } from "../../utils/civilData";
import { DeleteCivil } from "../../pages/deleteCivil";
import { CIVIL_VALIDATION } from "../../config/testData";

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
      const updatedData = { ...targetCivilData, firstName: CIVIL_VALIDATION.BOUNDARIES.UPDATED_FIRSTNAME };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that invalid data cannot be saved during editing (Empty FirstName)", async () => {
      const invalidEdit = { firstName: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("firstName");
    });

    test("Verify that invalid data cannot be saved during editing (Empty LastName)", async () => {
      const invalidEdit = { lastName: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("lastName");
    });

    test("Verify that invalid data cannot be saved during editing (Empty Age)", async () => {
      const invalidEdit = { age: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("age");
    });

    test("Verify that invalid data cannot be saved during editing (Empty Mobile)", async () => {
      const invalidEdit = { mobile: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage("mobile");
    });

    test("Verify that invalid data cannot be saved during editing (Empty Gender)", async () => {
      const invalidEdit = { gender: "" };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "gender",
        CIVIL_VALIDATION.ERRORS.GENDER_EMPTY,
      );
    });

    test("Verify that the age field doesn't accept input less than zero during editing", async () => {
      const invalidEdit = { age: CIVIL_VALIDATION.BOUNDARIES.INVALID_AGE_MIN };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "age",
        CIVIL_VALIDATION.ERRORS.AGE_MIN,
      );
    });

    test("Verify that the age field accept input with value zero during editing", async () => {
      const updatedData = { ...targetCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_ZERO };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the age field accept input less than 120 during editing", async () => {
      const updatedData = { ...targetCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_NEAR_MAX };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the age field doesn't accept input more than 120 during editing", async () => {
      const invalidEdit = { age: CIVIL_VALIDATION.BOUNDARIES.INVALID_AGE_MAX };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "age",
        CIVIL_VALIDATION.ERRORS.AGE_MAX,
      );
    });

    test("Verify that the phone number field doesn't accept the text input during editing", async () => {
      const invalidEdit = { mobile: CIVIL_VALIDATION.BOUNDARIES.INVALID_MOBILE_TEXT };
      await editCivil.editCivilDataPartial(invalidEdit);
    });

    test("Verify that invalid data cannot be saved during editing (Future Date of Birth)", async () => {
      const invalidEdit = { dob: CIVIL_VALIDATION.BOUNDARIES.INVALID_DOB_FUTURE };
      await editCivil.editCivilDataPartial(invalidEdit);

      await editCivil.evaluateMessage(
        "dob",
        CIVIL_VALIDATION.ERRORS.DOB_FUTURE,
      );
    });

    test("Verify that the Date of Birth field cannot be left empty during editing", async () => {
      const invalidEdit = { dob: "" };
      await editCivil.editCivilDataPartial(invalidEdit);
    });

    test("Verify that the firstname field accepts valid text input during editing", async () => {
      const updatedData = { ...targetCivilData, firstName: CIVIL_VALIDATION.BOUNDARIES.VALID_FIRSTNAME };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the lastname field accepts valid text input during editing", async () => {
      const updatedData = { ...targetCivilData, lastName: CIVIL_VALIDATION.BOUNDARIES.VALID_LASTNAME };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the age field accepts only numeric input during editing", async () => {
      const updatedData = { ...targetCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_SINGLE_DIGIT };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the age field accept input more than zero during editing", async () => {
      const updatedData = { ...targetCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_ONE };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the age field accept input with value 120 during editing", async () => {
      const updatedData = { ...targetCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_MAX };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the phone number field accepts only numeric input during editing", async () => {
      const updatedData = { ...targetCivilData, mobile: CIVIL_VALIDATION.BOUNDARIES.VALID_MOBILE_ALT };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the phone number field accept unique value only during editing", async () => {
      const uniqueMobile = CIVIL_VALIDATION.BOUNDARIES.UNIQUE_MOBILE_SEED;
      
      const setupRecord = await createUniqueCivilData();
      setupRecord.mobile = uniqueMobile;
      
      await editCivil.closeModalIfOpen();
      await civilSystem.clickAddCivilButton();
      await addCivil.addCivilData(setupRecord);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.clickEditButton(targetCivilData.civilId);
      
      const invalidEdit = { mobile: uniqueMobile };
      await editCivil.editCivilDataPartial(invalidEdit);
      await editCivil.closeModalIfOpen();

      await getCivil.getOneCivilData(setupRecord.civilId);
      await deleteCivil.deleteCivil(setupRecord.civilId);
    });

    test("Verify that the Date of Birth field accepts a valid date format during editing", async () => {
      const updatedData = { ...targetCivilData, dob: CIVIL_VALIDATION.BOUNDARIES.VALID_DOB };
      await editCivil.editCivilData(updatedData);

      await getCivil.getOneCivilData(targetCivilData.civilId);
      await editCivil.getCivilRowById(targetCivilData.civilId);
    });

    test("Verify that the Date of Birth field doesn't accept an invalid date format during editing", async () => {
      const invalidEdit = { dob: CIVIL_VALIDATION.BOUNDARIES.INVALID_DOB_FORMAT };
      await editCivil.editCivilDataPartial(invalidEdit);
    });

    test.afterEach(async () => {
      if (typeof editCivil.closeModalIfOpen === "function") {
        await editCivil.closeModalIfOpen();
      }
      if (targetCivilData && targetCivilData.civilId) {
        await getCivil.getOneCivilData(targetCivilData.civilId);
        await deleteCivil.deleteCivil(targetCivilData.civilId);
        targetCivilData = null;
      }
    });
  });
});