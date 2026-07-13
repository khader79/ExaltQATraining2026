import pytest
from APITest.pages.updatePage import update_shipment
from APITest.utils.payloadBuilder import create_update_payload
from APITest.config.testData import (
    VALID_SHIPMENT_DATA,
    INVALID_SHIPMENT_DATA,
    UPDATE_SHIPMENT_DATA,
)
from APITest.assertions.common import assert_update_success, assert_update_bad_request


@pytest.mark.usefixtures("setup_shipment")
class TestUpdateShipment:
    def test_update_stage_to_done(self):
        payload = create_update_payload(
            tracking_id=VALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_stage_to_pending(self):
        payload = create_update_payload(
            tracking_id=VALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["PENDING"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_stage_to_rejected_with_valid_cause(self):
        payload = create_update_payload(
            tracking_id=VALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["REJECTED"],
            cause=UPDATE_SHIPMENT_DATA["CAUSE"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_fails_with_invalid_tracking_id(self):
        payload = create_update_payload(
            tracking_id=INVALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_empty_tracking_id(self):
        payload = create_update_payload(
            tracking_id=INVALID_SHIPMENT_DATA["empty"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_missing_tracking_id(self):
        payload = {
            "cause": "",
            "stageIndex": UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            "status": UPDATE_SHIPMENT_DATA["DONE"],
        }
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_invalid_stage_index(self):
        payload = create_update_payload(
            tracking_id=VALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["INVALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)
