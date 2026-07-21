# Hotel Booking System - API Tests

Robot Framework API automation tests.

## Prerequisites

- Python 3.8+
- pip install -r requirements.txt
- Application running at configured BASE_URL

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| API_BASE_URL | http://localhost:3000 | API base URL |

## Run Tests

```bash
cd APITest
robot --outputdir reports tests/
robot --outputdir reports tests/search_tests.robot
```

## Project Structure

```
APITest/
├── base.resource          # Shared keywords and assertions
├── config/
│   └── env.resource       # URLs, status codes, endpoints
├── client/                # API call keywords per domain
│   ├── search/
│   ├── booking/
│   ├── cancel/
│   ├── listbookings/
│   └── review/
├── assertions/            # Verification keywords per domain
├── utils/                 # Python helpers
├── tests/                 # Test suites
└── reports/               # Generated output
```
