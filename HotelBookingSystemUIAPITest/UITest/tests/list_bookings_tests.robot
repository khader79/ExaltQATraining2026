*** Settings ***
Documentation    List Bookings Tests
Resource         ../pages/ListBookings/list_bookings_page.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Cleanup Page State

*** Test Cases ***

TC-36 List Bookings By Valid Hotel ID
    [Documentation]    System loads bookings successfully when providing a valid Hotel ID.
    [Tags]    list    positive
    Cancel Confirmed Bookings For Hotel    ${booking_hotel_id}
    Fill List Bookings Hotel ID    ${booking_hotel_id}
    Submit Load Bookings
    Verify List Bookings Success
    Verify List Bookings Contains Hotel ID    ${booking_hotel_id}
    Fill Valid Booking
    Submit Booking
    Verify Booking Created Successfully
    Fill List Bookings Hotel ID    ${booking_hotel_id}
    Submit Load Bookings
    Verify List Bookings Contains Customer Name    ${booking_customer}
    Submit Cancel Booking
    Verify Cancel Success

TC-37 List Bookings With Blank Hotel ID
    [Documentation]    System blocks listing when Hotel ID is blank.
    [Tags]    list    negative
    Submit Load Bookings
    Verify List Bookings Error Message    ${LIST_BOOKINGS_EMPTY_ID}
