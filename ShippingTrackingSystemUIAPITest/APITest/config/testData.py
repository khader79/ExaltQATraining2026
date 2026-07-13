VALID_SHIPMENT_DATA = {
    "trackingId": "1",
    "password": "1",
}

INVALID_SHIPMENT_DATA = {
    "trackingId": "999",
    "password": "999",
    "empty": "",
}

UPDATE_SHIPMENT_DATA = {
    "DONE": "done",
    "PENDING": "pending",
    "REJECTED": "rejected",
    "CAUSE": "test",
    "INVALID_STATUS": "invalid_status",
    "VALID_STAGE_INDEX": 0,
    "INVALID_STAGE_INDEX": 99,
}
