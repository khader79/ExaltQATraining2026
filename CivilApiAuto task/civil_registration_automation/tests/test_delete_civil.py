from civil_registration_automation.constants.constants import INVALID_TEST_DATA, HTTP_STATUS, ERROR_MESSAGES
from civil_registration_automation.pages.add_civil_api import add_civil_record
from civil_registration_automation.pages.delete_civil_api import delete_civil_record
from civil_registration_automation.utils.id_generator import generate_unique_id
from civil_registration_automation.utils.civil_record_builder import build_civil_record_data


def test_delete_civil_record(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id)
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["CREATED"], f"Failed to create record for delete test: {response.status_code}. Response: {response.text}"

    delete_response = delete_civil_record(record_id)
    assert delete_response.status_code == HTTP_STATUS["NO_CONTENT"], f"Expected status code {HTTP_STATUS['NO_CONTENT']} for delete, but got {delete_response.status_code}. Response: {delete_response.text}"
    assert delete_response.text == "", f"Expected empty response body for delete, but got: {delete_response.text}"


def test_delete_civil_record_with_nonexistent_id():
    nonexistent_id = generate_unique_id()
    response = delete_civil_record(nonexistent_id)
    assert response.status_code == HTTP_STATUS["NOT_FOUND"], f"Expected status code {HTTP_STATUS['NOT_FOUND']} for deleting non-existent ID, but got {response.status_code}."
    assert ERROR_MESSAGES["NOT_FOUND"] in response.text, f"Expected 'Not Found' in response for non-existent ID, but got: {response.text}"
