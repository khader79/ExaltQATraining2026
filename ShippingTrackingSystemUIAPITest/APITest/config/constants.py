BASE_URL = "http://localhost:3000"

ENDPOINTS = {
    "track": "/track",
    "update": "/update",
}

VALID_SHIPMENT_DATA = {"password": "1", "trackingId": "1"}
INVALID_SHIPMENT_DATA = {"password": "132", "trackingId": "132", "empty": ""}
SHIPMENT_STAGES = {
    "ORDER_RECEIVED": "Order Received",
    "ORDER_SHIPPED": "Order Shipped",
    "DESTINATION_RECEIVED": "Order Received to Destination Country",
    "CLEARANCE_COMPLETED": "Order Clearance Completed",
    "DELIVERY_STAGE": "Order in Delivery Stage",
    "DELIVERED": "Order Delivered",
}
