*** Settings ***
Documentation    Booking Management Tests
Resource         ../pages/Booking/booking_page.resource
Resource         ../pages/Cancel/cancel_page.resource
Resource         ../pages/ListBookings/list_bookings_page.resource
Resource         ../config/TestData.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Clear Booking Form

*** Test Cases ***

TC-11 Create Valid Booking
    [Documentation]    Booking completes when all required fields are correct.
    [Tags]    booking    create    positive
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Submit Booking
    Verify Booking Created Successfully
    Cancel Last Booking

TC-12 Booking Blocked With Reversed Dates
    [Documentation]    Booking is blocked when check-out is before check-in.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${reversed_check_in}    ${reversed_check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_INVALID_DATES}

TC-13 Booking Blocked With Missing Hotel ID
    [Documentation]    Booking is blocked when Hotel ID is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Hotel ID
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-14 Booking Blocked With Missing Customer Name
    [Documentation]    Booking is blocked when Customer Name is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Customer Name
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-15 Booking Blocked With Missing People
    [Documentation]    Booking is blocked when Number of People is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    People
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-16 Booking Blocked With Missing Beds
    [Documentation]    Booking is blocked when Number of Beds is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Beds
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-17 Booking Blocked With Missing Twin Beds
    [Documentation]    Booking is blocked when Twin Beds is blank.
    [Tags]    booking    create    negative    bug
    Fill All Booking Fields Except    Twin Beds
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-18 Booking Blocked With Missing Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Check In Date
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-19 Booking Blocked With Missing Check-out Date
    [Documentation]    Booking is blocked when Check-out Date is blank.
    [Tags]    booking    create    negative
    Fill All Booking Fields Except    Check Out Date
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

TC-20 Booking Blocked With Past Check-in Date
    [Documentation]    Booking is blocked when Check-in Date is in the past.
    [Tags]    booking    create    negative    bug
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${past_check_in}    ${past_check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_INVALID_DATES}

<<<<<<< HEAD
=======
TC-21 Booking Blocked When No Rooms Available
    [Documentation]    Booking is blocked when no rooms are available for selected dates.
    [Tags]    booking    create    negative
    [Setup]    Setup No Rooms Available
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${conflict_check_in}    ${conflict_check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_NO_ROOMS}
    [Teardown]    Cleanup After Conflict Test
>>>>>>> 4ab7276669d5a4171e9fc7a1aca3aabbab26381c

TC-22 Booking Allowed Preceding Fully Booked Period
    [Documentation]    Booking is available for dates immediately preceding the fully booked period.
    [Tags]    booking    create    date_conflict    positive
    [Setup]    Setup Fully Booked Scenario
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${pre_conflict_check_in}    ${pre_conflict_check_out}
    Submit Booking
    Verify Booking Created Successfully
    [Teardown]    Cleanup After Conflict Test

TC-23 Booking Blocked Overlapping Fully Booked Period
    [Documentation]    Booking is blocked when dates overlap directly within the fully booked period.
    [Tags]    booking    create    date_conflict    negative
    [Setup]    Setup Fully Booked Scenario
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${overlap_check_in}    ${overlap_check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_NO_ROOMS}
    [Teardown]    Cleanup After Conflict Test

TC-24 Booking Allowed When Check-in Matches Existing Check-out
    [Documentation]    Booking is allowed when new check-in date matches the check-out date of existing bookings.
    [Tags]    booking    create    date_conflict    positive
    [Setup]    Setup Fully Booked Scenario
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${adjacent_check_in}    ${adjacent_check_out}
    Submit Booking
    Verify Booking Created Successfully
    [Teardown]    Cleanup After Conflict Test

TC-25 Booking Blocked With Invalid People Text
    [Documentation]    The People field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear People
    Input Text    ${BOOKING_PEOPLE_INPUT}    ${invalid_text_input}
    Verify Field Rejects NonNumeric Input    ${BOOKING_PEOPLE_INPUT}    ${invalid_text_input}    People field should not accept non-numeric text
    Submit Booking

TC-26 Booking Blocked With Invalid Beds Text
    [Documentation]    The Beds field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear Beds
    Input Text    ${BOOKING_BEDS_INPUT}    ${invalid_text_input}
    Verify Field Rejects NonNumeric Input    ${BOOKING_BEDS_INPUT}    ${invalid_text_input}    Beds field should not accept non-numeric text
    Submit Booking

TC-27 Booking Blocked With Invalid Twin Beds Text
    [Documentation]    The Twin Beds field rejects non-numeric text input.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear Twin Beds
    Input Text    ${BOOKING_TWIN_BEDS_INPUT}    ${invalid_text_input}
    Verify Field Rejects NonNumeric Input    ${BOOKING_TWIN_BEDS_INPUT}    ${invalid_text_input}    Twin Beds field should not accept non-numeric text
    Submit Booking

TC-28 Booking Blocked With Non-existent Hotel ID
    [Documentation]    Booking is blocked when entering a non-existent Hotel ID.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${non_existent_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Submit Booking
    Verify Booking Error Message    ${HOTEL_NOT_FOUND}

TC-29 Booking Blocked With Negative People
    [Documentation]    Booking is blocked when entering a negative number in Number of People.
    [Tags]    booking    create    negative    bug
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear People
    Fill People    ${negative_people}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}

TC-30 Booking Blocked With Negative Beds
    [Documentation]    Booking is blocked when entering a negative number in Number of Beds.
    [Tags]    booking    create    negative    bug
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear Beds
    Fill Beds    ${negative_beds}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}

TC-31 Booking Blocked With Negative Twin Beds
    [Documentation]    Booking is blocked when entering a negative number in Twin Beds.
    [Tags]    booking    create    negative    bug
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Clear Twin Beds
    Fill Twin Beds    ${negative_twin_beds}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}

TC-32 Booking Blocked With Matching Check-in/out Dates
    [Documentation]    Booking is blocked when check-in and check-out dates are identical.
    [Tags]    booking    create    negative
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${one_day_check_in}    ${one_day_check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_INVALID_DATES}
