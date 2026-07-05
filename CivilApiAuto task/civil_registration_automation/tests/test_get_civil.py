import time

from civil_registration_automation.constants.constants import INVALID_TEST_DATA, HTTP_STATUS, RESPONSE_FIELDS
from civil_registration_automation.pages.get_civil_api import get_all_civil_records, get_civil_record_by_id, get_civil_record_by_invalid_get_endpoint
from civil_registration_automation.utils.id_generator import generate_unique_id
from civil_registration_automation.utils.record_validator import validate_civil_record
from civil_registration_automation.utils.civil_record_builder import build_civil_record_data
from civil_registration_automation.pages.add_civil_api import add_civil_record

def test_get_all_civil_record(created_record):
    response = get_all_civil_records()
    record_list = response.json()
    my_record = None

    assert response.status_code == HTTP_STATUS["OK"], f"Get all records failed: {response.status_code} {response.text}"

    for item in record_list:
        if str(item.get(RESPONSE_FIELDS["ID"])) == str(created_record['id']):
            my_record = item
            break

    assert my_record is not None, f"Expected to find created record with ID {created_record['id']} in the list, but it was missing!"
    validate_civil_record(my_record, created_record["data"])


def test_get_civil_record_by_id(created_record):
    time.sleep(1)
    record_id = created_record["id"]
    response = get_civil_record_by_id(record_id)

    assert response.status_code == HTTP_STATUS["OK"], f"Get record by ID failed: {response.status_code} {response.text}"

    record = response.json()
    validate_civil_record(record, created_record["data"])


def test_get_civil_record_by_invalid_get_endpoint():
    response = get_civil_record_by_invalid_get_endpoint()
    assert response.status_code == HTTP_STATUS["NOT_FOUND"], f"Expected {HTTP_STATUS['NOT_FOUND']} for invalid endpoint, but got {response.status_code}"


def test_get_civil_with_nonexistent_id(cleanup_box):
    time.sleep(1)
    nonexistent_id = generate_unique_id()
    cleanup_box["id"] = nonexistent_id 
    response = get_civil_record_by_id(nonexistent_id)
    assert response.status_code == HTTP_STATUS["NOT_FOUND"], f"Expected {HTTP_STATUS['NOT_FOUND']} for nonexistent ID, but got {response.status_code}"


def test_get_civil_with_invalid_id_format(created_record, cleanup_box):
    time.sleep(1)
    invalid_id = INVALID_TEST_DATA["invalid_id"]
    data = build_civil_record_data(ID=invalid_id)
    add_civil_record(data)
    cleanup_box["id"] = invalid_id
    response = get_civil_record_by_id(invalid_id)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected {HTTP_STATUS['BAD_REQUEST']} for invalid ID format, but got {response.status_code}"
