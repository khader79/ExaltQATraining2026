export const MESSAGES = {
  LOAD_STAGES_SUCCESS: "Shipment stages loaded successfully!",
  ID_PASSWORD_ERROR: "Invalid Tracking ID or Password",
  REJECTION_SUCCESS: (number) => `Stage ${number + 1} marked as rejected`,
  REJECTION_ERROR: "Please provide a reason for rejection",
  PENDING_SUCCESS: (number) => `Stage ${number + 1} marked as pending`,
  DONE_SUCCESS: (number) => `Stage ${number + 1} marked as done`,
};
