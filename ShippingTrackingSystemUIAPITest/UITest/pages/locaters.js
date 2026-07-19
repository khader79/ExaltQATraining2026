export const CONTAINER_LOCATERS = {
  CONTAINER: ".container",
};

export const FORM_LOCATERS = {
  FORM: ".form",
  TRACKING_ID_INPUT: "#trackingId",
  PASSWORD_INPUT: "#password",
  SUBMIT_BUTTON: "button:has-text('Track')",
};

export const STAGES_LOCATERS = {
  STAGES: "#stages",
  STAGE: ".stage",

  DONE_BUTTON: ".done",
  PENDING_BUTTON: ".pending",
  REJECTED_BUTTON: ".rejected",

  REJECTION_CONTAINER: ".rejection-cause",
  REJECTION_INPUT: "input[id^='cause-']",
  REJECTION_SUBMIT: ".rejection-cause button",
};

export const MESSAGE_LOCATERS = {
  ERROR: ".message.error",
  SUCCESS: ".message.success",
};
