*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Cancel Booking By ID
    [Arguments]    ${booking_id}
    ${response}=    DELETE On Session    api    ${CANCEL_ENDPOINT}/${booking_id}    expected_status=any
    RETURN    ${response}

Cancel Booking From Response
    [Arguments]    ${response}
    ${booking}=    Set Variable    ${response.json()}[booking]
    ${booking_id}=    Set Variable    ${booking}[id]
    ${cancel_response}=    Cancel Booking By ID    ${booking_id}
    RETURN    ${cancel_response}
