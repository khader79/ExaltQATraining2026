*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Successful Cancel
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    message
