export const BASE_URL = "http://localhost:3000";

export const VALID_TRACKING_Data = {
  TrackingId: "0",
  Password: "0",
};

export const INVALID_TRACKING_Data = {
  TrackingId: "12",
  Password: "12345678",
  empty: "",
};

export const MESSAGES = {
  LOAD_STAGES_SUCCESS: "Shipment stages loaded successfully!",
  ID_PASSWORD_ERROR: "Invalid Tracking ID or Password",
};

export const SHIPPING_STAGES = {
  STAGE_1: "Stage 1: Order Received",
  STAGE_2: "Stage 2: Order Shipped",
  STAGE_3: "Stage 3: Order Received to Destination Country",
  STAGE_4: "Stage 4: Order Clearance Completed",
  STAGE_5: "Stage 5: Order in Delivery Stage",
  STAGE_6: "Stage 6: Order Delivered",
};
