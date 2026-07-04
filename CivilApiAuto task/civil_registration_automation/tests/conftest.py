import pytest # type: ignore
from civil_registration_automation.pages.add_civil_api import add_civil_record
from civil_registration_automation.pages.delete_civil_api import delete_civil_record
from civil_registration_automation.utils.id_generator import generate_unique_id
from civil_registration_automation.constants.constants import NORMAL_TEST_DATA


@pytest.fixture
def cleanup_box():
    box = {"id": None}
    try:
        yield box
    finally:
        if box["id"] is not None:
            print(f"\n[Teardown] Automatically deleting record ID: {box['id']}")
            delete_civil_record(box["id"])

@pytest.fixture
def created_record():
    record_id = generate_unique_id()
    data={
        "FirstName": NORMAL_TEST_DATA["FirstName"],
        "LastName": NORMAL_TEST_DATA["LastName"],
        "ID": record_id,
        "Age": NORMAL_TEST_DATA["Age"],
        "Mobile": NORMAL_TEST_DATA["Mobile"],
        "Gender": NORMAL_TEST_DATA["Gender"],
        "DOB": NORMAL_TEST_DATA["DOB"]
    }
    response = add_civil_record(data)
    assert response.ok, f"Create failed: {response.status_code} {response.text}"

    yield {"id": record_id, "data": data, "response": response.json()}

    delete_response = delete_civil_record(record_id)
    assert delete_response.ok, f"Cleanup failed: {delete_response.status_code} {delete_response.text}"
