*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Successful Booking
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CREATED}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    booking
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field Equals    ${booking}    status    confirmed
    Verify Item Field Has Key    ${booking}    id
    Verify Item Field Has Key    ${booking}    amount

Verify Booking Error Response
    [Arguments]    ${response}    ${status}    ${expected_message}
    Verify Status Code    ${response}    ${status}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Field Equals    ${response}    message    ${expected_message}

Verify Booking Conflict Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CONFLICT}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Field Equals    ${response}    message    No rooms available for selected dates

Verify Item Field Has Key
    [Arguments]    ${item}    ${key}
    Dictionary Should Contain Key    ${item}    ${key}
