import pytest
from APITest.pages.trackPage import track_shipment
from APITest.config.testData import VALID_SHIPMENT_DATA, INVALID_SHIPMENT_DATA
from APITest.config.stages import SHIPMENT_STAGES
from APITest.assertions.common import (
    assert_track_success,
    assert_track_unauthorized,
    assert_track_bad_request,
)


@pytest.mark.usefixtures("setup_shipment")
class TestTrackShipment:
    def test_track_shipment_with_valid_data(self):
        response = track_shipment(VALID_SHIPMENT_DATA)
        assert_track_success(response, SHIPMENT_STAGES.values())

    def test_track_shipment_with_invalid_tracking_id(self):
        payload = {
            "password": VALID_SHIPMENT_DATA["password"],
            "trackingId": INVALID_SHIPMENT_DATA["trackingId"],
        }
        response = track_shipment(payload)
        assert_track_unauthorized(response)

    def test_track_shipment_with_invalid_password(self):
        payload = {
            "password": INVALID_SHIPMENT_DATA["password"],
            "trackingId": VALID_SHIPMENT_DATA["trackingId"],
        }
        response = track_shipment(payload)
        assert_track_unauthorized(response)

    def test_track_shipment_with_empty_tracking_id(self):
        payload = {
            "password": VALID_SHIPMENT_DATA["password"],
            "trackingId": INVALID_SHIPMENT_DATA["empty"],
        }
        response = track_shipment(payload)
        assert_track_unauthorized(response)

    def test_track_shipment_with_empty_password(self):
        payload = {
            "password": INVALID_SHIPMENT_DATA["empty"],
            "trackingId": VALID_SHIPMENT_DATA["trackingId"],
        }
        response = track_shipment(payload)
        assert_track_unauthorized(response)

    def test_track_shipment_with_missing_tracking_id(self):
        payload = {
            "password": VALID_SHIPMENT_DATA["password"],
        }
        response = track_shipment(payload)
        assert_track_bad_request(response)

    def test_track_shipment_with_missing_password(self):
        payload = {
            "trackingId": VALID_SHIPMENT_DATA["trackingId"],
        }
        response = track_shipment(payload)
        assert_track_bad_request(response)
