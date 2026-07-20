*** Settings ***
Library    SeleniumLibrary
Resource    ../config/messages.resource
Resource    ../config/timeouts.resource
Resource    ../pages/Booking/booking_selectors.resource

*** Keywords ***
Verify Booking Created Successfully
    [Arguments]    ${output_locator}=${BOOKING_OUTPUT}
    Wait Until Element Is Visible    ${output_locator}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain           ${output_locator}    ${BOOKING_SUCCESS_TEXT}

Verify Booking Error Message
    [Arguments]    ${expected_error}    ${output_locator}=${BOOKING_OUTPUT}
    Wait Until Element Is Visible    ${output_locator}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain           ${output_locator}    ${expected_error}

Verify Field Rejects NonNumeric Input
    [Arguments]    ${field_locator}    ${input_value}    ${error_msg}
    ${value}=    Get Element Attribute    ${field_locator}    value
    Should Not Be Equal    ${value}    ${input_value}    msg=${error_msg}

Verify Booking Response Field
    [Arguments]    ${output_locator}    ${field_name}    ${expected_value}
    ${text}=    Get Text    ${output_locator}
    Should Contain    ${text}    "${field_name}": ${expected_value}

Verify Booking Response Contains All Fields
    [Arguments]    ${output_locator}    ${hotel_id}    ${customer}    ${people}    ${beds}    ${twin_beds}    ${status}=confirmed
    ${text}=    Get Text    ${output_locator}
    Should Contain    ${text}    "hotelId": "${hotel_id}"
    Should Contain    ${text}    "customerName": "${customer}"
    Should Contain    ${text}    "people": ${people}
    Should Contain    ${text}    "beds": ${beds}
    Should Contain    ${text}    "twinBeds": ${twin_beds}
    Should Contain    ${text}    "status": "${status}"
