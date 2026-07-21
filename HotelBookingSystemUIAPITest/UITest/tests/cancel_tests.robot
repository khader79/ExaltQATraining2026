*** Settings ***
Documentation    Booking Cancellation Tests
Resource         ../pages/Booking/booking_page.resource
Resource         ../pages/Cancel/cancel_page.resource
Resource         ../pages/ListBookings/list_bookings_page.resource
Resource         ../config/TestData.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Clear Cancel Booking ID

*** Test Cases ***

TC-33 Cancel Valid Booking
    [Documentation]    Cancellation completes when entering a valid Booking ID.
    [Tags]    cancel    positive
    [Setup]    Create Test Booking
    Load Bookings For Hotel    ${booking_hotel_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    ${bookings}=    Evaluate    json.loads("""${text}""")["bookings"]    json
    ${confirmed_ids}=    Evaluate    [b["id"] for b in ${bookings} if b["status"] == "confirmed"]
    ${booking_id}=    Set Variable    ${confirmed_ids}[0]
    Fill Cancel Booking ID    ${booking_id}
    Submit Cancel Booking
    Verify Cancel Success

TC-34 Cancel Non-Existent Booking
    [Documentation]    Cancellation is blocked when entering a non-existent Booking ID.
    [Tags]    cancel    negative
    Fill Cancel Booking ID    ${invalid_booking_id}
    Submit Cancel Booking
    Verify Cancel Error Message    ${CANCEL_BOOKING_NOT_FOUND}

TC-35 Cancel With Blank Booking ID
    [Documentation]    Cancellation is blocked when leaving the Booking ID field blank.
    [Tags]    cancel    negative
    Submit Cancel Booking
    Verify Cancel Error Message    ${CANCEL_EMPTY_ID}

TC-36 Cancel With Spaces Only
    [Documentation]    Cancellation is blocked when entering spaces only.
    [Tags]    cancel    negative
    Fill Cancel Booking ID    ${spaces_input}
    Submit Cancel Booking
    Verify Cancel Error Message    ${CANCEL_EMPTY_ID}

TC-37 Cancel With Special Characters
    [Documentation]    Cancellation should block special characters in Booking ID.
    [Tags]    cancel    negative    bug
    Fill Cancel Booking ID    ${special_chars_id}
    Submit Cancel Booking
    Verify Cancel Error Message    ${INVALID_ID_FORMAT}

TC-38 Cancel Already Cancelled Booking
    [Documentation]    Cancellation is blocked when re-cancelling an already cancelled booking.
    [Tags]    cancel    negative    bug
    [Setup]    Create Test Booking
    Load Bookings For Hotel    ${booking_hotel_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    ${bookings}=    Evaluate    json.loads("""${text}""")["bookings"]    json
    ${confirmed_ids}=    Evaluate    [b["id"] for b in ${bookings} if b["status"] == "confirmed"]
    ${booking_id}=    Set Variable    ${confirmed_ids}[0]
    Fill Cancel Booking ID    ${booking_id}
    Submit Cancel Booking
    Verify Cancel Success
    Fill Cancel Booking ID    ${booking_id}
    Submit Cancel Booking
    Verify Cancel Error Message    ${CANCEL_BOOKING_NOT_FOUND}
