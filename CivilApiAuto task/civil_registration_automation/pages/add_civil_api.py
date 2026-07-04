import requests
from civil_registration_automation.constants.constants import BASE_URL, ALL_ENDPOINTS


def add_civil_record(data: dict) -> requests.Response:
    url = BASE_URL + ALL_ENDPOINTS["create_record"]
    return requests.post(url, json=data)
