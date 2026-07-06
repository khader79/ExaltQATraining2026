import requests
from civil_registration_automation.constants.constants import ALL_ENDPOINTS, BASE_URL


def get_all_civil_records():
    url = BASE_URL + ALL_ENDPOINTS["get_all_records"]
    response = requests.get(url)
    return response

def get_civil_record_by_id(record_id):
    url = BASE_URL + ALL_ENDPOINTS["get_record_by_id"].format(id=record_id)
    response = requests.get(url)
    return response

def get_civil_record_by_invalid_get_endpoint():
    url = BASE_URL + ALL_ENDPOINTS["invalid_get_endpoint"]
    response = requests.get(url)
    return response