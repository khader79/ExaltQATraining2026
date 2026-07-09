from APITesting.config.constants import SIGNUP_PAYLOAD
from APITesting.utils.generate_Username_Phone import generate_username_phone


def create_signup_payload(username=None, phone=None, password=None):

    generated_username, generated_phone = generate_username_phone()

    return {
        "username": username if username is not None else generated_username,
        "password": password if password is not None else SIGNUP_PAYLOAD["password"],
        "phone": phone if phone is not None else generated_phone
    }