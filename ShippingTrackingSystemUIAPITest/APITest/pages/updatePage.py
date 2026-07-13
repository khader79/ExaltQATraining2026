import requests

from APITest.config.urls import BASE_URL, ENDPOINTS


def update_shipment(payload: dict) -> requests.Response:
    url = f"{BASE_URL}{ENDPOINTS['UPDATE']}"
    response = requests.post(url, json=payload)
    return response
