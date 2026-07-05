# Civil Registration System - API Automation

Automated API tests for the Civil Registration System using **Python + pytest + requests**.

## Prerequisites

- Python 3.11+
- The Civil Registration API server running at `http://localhost:3000`

## Setup

```bash
pip install pytest requests
```

## Running Tests

### Run all tests
```bash
pytest
```

### Run tests with verbose output
```bash
pytest -v
```

### Run specific test file
```bash
pytest tests/test_add_civil.py -v
```

### Run specific test
```bash
pytest tests/test_add_civil.py::test_add_civil_record -v
```

### Run tests with HTML report
```bash
pytest --html=report.html --self-contained-html
```

### Run tests headless (default - no browser)
All tests are API-level, so no browser is needed.

## Report

Test reports are generated in HTML format:
- `report.html` - Full test report with results

Open the HTML report in any browser to view results.

## Project Structure

```
civil_registration_automation/
├── constants/          # Test data and constants
│   └── constants.py
├── pages/              # API page objects (POM)
│   ├── add_civil_api.py
│   ├── get_civil_api.py
│   ├── edit_civil_api.py
│   └── delete_civil_api.py
├── tests/              # Test cases
│   ├── conftest.py     # Fixtures (cleanup_box, created_record)
│   ├── test_add_civil.py
│   ├── test_get_civil.py
│   ├── test_edit_civil.py
│   └── test_delete_civil.py
└── utils/              # Reusable utilities
    ├── civil_record_builder.py
    ├── id_generator.py
    ├── mobile_generator.py
    └── record_validator.py
```
