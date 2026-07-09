import pytest

from APITesting.pages.bookingPage import cancel_appointment
from APITesting.pages.loginPage import login_user
from APITesting.pages.signUpPage import sign_up_user
from APITesting.utils.signup_payload import create_signup_payload


@pytest.fixture()
def signup():

    payload = create_signup_payload()

    response = sign_up_user(payload=payload)

    assert response.status_code == 201

    return payload


@pytest.fixture()
def setup_booking(signup):

    username = signup["username"]
    password = signup["password"]

    response = login_user({
        "username": username,
        "password": password
    })

    response_json = response.json()

    assert response_json["success"] is True

    data = {
        "username": username,
        "booking_payload": []
    }

    yield data


    for booking_payload in data["booking_payload"]:

        cancel_response = cancel_appointment(
            booking_payload
        )

        print(
            f"Cancel Appointment Response: {cancel_response.status_code} - {cancel_response.text}"
        )

        assert cancel_response.status_code == 200