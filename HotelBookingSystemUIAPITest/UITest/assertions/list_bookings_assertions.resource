*** Settings ***
Library    SeleniumLibrary
Resource    ../config/messages.resource
Resource    ../config/timeouts.resource
Resource    ../pages/ListBookings/list_bookings_selectors.resource
Resource    ../pages/Cancel/cancel_selectors.resource

*** Keywords ***
Verify List Bookings Success
    Wait Until Element Is Visible    ${LIST_BOOKINGS_OUTPUT}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain    ${LIST_BOOKINGS_OUTPUT}    ${BOOKING_SUCCESS_TEXT}

Verify List Bookings Contains Hotel ID
    [Arguments]    ${hotel_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    Should Contain    ${text}    "hotelId": "${hotel_id}"

Verify List Bookings Contains Customer Name
    [Arguments]    ${customer_name}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    Should Contain    ${text}    "customerName": "${customer_name}"

Verify List Bookings Contains Booking ID
    [Arguments]    ${booking_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    Should Contain    ${text}    "id": "${booking_id}"

Verify List Bookings Does Not Contain Booking ID
    [Arguments]    ${booking_id}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    Should Not Contain    ${text}    "id": "${booking_id}"

Verify List Bookings Does Not Contain Customer Name
    [Arguments]    ${customer_name}
    ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
    Should Not Contain    ${text}    "customerName": "${customer_name}"

Verify List Bookings Error Message
    [Arguments]    ${expected_message}
    Wait Until Element Contains    ${TOAST}    ${expected_message}    timeout=${DEFAULT_TIMEOUT}
