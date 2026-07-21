*** Settings ***
Resource    ../../base.resource
Resource    ../../config/search_test_data.resource

*** Keywords ***
Search Hotels
    [Arguments]    ${params}=${NONE}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}
