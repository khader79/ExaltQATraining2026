from civil_registration_automation.constants.constants import NORMAL_TEST_DATA, RESPONSE_FIELDS
from civil_registration_automation.utils.id_generator import generate_unique_id


def build_civil_record_data(**overrides):
    data = {
        RESPONSE_FIELDS["FIRST_NAME"]: NORMAL_TEST_DATA["FirstName"],
        RESPONSE_FIELDS["LAST_NAME"]: NORMAL_TEST_DATA["LastName"],
        RESPONSE_FIELDS["ID"]: generate_unique_id(),
        RESPONSE_FIELDS["AGE"]: NORMAL_TEST_DATA["Age"],
        RESPONSE_FIELDS["MOBILE"]: NORMAL_TEST_DATA["Mobile"],
        RESPONSE_FIELDS["GENDER"]: NORMAL_TEST_DATA["Gender"],
        RESPONSE_FIELDS["DOB"]: NORMAL_TEST_DATA["DOB"]
    }
    data.update(overrides)
    return data
