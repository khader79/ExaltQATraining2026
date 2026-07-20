*** Settings ***
Library    SeleniumLibrary
Resource    ../config/messages.resource
Resource    ../config/timeouts.resource
Resource    ../pages/Cancel/cancel_selectors.resource

*** Keywords ***
Verify Cancel Success
    Wait Until Element Contains    ${TOAST}    ${CANCEL_SUCCESS}    timeout=10s

Verify Cancel Error Message
    [Arguments]    ${expected_message}
    Wait Until Element Contains    ${TOAST}    ${expected_message}    timeout=10s
