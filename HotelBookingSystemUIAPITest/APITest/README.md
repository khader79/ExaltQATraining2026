# Hotel Booking System - API Tests

[![API Tests](https://github.com/user/repo/actions/workflows/api-tests.yml/badge.svg)](https://github.com/user/repo/actions/workflows/api-tests.yml)
[![Robot Framework](https://img.shields.io/badge/Robot%20Framework-7.x-blue)](https://robotframework.org/)
[![Python](https://img.shields.io/badge/Python-3.12+-green)](https://www.python.org/)

API test automation suite for the Hotel Booking System. Built with Robot Framework and the keyword-driven testing approach.

## Quick Start

```bash
pip install -r requirements.txt
run
```

## Run Options

```bash
run                          # all tests
run search_tests             # single suite
run booking_tests booking    # suite + tag filter
```

| Command | Description |
|---------|-------------|
| `run` | Execute all test suites |
| `run <suite>` | Execute a single suite |
| `run <suite> <tag>` | Execute suite filtered by tag |
| `run . <tag>` | Execute all suites filtered by tag |

### Available Tags

| Tag | Description |
|-----|-------------|
| `search` | Hotel search tests |
| `booking` | Booking creation tests |
| `cancel` | Booking cancellation tests |
| `listbookings` | Booking listing tests |
| `review` | Review CRUD tests |
| `positive` | Happy path scenarios |
| `negative` | Error handling scenarios |
| `bug` | Known API bugs |
| `overlap` | Date overlap conflict tests |
| `adjacent` | Adjacent date boundary tests |

## Project Structure

```
APITest/
├── base.resource                  shared keywords (session + verifications)
├── robot.yaml                     Robot Framework configuration
├── config/
│   ├── env.resource               URLs, status codes, endpoints
│   ├── booking_test_data.resource booking test data
│   ├── listbookings_test_data.resource
│   ├── review_test_data.resource
│   └── search_test_data.resource
├── client/
│   ├── booking/booking_keywords.resource
│   ├── cancel/cancel_keywords.resource
│   ├── listbookings/listbookings_keywords.resource
│   ├── review/review_keywords.resource
│   └── search/search_keywords.resource
├── assertions/
│   ├── booking_assertions.resource
│   ├── cancel_assertions.resource
│   ├── listbookings_assertions.resource
│   ├── review_assertions.resource
│   └── search_assertions.resource
└── tests/
    ├── booking_tests.robot
    ├── cancel_tests.robot
    ├── listbookings_tests.robot
    ├── review_tests.robot
    └── search_tests.robot
```

### Architecture Principles

- **One responsibility per file** — config holds data, client holds API calls, assertions hold verifications
- **Zero hardcoded values in tests** — every value lives in config files
- **Zero comments** — code is self-documenting through naming
- **Shared base keywords** — session management and common verifications in `base.resource`

## Test Summary

| Suite | Tests | Coverage |
|-------|-------|----------|
| Search | TC-1 to TC-9 | City, amenity, price, rating, pagination |
| Booking | TC-10 to TC-30 | CRUD, validation, overlap, adjacency |
| Cancel | TC-31 to TC-33 | Valid cancel, not found, already cancelled |
| List Bookings | TC-35 to TC-38 | By hotel ID, all bookings, by booking ID |
| Review | TC-39 to TC-56 | CRUD, validation, rating bounds |
| **Total** | **53** | |

## CI/CD

GitHub Actions pipeline runs on push, pull request, and weekday schedule. Reports are uploaded as artifacts with 30-day retention.

## Reports

After execution, open `reports/log.html` for detailed test execution logs.
