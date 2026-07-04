from civil_registration_automation.constants.constants import NORMAL_TEST_DATA
from civil_registration_automation.pages.add_civil_api import add_civil_record
from civil_registration_automation.utils.id_generator import generate_unique_id

def test_add_civil_record(created_record):
    record = created_record["response"]  
    assert record["ID"] == created_record["id"]

def test_add_civil_record_with_empty_firstname(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["id"] = record_id
    data={
        "FirstName": "",
        "LastName": NORMAL_TEST_DATA["LastName"],
        "ID":record_id,
        "Age": NORMAL_TEST_DATA["Age"],
        "Mobile": NORMAL_TEST_DATA["Mobile"],
        "Gender": NORMAL_TEST_DATA["Gender"],
        "DOB": NORMAL_TEST_DATA["DOB"]
    }

    response = add_civil_record(data)
    assert response.status_code == 400, f"Expected status code 400 for empty FirstName, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_empty_lastname(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["id"] = record_id
    data={
        "FirstName": NORMAL_TEST_DATA["FirstName"],
        "LastName": "",
        "ID":record_id,
        "Age": NORMAL_TEST_DATA["Age"],
        "Mobile": NORMAL_TEST_DATA["Mobile"],
        "Gender": NORMAL_TEST_DATA["Gender"],
        "DOB": NORMAL_TEST_DATA["DOB"]
    }

    response = add_civil_record(data)
    assert response.status_code == 400, f"Expected status code 400 for empty LastName, but got {response.status_code}. Response: {response.text}"
