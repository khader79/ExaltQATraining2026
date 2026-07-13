import requests
from APITest.config.constants import BASE_URL, ENDPOINTS


def track_shipment(payload: dict) -> requests.Response:
    url = f"{BASE_URL}{ENDPOINTS['track']}"
    response = requests.post(url, json=payload)
    return response
