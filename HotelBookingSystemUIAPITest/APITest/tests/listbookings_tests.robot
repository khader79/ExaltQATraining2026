*** Settings ***
Documentation    List Bookings API Tests
Resource         ../base.resource
Resource         ../client/booking/booking_keywords.resource
Resource         ../client/listbookings/listbookings_keywords.resource
Resource         ../assertions/listbookings_assertions.resource
Resource         ../config/listbookings_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-35 Get Bookings By Valid Hotel ID
    [Tags]    listbookings    positive
    ${booking_id}=    Create Listing Booking
    ${response}=    Get Bookings By Hotel ID    ${VALID_LISTING_HOTEL_ID}
    Verify Bookings List Success    ${response}
    Verify Bookings Not Empty    ${response}
    Cancel Listing Booking    ${booking_id}

TC-36 Get Bookings By Hotel ID With No Bookings
    [Tags]    listbookings    positive
    ${response}=    Get Bookings By Hotel ID    ${HOTEL_ID_NO_BOOKINGS}
    Verify Bookings List Success    ${response}
    Verify Bookings Empty    ${response}

TC-37 Get All Bookings
    [Tags]    listbookings    positive
    ${booking_id}=    Create Listing Booking
    ${response}=    Get All Bookings
    Verify Bookings List Success    ${response}
    Cancel Listing Booking    ${booking_id}

TC-38 Get Booking By Valid Booking ID
    [Tags]    listbookings    positive
    ${booking_id}=    Create Listing Booking
    ${response}=    Get Booking By ID    ${booking_id}
    Verify Single Booking Success    ${response}
    Cancel Listing Booking    ${booking_id}
