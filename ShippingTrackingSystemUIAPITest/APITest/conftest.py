import pytest

from APITest.utils.generate_tracking import get_next_tracking_data
from APITest.pages.trackPage import track_shipment
from APITest.config.statusCodes import STATUS_CODES


@pytest.fixture
def setup_shipment():
    shipment_data = get_next_tracking_data()
    response = track_shipment(shipment_data)
    assert response.status_code == STATUS_CODES["SUCCESS"]
    return shipment_data
