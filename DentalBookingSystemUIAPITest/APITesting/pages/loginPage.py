import requests
from APITesting.config.constants import BASE_URL, ENDPOINTS

def login_user(payload: dict):
    url = BASE_URL + ENDPOINTS['LOGIN']
    response = requests.post(url, json=payload)
    print(f"Login Response: {response.status_code} - {response.text}")
    return response