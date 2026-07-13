import pytest
from APITest.pages.updatePage import update_shipment
from APITest.utils.payloadBuilder import create_update_payload
from APITest.config.testData import (
    INVALID_SHIPMENT_DATA,
    UPDATE_SHIPMENT_DATA,
)
from APITest.assertions.common import assert_update_success, assert_update_bad_request


class TestUpdateShipment:
    def test_update_stage_to_done(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_stage_to_pending(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["PENDING"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_stage_to_rejected_with_valid_cause(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["REJECTED"],
            cause=UPDATE_SHIPMENT_DATA["CAUSE"],
        )
        response = update_shipment(payload)
        assert_update_success(response)

    def test_update_fails_with_invalid_tracking_id(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=INVALID_SHIPMENT_DATA["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_empty_tracking_id(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=INVALID_SHIPMENT_DATA["empty"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_missing_tracking_id(self, setup_shipment):
        payload = {
            "cause": "",
            "stageIndex": UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            "status": UPDATE_SHIPMENT_DATA["DONE"],
        }
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_invalid_stage_index(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["INVALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_when_stage_index_is_missing(self, setup_shipment):
        payload = {
            "cause": "",
            "status": UPDATE_SHIPMENT_DATA["DONE"],
            "trackingId": setup_shipment["trackingId"],
        }
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_with_invalid_status(self, setup_shipment):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["INVALID_STATUS"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_when_status_is_missing(self, setup_shipment):
        payload = {
            "cause": "",
            "stageIndex": UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            "trackingId": setup_shipment["trackingId"],
        }
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_fails_rejected_stage_requires_rejection_reason(
        self, setup_shipment
    ):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["REJECTED"],
            cause="",
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_stage_2_cannot_be_updated_before_stage_1_completed(
        self, setup_shipment
    ):
        payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=1,
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(payload)
        assert_update_bad_request(response)

    def test_update_stage_2_can_be_updated_after_stage_1_completed(
        self, setup_shipment
    ):
        stage_1_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=0,
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        update_shipment(stage_1_payload)

        stage_2_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=1,
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(stage_2_payload)
        assert_update_success(response)

    def test_update_rejected_stage_to_pending(self, setup_shipment):
        reject_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["REJECTED"],
            cause=UPDATE_SHIPMENT_DATA["CAUSE"],
        )
        update_shipment(reject_payload)

        pending_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["PENDING"],
        )
        response = update_shipment(pending_payload)
        assert_update_success(response)

    def test_update_rejected_stage_to_done(self, setup_shipment):
        reject_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["REJECTED"],
            cause=UPDATE_SHIPMENT_DATA["CAUSE"],
        )
        update_shipment(reject_payload)

        done_payload = create_update_payload(
            tracking_id=setup_shipment["trackingId"],
            stage_index=UPDATE_SHIPMENT_DATA["VALID_STAGE_INDEX"],
            status=UPDATE_SHIPMENT_DATA["DONE"],
        )
        response = update_shipment(done_payload)
        assert_update_success(response)
