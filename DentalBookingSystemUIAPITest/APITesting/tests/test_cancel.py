from APITesting.config.constants import CANCEL_PAYLOAD
from APITesting.pages.bookingPage import cancel_appointment
from APITesting.utils.cancel_payload import create_cancel_payload


def test_cancel_appointment(setup_cancel):
    username = setup_cancel["username"]
    booking = setup_cancel["booking_payload"]

    cancel_payload = create_cancel_payload(
        booking["date"],
        booking["startTime"],
        booking["endTime"],
        username
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == True
    assert response.status_code == 200, (
        f"Expected status code 200, but got {response.status_code}"
    )


def test_cancel_appointment_with_empty_date(setup_cancel):
    username = setup_cancel["username"]
    booking = setup_cancel["booking_payload"]

    cancel_payload = create_cancel_payload(
        CANCEL_PAYLOAD["empty"],
        booking["startTime"],
        booking["endTime"],
        username
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response.status_code == 400, (
        f"Expected status code 400 for empty date, but got {response.status_code}"
    )


def test_cancel_appointment_with_empty_startTime(setup_cancel):
    username = setup_cancel["username"]
    booking = setup_cancel["booking_payload"]

    cancel_payload = create_cancel_payload(
        booking["date"],
        CANCEL_PAYLOAD["empty"],
        booking["endTime"],
        username
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response.status_code == 400, (
        f"Expected status code 400 for empty startTime, but got {response.status_code}"
    )


def test_cancel_appointment_with_empty_endTime(setup_cancel):
    username = setup_cancel["username"]
    booking = setup_cancel["booking_payload"]

    cancel_payload = create_cancel_payload(
        booking["date"],
        booking["startTime"],
        CANCEL_PAYLOAD["empty"],
        username
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response.status_code == 400, (
        f"Expected status code 400 for empty endTime, but got {response.status_code}"
    )


def test_cancel_appointment_with_empty_username(setup_cancel):
    booking = setup_cancel["booking_payload"]

    cancel_payload = create_cancel_payload(
        booking["date"],
        booking["startTime"],
        booking["endTime"],
        ""
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response.status_code == 400, (
        f"Expected status code 400 for empty username, but got {response.status_code}"
    )


def test_cancel_appointment_not_exist(setup_cancel):
    username = setup_cancel["username"]

    cancel_payload = create_cancel_payload(
        CANCEL_PAYLOAD["nonExistentDate"],
        CANCEL_PAYLOAD["startTime"],
        CANCEL_PAYLOAD["endTime"],
        username
    )

    response = cancel_appointment(cancel_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response.status_code == 404, (
        f"Expected status code 404 for non-existent appointment, but got {response.status_code}"
    )