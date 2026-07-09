from APITesting.config.constants import MESSAGES ,LOGIN_PAYLOAD
from APITesting.pages.loginPage import login_user


def test_login_user(signup):
    username = signup["username"]
    password = signup["password"]
    login_payload = {
        "username": username,
        "password": password
    }
    response = login_user(login_payload)

    assert response.status_code == 200, (
        f"Expected status code 200, but got {response.status_code}")
    
def test_login_user_with_invalid_username(signup):
    login_payload = {
        "username": LOGIN_PAYLOAD["invalid_username"],
        "password": signup["password"]
    }
    response = login_user(login_payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["invalid_credentials"]
    assert response.status_code == 401, (
        f"Expected status code 401 for invalid credentials, but got {response.status_code}")
    
def test_login_user_with_invalid_password(signup):
    login_payload = {
        "username": signup["username"],
        "password": LOGIN_PAYLOAD["invalid_password"]
    }
    response = login_user(login_payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["invalid_credentials"]
    assert response.status_code == 401, (
        f"Expected status code 401 for invalid credentials, but got {response.status_code}")