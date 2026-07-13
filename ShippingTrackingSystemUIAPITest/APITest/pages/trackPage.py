import requests

from APITest.config.urls import BASE_URL, ENDPOINTS


def track_shipment(payload: dict) -> requests.Response:
    url = f"{BASE_URL}{ENDPOINTS['TRACK']}"
    response = requests.post(url, json=payload)
    return response
