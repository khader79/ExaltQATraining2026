import { test, expect } from "@playwright/test";
import { CivilSystem } from "../../pages/CivilSystem";
import { AddCivil } from "../../pages/AddCivil";
import { GetCivil } from "../../pages/GetCivil";
import { DeleteCivil } from "../../pages/deleteCivil";
import { createUniqueCivilData } from "../../utils/civilData";
import { CIVIL_VALIDATION } from "../../config/testData";

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
        CIVIL_VALIDATION.ERRORS.GENDER_EMPTY,
      );
    });

    test("Verify that the ID field doesn't accept the text input", async () => {
      const invalidData = { ...addCivilData, civilId: CIVIL_VALIDATION.BOUNDARIES.INVALID_ID_TEXT };
      await addCivil.addCivilData(invalidData);
      await getCivil.getOneCivilData(CIVIL_VALIDATION.BOUNDARIES.INVALID_ID_TEXT);
      try {
        await getCivil.expectedNotRowVisible(CIVIL_VALIDATION.BOUNDARIES.INVALID_ID_TEXT);
      } finally {
        await deleteCivil.deleteCivil(CIVIL_VALIDATION.BOUNDARIES.INVALID_ID_TEXT);
        addCivilData = null;
      }
    });

    test("Verify that the age field doesn't accept input less than zero", async () => {
      const invalidData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.INVALID_AGE_MIN };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "age",
        CIVIL_VALIDATION.ERRORS.AGE_MIN,
      );
    });
    
    test("Verify that the age field accept input with value zero", async () => {
      const validData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_ZERO };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input less than 120", async () => {
      const validData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_NEAR_MAX };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field doesn't accept input more than 120", async () => {
      const invalidData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.INVALID_AGE_MAX };
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "age",
        CIVIL_VALIDATION.ERRORS.AGE_MAX,
      );
    });

    test("Verify that the phone number field doesn't accept the text input", async () => {
      const invalidData = { ...addCivilData, mobile: CIVIL_VALIDATION.BOUNDARIES.INVALID_MOBILE_TEXT };
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
      await addCivil.checkDataAppearsInTable(addCivilData.civilId, addCivilData.gender);
    });

    test("Verify that the Date of Birth field does not accept future dates", async () => {
      const invalidData = { ...addCivilData, dob: CIVIL_VALIDATION.BOUNDARIES.INVALID_DOB_FUTURE }; 
      await addCivil.addCivilDataPartial(invalidData);
      await addCivil.evaluateMessage(
        "dob",
        CIVIL_VALIDATION.ERRORS.DOB_FUTURE,
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
      const validData = { ...addCivilData, firstName: CIVIL_VALIDATION.BOUNDARIES.VALID_FIRSTNAME };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the lastname field accepts valid text input", async () => {
      const validData = { ...addCivilData, lastName: CIVIL_VALIDATION.BOUNDARIES.VALID_LASTNAME };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the ID field accepts only numeric input", async () => {
      const validData = { ...addCivilData, civilId: CIVIL_VALIDATION.BOUNDARIES.VALID_SHORT_ID };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(CIVIL_VALIDATION.BOUNDARIES.VALID_SHORT_ID);
      try {
        await getCivil.expectedRowVisible(CIVIL_VALIDATION.BOUNDARIES.VALID_SHORT_ID);
      } finally {
        await deleteCivil.deleteCivil(CIVIL_VALIDATION.BOUNDARIES.VALID_SHORT_ID);
        addCivilData = null;
      }
    });

    test("Verify that the age field accepts only numeric input", async () => {
      const validData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_SINGLE_DIGIT };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input more than zero", async () => {
      const validData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_ONE };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the age field accept input with value 120", async () => {
      const validData = { ...addCivilData, age: CIVIL_VALIDATION.BOUNDARIES.VALID_AGE_MAX };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the phone number field accepts only numeric input", async () => {
      const validData = { ...addCivilData, mobile: CIVIL_VALIDATION.BOUNDARIES.VALID_MOBILE_ALT };
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
    });

    test("Verify that the phone number field accepte unique value only", async () => {
      const uniqueMobile = CIVIL_VALIDATION.BOUNDARIES.UNIQUE_MOBILE_SEED;
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
      const validData = { ...addCivilData, dob: CIVIL_VALIDATION.BOUNDARIES.VALID_DOB }; 
      await addCivil.addCivilData(validData);
      await getCivil.getOneCivilData(validData.civilId);
      await getCivil.expectedRowVisible(validData.civilId);
      await addCivil.checkDataAppearsInTable(addCivilData.civilId, addCivilData.dob);
    });

    test("Verify that the Date of Birth field dosen't accepts a invalid date format", async () => {
      const invalidData = { ...addCivilData, dob: CIVIL_VALIDATION.BOUNDARIES.INVALID_DOB_FORMAT };
      await addCivil.addCivilDataPartial(invalidData);
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