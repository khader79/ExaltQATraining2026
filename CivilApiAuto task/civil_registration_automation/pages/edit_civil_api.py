import requests
from civil_registration_automation.constants.constants import BASE_URL, ALL_ENDPOINTS, RESPONSE_FIELDS


def edit_civil_record(data: dict) -> requests.Response:
    url = BASE_URL + ALL_ENDPOINTS["update_record"]
    return requests.put(url, json=data)


def extract_record_from_response(response: requests.Response, record_id: str) -> dict:
    records = response.json()
    for record in records:
        if record.get(RESPONSE_FIELDS["ID"]) == record_id:
            return record
    return records[0] if records else {}
