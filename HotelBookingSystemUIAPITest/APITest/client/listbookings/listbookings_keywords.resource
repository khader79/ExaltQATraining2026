*** Settings ***
Resource    ../../base.resource
Resource    ../../config/listbookings_test_data.resource
Resource    ../booking/booking_keywords.resource
Resource    ../cancel/cancel_keywords.resource

*** Keywords ***
Get Bookings By Hotel ID
    [Arguments]    ${hotel_id}
    ${params}=    Create Dictionary    hotelId=${hotel_id}
    ${response}=    GET On Session    api    ${BOOKING_ENDPOINT}    params=${params}    expected_status=any
    RETURN    ${response}

Get All Bookings
    ${response}=    GET On Session    api    ${BOOKING_ENDPOINT}    expected_status=any
    RETURN    ${response}

Create Listing Booking
    ${body}=    Valid Booking Body    hotel_id=${VALID_LISTING_HOTEL_ID}
    ${response}=    Send Booking    ${body}
    ${booking_id}=    Set Variable    ${response.json()}[booking][id]
    RETURN    ${booking_id}

Cancel Listing Booking
    [Arguments]    ${booking_id}
    Cancel Booking By ID    ${booking_id}
