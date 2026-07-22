*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Bookings List Success
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    bookings

Verify Bookings Not Empty
    [Arguments]    ${response}
    Verify Response List Not Empty    ${response}    bookings

Verify Bookings Empty
    [Arguments]    ${response}
    Verify Response List Empty    ${response}    bookings

Verify Single Booking Success
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    booking
