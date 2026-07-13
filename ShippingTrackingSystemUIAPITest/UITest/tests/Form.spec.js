import { test, expect } from "../conftest.js";
import { MESSAGES } from "../config/messages.js";
import { SHIPPING_STAGES_LIST } from "../config/stages.js";
import {
  expectSuccessMessage,
  expectErrorMessage,
  expectStagesVisible,
  expectStagesHidden,
  expectStageCount,
} from "../assertions/common.js";

test.describe("Form Page Tests", () => {
  test("Verify successful tracking with valid Tracking ID and Password", async ({
    formPage,
    stagesPage,
    mainPage,
  }) => {
    await test.step("Fill form with valid credentials", async () => {
      await formPage.trackWithValidCredentials();
    });

    await test.step("Verify stages are displayed", async () => {
      await expectStagesVisible(stagesPage);
      await expectStageCount(stagesPage, SHIPPING_STAGES_LIST.length);
    });

    await test.step("Verify success message", async () => {
      await expectSuccessMessage(mainPage, MESSAGES.LOAD_STAGES_SUCCESS);
    });

    await test.step("Verify all stage labels", async () => {
      for (let i = 0; i < SHIPPING_STAGES_LIST.length; i++) {
        expect(await stagesPage.getStageText(i)).toContain(
          SHIPPING_STAGES_LIST[i],
        );
      }
    });
  });

  test("Confirm that the tracking process failed when an invalid ID number was entered.", async ({
    formPage,
    stagesPage,
    mainPage,
  }) => {
    await test.step("Fill form with invalid tracking ID", async () => {
      await formPage.trackWithInvalidId();
    });

    await test.step("Verify stages are not displayed", async () => {
      await expectStagesHidden(stagesPage);
    });

    await test.step("Verify error message", async () => {
      await expectErrorMessage(mainPage, MESSAGES.ID_PASSWORD_ERROR);
    });
  });

  test("Confirm that the tracking process failed when an invalid Password was entered.", async ({
    formPage,
    stagesPage,
    mainPage,
  }) => {
    await test.step("Fill form with invalid password", async () => {
      await formPage.trackWithInvalidPassword();
    });

    await test.step("Verify stages are not displayed", async () => {
      await expectStagesHidden(stagesPage);
    });

    await test.step("Verify error message", async () => {
      await expectErrorMessage(mainPage, MESSAGES.ID_PASSWORD_ERROR);
    });
  });

  test("Confirm that the tracking process failed when an empty ID number was entered.", async ({
    formPage,
    stagesPage,
    mainPage,
  }) => {
    await test.step("Fill form with empty tracking ID", async () => {
      await formPage.trackWithEmptyId();
    });

    await test.step("Verify stages are not displayed", async () => {
      await expectStagesHidden(stagesPage);
    });

    await test.step("Verify error message", async () => {
      await expectErrorMessage(mainPage, MESSAGES.ID_PASSWORD_ERROR);
    });
  });

  test("Confirm that the tracking process failed when an empty Password was entered.", async ({
    formPage,
    stagesPage,
    mainPage,
  }) => {
    await test.step("Fill form with empty password", async () => {
      await formPage.trackWithEmptyPassword();
    });

    await test.step("Verify stages are not displayed", async () => {
      await expectStagesHidden(stagesPage);
    });

    await test.step("Verify error message", async () => {
      await expectErrorMessage(mainPage, MESSAGES.ID_PASSWORD_ERROR);
    });
  });
});
