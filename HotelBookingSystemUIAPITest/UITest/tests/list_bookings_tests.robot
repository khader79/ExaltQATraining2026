*** Settings ***
Documentation    List Bookings Tests
Resource         ../pages/ListBookings/list_bookings_page.resource
Resource         ../pages/Booking/booking_page.resource
Resource         ../pages/Cancel/cancel_page.resource
Resource         ../config/TestData.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Cleanup Page State

*** Test Cases ***

TC-39 List Bookings By Valid Hotel ID
    [Documentation]    System loads bookings successfully when providing a valid Hotel ID.
    [Tags]    list    positive
    Cancel Confirmed Bookings For Hotel    ${booking_hotel_id}
    Create Test Booking
    Load Bookings For Hotel    ${booking_hotel_id}
    Verify List Bookings Success
    Verify List Bookings Contains Hotel ID    ${booking_hotel_id}
    Verify List Bookings Contains Customer Name    ${booking_customer}
    Load Bookings For Hotel    ${booking_hotel_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    ${bookings}=    Evaluate    json.loads("""${text}""")["bookings"]    json
    ${confirmed_ids}=    Evaluate    [b["id"] for b in ${bookings} if b["status"] == "confirmed"]
    ${booking_id}=    Set Variable    ${confirmed_ids}[0]
    Fill Cancel Booking ID    ${booking_id}
    Submit Cancel Booking
    Verify Cancel Success

TC-40 List Bookings With Blank Hotel ID
    [Documentation]    System blocks listing when Hotel ID is blank.
    [Tags]    list    negative
    Submit Load Bookings
    Verify List Bookings Error Message    ${LIST_BOOKINGS_EMPTY_ID}
