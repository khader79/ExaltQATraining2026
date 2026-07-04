import requests
from civil_registration_automation.constants.constants import BASE_URL, ALL_ENDPOINTS


def delete_civil_record(record_id: str) -> requests.Response:
    url = BASE_URL + ALL_ENDPOINTS["delete_record"].format(id=record_id)
    return requests.delete(url)
