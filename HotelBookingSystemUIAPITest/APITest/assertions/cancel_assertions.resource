*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Successful Cancel
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    message

Verify Cancel Error Response
    [Arguments]    ${response}    ${status}    ${expected_message}
    Verify Status Code    ${response}    ${status}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Has Key    ${response}    message
    Verify Response Field Equals    ${response}    message    ${expected_message}
