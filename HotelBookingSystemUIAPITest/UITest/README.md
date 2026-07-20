# Hotel Booking System - UI Tests

Robot Framework UI automation tests for the Hotel Booking System web application.

## Prerequisites

- Python 3.8+
- Robot Framework (`pip install robotframework`)
- Robot Framework SeleniumLibrary (`pip install robotframework-seleniumlibrary`)
- Google Chrome browser
- ChromeDriver matching your Chrome version
- Application running at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the `UITest/` directory or set these before running:

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3000` | Application base URL |
| `BROWSER` | `chrome` | Browser to run tests in |

## Run Tests

Run all tests:

```bash
cd UITest
robot --outputdir reports tests/
```

Run search tests only:

```bash
robot --outputdir reports tests/search_tests.robot
```

Run booking tests only:

```bash
robot --outputdir reports tests/booking_tests.robot
```

Run tests by tag:

```bash
robot --include negative --outputdir reports tests/
robot --include bug --outputdir reports tests/
robot --include positive --outputdir reports tests/
```

Skip tests by tag:

```bash
robot --exclude skip --outputdir reports tests/
```

Run headed (visible browser):

```bash
robot --outputdir reports tests/
```

Run headless (no browser window):

```bash
robot --variable BROWSER:chrome --outputdir reports tests/
```

## Test Reports

After execution, reports are generated in the `reports/` directory:

- `report.html` - Test execution summary
- `log.html` - Detailed test execution log
- `output.xml` - Machine-readable results

Open in browser:

```bash
start reports/report.html
```

## Project Structure

```
UITest/
├── .env                              # Environment variables
├── config/
│   ├── env.resource                  # URL and browser config
│   ├── Constants.resource            # App-level constants
│   ├── timeouts.resource             # Timeout and sleep values
│   ├── messages.resource             # Expected messages
│   └── TestData.resource             # Test data
├── pages/
│   ├── base_page.resource            # Base page (open/close browser)
│   ├── Booking/
│   │   ├── booking_selectors.resource
│   │   └── booking_page.resource
│   ├── Cancel/
│   │   ├── cancel_selectors.resource
│   │   └── cancel_page.resource
│   └── Search/
│       ├── search_selectors.resource
│       └── search_page.resource
├── assertions/
│   ├── booking_assertions.resource
│   └── search_assertions.resource
├── tests/
│   ├── search_tests.robot            # TC-1 to TC-10
│   └── booking_tests.robot           # TC-11 to TC-25
└── utils/
    └── data_helper.py                # Price validation helper
```

## Test Cases

### Search Tests (TC-1 to TC-10)

| TC | Test | Type |
|----|------|------|
| TC-1 | Search Hotels By City | Positive |
| TC-2 | Filter By Min Rating | Positive |
| TC-3 | Filter By Max Price | Negative (Bug) |
| TC-4 | Filter By Amenity | Positive |
| TC-5 | Sort By Default | Positive |
| TC-6 | Sort By Price | Positive |
| TC-7 | Sort By Rating | Positive |
| TC-8 | Pagination Next | Positive |
| TC-9 | Search Non-Existent City | Negative |
| TC-10 | Search All Fields Blank | Positive |

### Booking Tests (TC-11 to TC-29)

| TC | Test | Type |
|----|------|------|
| TC-11 | Create Valid Booking | Positive |
| TC-12 | Reversed Dates | Negative |
| TC-13 | Missing Hotel ID | Negative |
| TC-14 | Missing Customer Name | Negative |
| TC-15 | Missing People | Negative |
| TC-16 | Missing Beds | Negative |
| TC-17 | Missing Twin Beds | Negative |
| TC-18 | Missing Check-in Date | Negative |
| TC-19 | Missing Check-out Date | Negative |
| TC-20 | Past Check-in Date | Negative (Bug) |
| TC-21 | No Rooms Available | Negative (Skipped) |
| TC-22 | Invalid People Text | Negative |
| TC-23 | Invalid Beds Text | Negative |
| TC-24 | Invalid Twin Beds Text | Negative |
| TC-25 | Non-Existent Hotel ID | Negative |
| TC-26 | Negative People (-2) | Negative (Bug) |
| TC-27 | Negative Beds (-5) | Negative (Bug) |
| TC-28 | Negative Twin Beds (-1) | Negative (Bug) |
| TC-29 | Same Check-in/Check-out Date | Negative |

## Known Bugs

4 bugs are automated and tagged with `bug`:

- **TC-20**: Booking succeeds with past check-in date
- **TC-26**: Booking succeeds with negative people count
- **TC-27**: Booking succeeds with negative beds count
- **TC-28**: Booking succeeds with negative twin beds count
