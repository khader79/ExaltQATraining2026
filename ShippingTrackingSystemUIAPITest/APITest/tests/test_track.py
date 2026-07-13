from APITest.pages.trackPage import track_shipment
from APITest.config.constants import (
    VALID_SHIPMENT_DATA,
    SHIPMENT_STAGES,
    INVALID_SHIPMENT_DATA,
)


def test_track_shipment_with_valid_data():
    payload = VALID_SHIPMENT_DATA
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 200
    assert response_json["success"] is True
    for stage in response_json["stages"]:
        assert stage["name"] in SHIPMENT_STAGES.values()


def test_track_shipment_with_invalid_tracking_id():
    payload = {
        "password": VALID_SHIPMENT_DATA["password"],
        "trackingId": INVALID_SHIPMENT_DATA["trackingId"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 401
    assert response_json["success"] is False


def test_track_shipment_with_invalid_password():
    payload = {
        "password": INVALID_SHIPMENT_DATA["password"],
        "trackingId": VALID_SHIPMENT_DATA["trackingId"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 401
    assert response_json["success"] is False


def test_track_shipment_with_empty_tracking_id():
    payload = {
        "password": VALID_SHIPMENT_DATA["password"],
        "trackingId": INVALID_SHIPMENT_DATA["empty"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 401
    assert response_json["success"] is False


def test_track_shipment_with_empty_password():
    payload = {
        "password": INVALID_SHIPMENT_DATA["empty"],
        "trackingId": VALID_SHIPMENT_DATA["trackingId"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 401
    assert response_json["success"] is False


def test_track_shipment_with_missing_tracking_id():
    payload = {
        "password": VALID_SHIPMENT_DATA["password"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 400
    assert response_json["success"] is False


def test_track_shipment_with_missing_password():
    payload = {
        "trackingId": VALID_SHIPMENT_DATA["trackingId"],
    }
    response = track_shipment(payload)
    response_json = response.json()
    assert response.status_code == 400
    assert response_json["success"] is False
