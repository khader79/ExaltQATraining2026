*** Settings ***
Documentation    Booking Management Tests
Resource         ../pages/Booking/booking_page.resource
Resource         ../pages/Cancel/cancel_page.resource
Resource         ../config/TestData.resource
Library          ../utils/api_helper.py
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Clear Booking Form

*** Keywords ***
Fill All Remaining Rooms
    ${filled}=    Fill All Rooms    ${booking_hotel_id}    ${booking_check_in}    ${booking_check_out}
    Log    Filled ${filled} additional rooms via API

Cancel All Test Bookings
    ${cancelled}=    Cancel All Bookings
    Log    Cancelled ${cancelled} bookings via API

Cleanup After TC21
    Cancel All Test Bookings
    Clear Element Text    ${CANCEL_BOOKING_ID_INPUT}
    Clear Booking Form

*** Test Cases ***

TC-11 Create Valid Booking
    [Documentation]    Booking completes when all required fields are correct.
    [Tags]    booking    create    positive
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Submit Booking
    Verify Booking Success
    Cancel Last Booking

TC-12 Booking Blocked With Reversed Dates
    [Documentation]    Booking is blocked when check-out is before check-in.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${reversed_check_in}    ${reversed_check_out}
    Submit Booking
    Verify Booking Error    ${BOOKING_INVALID_DATES}

TC-13 Booking Blocked With Missing Hotel ID
    [Documentation]    Booking is blocked when Hotel ID is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Hotel ID
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-14 Booking Blocked With Missing Customer Name
    [Documentation]    Booking is blocked when Customer Name is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Customer Name
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-15 Booking Blocked With Missing People
    [Documentation]    Booking is blocked when Number of People is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    People
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-16 Booking Blocked With Missing Beds
    [Documentation]    Booking is blocked when Number of Beds is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Beds
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-17 Booking Blocked With Missing Twin Beds
    [Documentation]    Booking is blocked when Twin Beds is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Twin Beds
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-18 Booking Blocked With Missing Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Check In Date
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-19 Booking Blocked With Missing Check-out Date
    [Documentation]    Booking is blocked when Check-out Date is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Check Out Date
    Submit Booking
    Verify Booking Error    ${BOOKING_MISSING_FIELDS}

TC-20 Booking Blocked With Past Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is in the past.
    [Tags]    booking    create    negative    bug
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${past_check_in}    ${past_check_out}
    Submit Booking
    Verify Booking Error    ${BOOKING_INVALID_DATES}

TC-21 Booking Blocked When No Rooms Available
    [Documentation]    Booking is blocked when no rooms are available for selected dates.
    [Tags]    booking    create    negative
    [Setup]    Fill All Remaining Rooms
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${conflict_check_in}    ${conflict_check_out}
    Submit Booking
    Verify Booking Error    ${BOOKING_NO_ROOMS}
    [Teardown]    Cleanup After TC21

TC-22 Booking Blocked With Invalid People Text
    [Documentation]    The People field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear People
    Input Text    ${BOOKING_PEOPLE_INPUT}    abc
    ${value}=    Get Element Attribute    ${BOOKING_PEOPLE_INPUT}    value
    Should Not Be Equal    ${value}    abc    msg=People field should not accept non-numeric text
    Submit Booking
