import { test, expect } from "../conftest.js";
import { MESSAGES } from "../config/messages.js";
import { REJECTION_CAUSES } from "../config/testData.js";
import { expectSuccessMessage, expectErrorMessage } from "../assertions/common.js";

test.describe("Stage Page Tests", () => {
  test.beforeEach(async ({ formPage, dynamicCredentials }) => {
    await formPage.trackWithCredentials(
      dynamicCredentials.trackingId,
      dynamicCredentials.password,
    );
  });

  test("Verify that the stages are displayed correctly", async ({
    stagesPage,
  }) => {
    await test.step("Verify all stages and buttons are visible", async () => {
      await stagesPage.verifyAllStagesDisplayed();
    });
  });

  test.describe("Stage Initial Button States", () => {
    test("Verify Stage 1 buttons are enabled initially and pending button is disabled", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 1 button states", async () => {
        await stagesPage.verifyStageButtonsState(0, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify Stage 2 buttons are disabled initially", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 2 button states", async () => {
        await stagesPage.verifyStageButtonsState(1, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify Stage 3 buttons are disabled initially", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 3 button states", async () => {
        await stagesPage.verifyStageButtonsState(2, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify Stage 4 buttons are disabled initially", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 4 button states", async () => {
        await stagesPage.verifyStageButtonsState(3, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify Stage 5 buttons are disabled initially", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 5 button states", async () => {
        await stagesPage.verifyStageButtonsState(4, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify Stage 6 buttons are disabled initially", async ({
      stagesPage,
    }) => {
      await test.step("Check Stage 6 button states", async () => {
        await stagesPage.verifyStageButtonsState(5, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });
  });

  test.describe("Rejection Flow", () => {
    test("Verify rejection controls are hidden initially", async ({
      stagesPage,
    }) => {
      await test.step("Check rejection controls are hidden", async () => {
        await stagesPage.verifyRejectionControlsHidden();
      });
    });

    test("Verify rejection controls are visible when rejected button is clicked", async ({
      stagesPage,
    }) => {
      await test.step("Click reject and verify controls appear", async () => {
        await stagesPage.clickRejectedButton(0);
        await stagesPage.verifyRejectionControlsVisible(0);
      });
    });

    test("Verify stage cannot be rejected without entering a reason", async ({
      stagesPage,
      mainPage,
    }) => {
      await test.step("Submit rejection without cause", async () => {
        await stagesPage.submitRejectionWithoutCause(0);
      });

      await test.step("Verify rejection error message", async () => {
        await expectErrorMessage(mainPage, MESSAGES.REJECTION_ERROR);
      });
    });

    test("Verify stage can be rejected after entering a valid reason", async ({
      stagesPage,
    }) => {
      await test.step("Reject stage with valid cause", async () => {
        await stagesPage.rejectStageWithCause(0, REJECTION_CAUSES.CAUSE_1);
      });
    });

    test("Verify a rejected stage can be changed to Pending", async ({
      stagesPage,
    }) => {
      await test.step("Reject stage", async () => {
        await stagesPage.rejectStageWithCause(0, REJECTION_CAUSES.CAUSE_1);
      });

      await test.step("Change to pending", async () => {
        await stagesPage.changeRejectedStageToPending(0);
      });
    });

    test("Verify a rejected stage can be changed to Done", async ({
      stagesPage,
      mainPage,
    }) => {
      await test.step("Reject stage", async () => {
        await stagesPage.rejectStageWithCause(0, REJECTION_CAUSES.CAUSE_1);
      });

      await test.step("Change to pending", async () => {
        await stagesPage.changeRejectedStageToPending(0);
      });

      await test.step("Change to done", async () => {
        await stagesPage.changeRejectedStageToDone(0);
        await expectSuccessMessage(mainPage, MESSAGES.DONE_SUCCESS(0));
      });
    });
  });

  test.describe("Stage Progression", () => {
    test("Verify users cannot skip shipment stages", async ({ stagesPage }) => {
      await test.step("Verify Stage 3 is disabled", async () => {
        await stagesPage.verifyStageButtonsState(2, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify Stage 2 becomes available after Stage 1 is completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stage 1", async () => {
        await stagesPage.completeStage(0);
      });

      await test.step("Verify Stage 2 is now enabled", async () => {
        await stagesPage.verifyStageButtonsState(1, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify Stage 3 becomes available after Stage 2 is completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stages 1 and 2", async () => {
        await stagesPage.completeStage(0);
        await stagesPage.completeStage(1);
      });

      await test.step("Verify Stage 3 is now enabled", async () => {
        await stagesPage.verifyStageButtonsState(2, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify Stage 4 becomes available after Stage 3 is completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stages 1-3", async () => {
        await stagesPage.completeStage(0);
        await stagesPage.completeStage(1);
        await stagesPage.completeStage(2);
      });

      await test.step("Verify Stage 4 is now enabled", async () => {
        await stagesPage.verifyStageButtonsState(3, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify Stage 5 becomes available after Stage 4 is completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stages 1-4", async () => {
        await stagesPage.completeStage(0);
        await stagesPage.completeStage(1);
        await stagesPage.completeStage(2);
        await stagesPage.completeStage(3);
      });

      await test.step("Verify Stage 5 is now enabled", async () => {
        await stagesPage.verifyStageButtonsState(4, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify Stage 6 becomes available after Stage 5 is completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stages 1-5", async () => {
        for (let i = 0; i < 5; i++) {
          await stagesPage.completeStage(i);
        }
      });

      await test.step("Verify Stage 6 is now enabled", async () => {
        await stagesPage.verifyStageButtonsState(5, {
          done: true,
          pending: false,
          rejected: true,
        });
      });
    });

    test("Verify final shipment stage can be completed", async ({
      stagesPage,
    }) => {
      await test.step("Complete all 6 stages", async () => {
        await stagesPage.completeAllStagesSequentially();
      });
    });

    test("Verify a completed stage cannot be modified", async ({
      stagesPage,
    }) => {
      await test.step("Complete Stage 1", async () => {
        await stagesPage.completeStage(0);
      });

      await test.step("Verify Stage 1 is now disabled", async () => {
        await stagesPage.verifyStageButtonsState(0, {
          done: false,
          pending: false,
          rejected: false,
        });
      });
    });

    test("Verify all shipment stages can be completed sequentially", async ({
      stagesPage,
    }) => {
      await test.step("Complete all stages sequentially", async () => {
        await stagesPage.completeAllStagesSequentially();
      });
    });
  });
});
