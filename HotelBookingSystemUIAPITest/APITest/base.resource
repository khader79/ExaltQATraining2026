*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    OperatingSystem
Resource   config/env.resource

*** Variables ***
${DEFAULT_PAGE}    1

*** Keywords ***
Create API Session
    ${headers}=    Create Dictionary    Content-Type=${CONTENT_TYPE}    Accept=${ACCEPT}
    Create Session    api    ${BASE_URL}    headers=${headers}    verify=${True}

Verify Status Code
    [Arguments]    ${response}    ${expected}
    Should Be Equal As Numbers    ${response.status_code}    ${expected}

Verify Response Field Equals
    [Arguments]    ${response}    ${field}    ${expected}
    Should Be Equal    ${response.json()}[${field}]    ${expected}

Verify Response Has Key
    [Arguments]    ${response}    ${key}
    Dictionary Should Contain Key    ${response.json()}    ${key}

Verify Response List Not Empty
    [Arguments]    ${response}    ${list_key}
    ${json}=    Set Variable    ${response.json()}
    ${length}=    Get Length    ${json}[${list_key}]
    Should Be True    ${length} > 0

Verify Response List Empty
    [Arguments]    ${response}    ${list_key}
    ${json}=    Set Variable    ${response.json()}
    ${length}=    Get Length    ${json}[${list_key}]
    Should Be Equal As Numbers    ${length}    0

Verify Item Field Equals
    [Arguments]    ${item}    ${field}    ${expected}
    Should Be Equal    ${item}[${field}]    ${expected}
