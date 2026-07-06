from datetime import time

import pytest # type: ignore
from civil_registration_automation.pages.add_civil_api import add_civil_record
from civil_registration_automation.pages.delete_civil_api import delete_civil_record
from civil_registration_automation.utils.id_generator import generate_unique_id
from civil_registration_automation.utils.civil_record_builder import build_civil_record_data


@pytest.fixture
def cleanup_box():
    box = {"ids": []}
    try:
        yield box
    finally:
        for rid in box["ids"]:
            print(f"\n[Teardown] Automatically deleting record ID: {rid}")
            delete_civil_record(rid)


@pytest.fixture
def created_record():
    record_id = generate_unique_id()
    data = build_civil_record_data(ID=record_id)
    response = add_civil_record(data)
    assert response.ok, f"Create failed: {response.status_code} {response.text}"

    yield {"id": record_id, "data": data, "response": response.json()}

    delete_response = delete_civil_record(record_id)
    assert delete_response.ok, f"Cleanup failed: {delete_response.status_code} {delete_response.text}"
