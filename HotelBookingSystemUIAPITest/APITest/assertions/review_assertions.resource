*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Successful Review
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CREATED}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    id
    Verify Response Has Key    ${response}    hotelId
    Verify Response Has Key    ${response}    customerName
    Verify Response Has Key    ${response}    rating
    Verify Response Has Key    ${response}    comment

Verify Review Error Response
    [Arguments]    ${response}    ${status}    ${expected_message}
    Verify Status Code    ${response}    ${status}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Field Equals    ${response}    message    ${expected_message}

Verify Reviews List Success
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    reviews

Verify Reviews Not Empty
    [Arguments]    ${response}
    Verify Response List Not Empty    ${response}    reviews

Verify Reviews Empty
    [Arguments]    ${response}
    Verify Response List Empty    ${response}    reviews

Verify Deleted Review Success
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    message
