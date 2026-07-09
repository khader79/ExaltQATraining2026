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
    yield payload

@pytest.fixture()
def setup_booking(signup):
    booking_payload = {}
    username = signup["username"]
    password = signup["password"]
    response=login_user({"username": username, "password": password})
    response_json = response.json()
    assert response_json["success"] == True
    yield {"username": username,"booking_payload": booking_payload}

    cancel_appointment(booking_payload)