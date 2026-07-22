# Hotel Booking System - API Tests

Robot Framework API automation tests.

## Setup

```bash
pip install -r requirements.txt
```

## Run

```bash
run                  # all tests
run search_tests     # single suite
```

## Structure

```
base.resource                shared keywords
config/                      test data + environment
├── env.resource             URLs, status codes
├── booking_test_data.resource
├── listbookings_test_data.resource
├── review_test_data.resource
└── search_test_data.resource
client/                      API calls
├── booking/
├── cancel/
├── listbookings/
├── review/
└── search/
assertions/                  verifications
├── booking_assertions.resource
├── cancel_assertions.resource
├── listbookings_assertions.resource
├── review_assertions.resource
└── search_assertions.resource
tests/                       test cases
├── booking_tests.robot
├── cancel_tests.robot
├── listbookings_tests.robot
├── review_tests.robot
└── search_tests.robot
```
