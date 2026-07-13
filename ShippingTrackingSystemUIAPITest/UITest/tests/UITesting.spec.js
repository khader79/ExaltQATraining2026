import { test, expect } from "../conftest.js";
import { expectButtonEnabled, expectButtonDisabled } from "../assertions/common.js";

test.describe("UI Testing", () => {
  test("Verify that the form is visible on the page", async ({ formPage }) => {
    await test.step("Check form visibility", async () => {
      expect(await formPage.isFormVisible()).toBe(true);
    });
  });

  test("Verify that the container is visible on the page", async ({
    formPage,
  }) => {
    await test.step("Check container visibility", async () => {
      expect(await formPage.isContainerVisible()).toBe(true);
    });
  });

  test("Make sure all fields and buttons in the form are visible.", async ({
    formPage,
  }) => {
    await test.step("Check tracking ID input visibility", async () => {
      await expectButtonEnabled(formPage.trackingIdInput);
    });

    await test.step("Check password input visibility", async () => {
      await expectButtonEnabled(formPage.passwordInput);
    });

    await test.step("Check submit button visibility", async () => {
      await expectButtonEnabled(formPage.submitButton);
    });
  });
});
