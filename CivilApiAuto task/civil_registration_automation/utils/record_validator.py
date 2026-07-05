from civil_registration_automation.constants.constants import RESPONSE_FIELDS


def validate_civil_record(record, expected):
    assert record.get(RESPONSE_FIELDS["ID"]) == expected["ID"]
    assert record.get(RESPONSE_FIELDS["FIRST_NAME"]) == expected["FirstName"]
    assert record.get(RESPONSE_FIELDS["LAST_NAME"]) == expected["LastName"]
    assert record.get(RESPONSE_FIELDS["AGE"]) == expected["Age"]
    assert record.get(RESPONSE_FIELDS["MOBILE"]) == expected["Mobile"]

    assert RESPONSE_FIELDS["GENDER"] in record, "🚨 BUG: Gender key is completely missing from the API response body!"
    assert record.get(RESPONSE_FIELDS["GENDER"]) == expected["Gender"], \
        f"Expected Gender {expected['Gender']}, but got {record.get(RESPONSE_FIELDS['GENDER'])}"

    assert RESPONSE_FIELDS["DOB"] in record, "🚨 BUG: DOB key is completely missing from the API response body!"
    assert record.get(RESPONSE_FIELDS["DOB"]) == expected["DOB"], \
        f"Expected DOB {expected['DOB']}, but got {record.get(RESPONSE_FIELDS['DOB'])}"
