*** Settings ***
Documentation    Booking Hotels API Tests
Resource         ../base.resource
Resource         ../client/booking/booking_keywords.resource
Resource         ../client/cancel/cancel_keywords.resource
Resource         ../assertions/booking_assertions.resource
Resource         ../assertions/cancel_assertions.resource
Resource         ../config/booking_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-10 Create Valid Booking
    [Documentation]    Verify POST /api/bookings with valid data creates a booking
    [Tags]    booking    positive

    ${response}=    Create Valid Booking
    Verify Successful Booking    ${response}
    ${cancel_response}=    Cancel Booking From Response    ${response}
    Verify Successful Cancel    ${cancel_response}

TC-11 Reject Booking With Missing Fields
    [Documentation]    Verify POST /api/bookings without customerName returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Missing Field    customerName
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-12 Reject Booking When No Rooms Available
    [Documentation]    Verify POST /api/bookings when no rooms available returns 409
    [Tags]    booking    negative

    Exhaust Room Availability
    ${check_in}=    Get Next Date By Days    60
    ${check_out}=    Get Next Date By Days    65
    ${response}=    Create Booking With Dates    ${check_in}    ${check_out}
    Verify Booking Conflict Response    ${response}

TC-13 Reject Booking With Invalid Date Range
    [Documentation]    Verify POST /api/bookings with check-out before check-in returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid Date Range
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-14 Reject Booking With Non Existent Hotel
    [Documentation]    Verify POST /api/bookings with non-existent hotel ID returns 404
    [Tags]    booking    negative

    ${response}=    Create Booking With Non Existent Hotel
    Verify Booking Error Response    ${response}    ${STATUS_NOT_FOUND}    Hotel not found

TC-15 Reject Booking With Zero People
    [Documentation]    Verify POST /api/bookings with 0 people returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Zero People
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid number of guests

TC-16 Reject Booking With Negative Beds
    [Documentation]    Verify POST /api/bookings with -1 beds returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Negative Beds
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid bed count

TC-17 Reject Booking With Past Check In Date
    [Documentation]    Verify POST /api/bookings with past check-in date returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Past Check In Date
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-18 Reject Booking With Invalid Date Format
    [Documentation]    Verify POST /api/bookings with invalid date format returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid Date Format
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-19 Reject Booking With Empty Customer Name
    [Documentation]    Verify POST /api/bookings with empty customerName returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Empty Customer Name
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-20 Reject Booking With Negative Twin Beds
    [Documentation]    Verify POST /api/bookings with -1 twinBeds returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Negative Twin Beds
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid twin bed count

TC-21 Reject Booking With Same Day Dates
    [Documentation]    Verify POST /api/bookings with same check-in and check-out returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Same Day Dates
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-22 Reject Booking With Check Out Before Check In
    [Documentation]    Verify POST /api/bookings with check-out before check-in returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid Date Range
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-23 Reject Booking With Empty Hotel ID
    [Documentation]    Verify POST /api/bookings with empty hotelId returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Empty Hotel ID
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-24 Reject Booking With Invalid People Type
    [Documentation]    Verify POST /api/bookings with people as string returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid People Type
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-25 Reject Booking With Invalid Beds Type
    [Documentation]    Verify POST /api/bookings with beds as string returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid Beds Type
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-26 Reject Booking With Invalid Twin Beds Type
    [Documentation]    Verify POST /api/bookings with twinBeds as string returns 400
    [Tags]    booking    negative

    ${response}=    Create Booking With Invalid Twin Beds Type
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-27 Reject Booking Overlapping Start Boundary
    [Documentation]    Verify POST /api/bookings that overlaps start of existing reservation returns 409
    [Tags]    booking    negative    overlap

    Create Booking With Dates    2026-08-01    2026-08-05
    ${response}=    Create Booking Overlapping Start Boundary
    Verify Booking Conflict Response    ${response}

TC-28 Reject Booking Overlapping End Boundary
    [Documentation]    Verify POST /api/bookings that overlaps end of existing reservation returns 409
    [Tags]    booking    negative    overlap

    Create Booking With Dates    2026-08-01    2026-08-05
    ${response}=    Create Booking Overlapping End Boundary
    Verify Booking Conflict Response    ${response}

TC-29 Reject Booking Completely Enclosing Existing
    [Documentation]    Verify POST /api/bookings that completely encloses existing reservation returns 409
    [Tags]    booking    negative    overlap

    Create Booking With Dates    2026-08-01    2026-08-05
    ${response}=    Create Booking Completely Enclosing Existing
    Verify Booking Conflict Response    ${response}

TC-30 Allow Booking Adjacent Check Out Before
    [Documentation]    Verify POST /api/bookings where checkOutDate touches next checkInDate succeeds
    [Tags]    booking    positive    adjacent

    Create Booking With Dates    2026-08-01    2026-08-05
    ${response}=    Create Booking Adjacent Check Out Before
    Verify Successful Booking    ${response}
    ${cancel_response}=    Cancel Booking From Response    ${response}
    Verify Successful Cancel    ${cancel_response}

TC-31 Allow Booking Adjacent Check In After
    [Documentation]    Verify POST /api/bookings where checkInDate touches previous checkOutDate succeeds
    [Tags]    booking    positive    adjacent

    Create Booking With Dates    2026-08-01    2026-08-05
    ${response}=    Create Booking Adjacent Check In After
    Verify Successful Booking    ${response}
    ${cancel_response}=    Cancel Booking From Response    ${response}
    Verify Successful Cancel    ${cancel_response}
