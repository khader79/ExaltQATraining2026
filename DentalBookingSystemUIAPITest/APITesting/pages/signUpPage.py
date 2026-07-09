import requests
from APITesting.config.constants import SIGNUP_PAYLOAD, BASE_URL, ENDPOINTS 

def sign_up_user(payload:dict):
    url = BASE_URL + ENDPOINTS['SIGNUP']
    response = requests.post(url, json=payload)
    print(f"Sign Up Response: {response.status_code} - {response.text}")
    return response

    