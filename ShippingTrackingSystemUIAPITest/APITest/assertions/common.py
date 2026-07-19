from APITest.config.statusCodes import STATUS_CODES


def assert_success_status(response, expected_status=STATUS_CODES["SUCCESS"]):
    assert (
        response.status_code == expected_status
    ), f"Expected status {expected_status}, got {response.status_code}"


def assert_response_success_true(response):
    data = response.json()
    assert data["success"] is True, f"Expected success=True, got {data['success']}"


def assert_response_success_false(response):
    data = response.json()
    assert data["success"] is False, f"Expected success=False, got {data['success']}"


def assert_valid_stages(response, expected_stages):
    data = response.json()
    for stage in data["stages"]:
        assert (
            stage["name"] in expected_stages
        ), f"Stage '{stage['name']}' not found in expected stages"


def assert_track_success(response, expected_stages):
    assert_success_status(response, STATUS_CODES["SUCCESS"])
    assert_response_success_true(response)
    assert_valid_stages(response, expected_stages)


def assert_track_unauthorized(response):
    assert_success_status(response, STATUS_CODES["UNAUTHORIZED"])
    assert_response_success_false(response)


def assert_track_bad_request(response):
    assert_success_status(response, STATUS_CODES["BAD_REQUEST"])
    assert_response_success_false(response)


def assert_update_success(response):
    assert_success_status(response, STATUS_CODES["SUCCESS"])


def assert_update_bad_request(response):
    assert_success_status(response, STATUS_CODES["BAD_REQUEST"])
