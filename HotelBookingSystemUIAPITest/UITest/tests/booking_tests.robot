*** Settings ***
Documentation    Booking Management Tests
Resource         ../pages/Booking/booking_page.resource
Resource         ../pages/Cancel/cancel_page.resource
Resource         ../pages/ListBookings/list_bookings_page.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Cleanup Created Booking

*** Test Cases ***

TC-11 Create Valid Booking
    [Documentation]    Booking completes when all required fields are correct.
    [Tags]    booking    create    positive
    Create Test Booking And Verify All Fields
    Load Bookings For Hotel    ${booking_hotel_id}
    Verify List Bookings Contains Customer Name    ${booking_customer}

TC-12 Booking Blocked With Reversed Dates
    [Documentation]    Booking is blocked when check-out is before check-in.
    [Tags]    booking    create    negative
    Verify Booking Blocked With InvalidDateRange    ${reversed_check_in}    ${reversed_check_out}

TC-13 Booking Blocked With Missing Hotel ID
    [Documentation]    Booking is blocked when Hotel ID is blank.
    [Tags]    booking    create    negative
    Verify Booking Blocked With Blank Field    ${BOOKING_HOTEL_ID_INPUT}

TC-14 Booking Blocked With Missing Customer Name
    [Documentation]    Booking is blocked when Customer Name is blank.
    [Tags]    booking    create    negative
    Verify Booking Blocked With Blank Field    ${BOOKING_CUSTOMER_INPUT}

TC-15 Booking Blocked With Missing People
    [Documentation]    Booking is blocked when Number of People is blank.
    [Tags]    booking    create    negative
    Verify Booking With Blank Field    ${BOOKING_PEOPLE_INPUT}

TC-16 Booking Blocked With Missing Beds
    [Documentation]    Booking is blocked when Number of Beds is blank.
    [Tags]    booking    create    negative
    Verify Booking With Blank Field    ${BOOKING_BEDS_INPUT}

TC-17 Booking Blocked With Missing Twin Beds
    [Documentation]    Booking is blocked when Twin Beds is blank.
    [Tags]    booking    create    negative
    Verify Booking With Blank Field    ${BOOKING_TWIN_BEDS_INPUT}

TC-18 Booking Blocked With Missing Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is blank.
    [Tags]    booking    create    negative
    Verify Booking Blocked With Blank Field    ${BOOKING_CHECK_IN_INPUT}

TC-19 Booking Blocked With Missing Check-out Date
    [Documentation]    Booking is blocked when Check-out Date is blank.
    [Tags]    booking    create    negative
    Verify Booking Blocked With Blank Field    ${BOOKING_CHECK_OUT_INPUT}

TC-20 Booking Blocked With Past Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is in the past.
    [Tags]    booking    create    negative    bug
    Verify Booking Blocked With InvalidDateRange    ${past_check_in}    ${past_check_out}


TC-22 Booking Blocked With Invalid People Text
    [Documentation]    The People field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Verify Booking Blocked With InvalidText    ${BOOKING_PEOPLE_INPUT}    ${INVALID_PEOPLE_MSG}

TC-23 Booking Blocked With Invalid Beds Text
    [Documentation]    The Beds field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Verify Booking Blocked With InvalidText    ${BOOKING_BEDS_INPUT}    ${INVALID_BEDS_MSG}

TC-24 Booking Blocked With Invalid Twin Beds Text
    [Documentation]    The Twin Beds field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Verify Booking Blocked With InvalidText    ${BOOKING_TWIN_BEDS_INPUT}    ${INVALID_TWIN_BEDS_MSG}

TC-25 Booking Blocked With Non-Existent Hotel ID
    [Documentation]    Booking is blocked when Hotel ID does not exist.
    [Tags]    booking    create    negative
    Verify Booking Blocked With NonExistent Hotel    ${non_existent_hotel_id}

TC-26 Booking Blocked With Negative People
    [Documentation]    The People field should reject negative numbers.
    [Tags]    booking    create    negative    bug
    Verify Booking Blocked With Negative People

TC-27 Booking Blocked With Negative Beds
    [Documentation]    The Beds field should reject negative numbers.
    [Tags]    booking    create    negative    bug
    Verify Booking Blocked With Negative Beds

TC-28 Booking Blocked With Negative Twin Beds
    [Documentation]    The Twin Beds field should reject negative numbers.
    [Tags]    booking    create    negative    bug
    Verify Booking Blocked With Negative Twin Beds

TC-29 Booking Blocked With Same Check-in And Check-out Dates
    [Documentation]    Booking is blocked when check-in and check-out dates are the same.
    [Tags]    booking    create    negative
    Verify Booking Blocked With InvalidDateRange    ${same_date}    ${same_date}
