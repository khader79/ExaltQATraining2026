from APITesting.config.constants import SIGNUP_PAYLOAD, MESSAGES
from APITesting.pages.signUpPage import sign_up_user
from APITesting.utils.signup_payload import create_signup_payload


def test_sign_up_user():

    signup_payload = create_signup_payload()

    response = sign_up_user(payload=signup_payload)

    assert response.status_code == 201, (
        f"Expected status code 201, but got {response.status_code}"
    )


def test_sign_up_user_with_existing_username():

    signup_payload = create_signup_payload()

    response1 = sign_up_user(payload=signup_payload)

    assert response1.status_code == 201, (
        f"Expected status code 201, but got {response1.status_code}"
    )

    response2 = sign_up_user(payload=signup_payload)

    assert response2.status_code == 409, (
        f"Expected status code 409 for existing username, but got {response2.status_code}"
    )


def test_sign_up_user_with_existing_phone():

    payload1 = create_signup_payload()

    response1 = sign_up_user(payload=payload1)

    assert response1.status_code == 201


    payload2 = create_signup_payload(
        phone=payload1["phone"]
    )

    response2 = sign_up_user(payload=payload2)

    assert response2.status_code == 409


def test_sign_up_user_with_empty_username():

    payload = create_signup_payload(
        username=SIGNUP_PAYLOAD["empty"]
    )

    response = sign_up_user(payload=payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["username_empty"]
    assert response.status_code == 402

def test_sign_up_user_with_empty_password():
    payload = create_signup_payload(
        password=SIGNUP_PAYLOAD["empty"]
    )

    response = sign_up_user(payload=payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["password_empty"]
    assert response.status_code == 402

def test_sign_up_user_with_empty_phone():

    payload = create_signup_payload(
        phone=SIGNUP_PAYLOAD["empty"]
    )

    response = sign_up_user(payload=payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["phone_empty"]
    assert response.status_code == 402

def test_sign_up_user_with_whitespace():

    payload = create_signup_payload(
        username=SIGNUP_PAYLOAD["whitespace"],
        phone=SIGNUP_PAYLOAD["whitespace"],
        password=SIGNUP_PAYLOAD["whitespace"]
    )

    response = sign_up_user(payload=payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response.status_code == 400

def test_sign_up_user_with_invalid_phone():

    payload = create_signup_payload(
        phone=SIGNUP_PAYLOAD["invalid_phone"]
    )

    response = sign_up_user(payload=payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["invalid_phone"]
    assert response.status_code == 400

