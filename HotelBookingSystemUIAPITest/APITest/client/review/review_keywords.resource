*** Settings ***
Library           Collections
Resource          ../../base.resource
Resource          ../../config/review_test_data.resource

*** Keywords ***
Send Review
    [Arguments]    ${body}
    ${response}=    POST On Session    api    ${REVIEW_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Valid Review Body
    [Arguments]    ${hotel_id}=${REVIEW_HOTEL_ID}    ${customer_name}=${DEFAULT_CUSTOMER_NAME}    ${rating}=${DEFAULT_RATING}    ${comment}=${DEFAULT_COMMENT}
    ${body}=    Create Dictionary
    ...    hotelId=${hotel_id}
    ...    customerName=${customer_name}
    ...    rating=${rating}
    ...    comment=${comment}
    RETURN    ${body}

Get Reviews
    [Arguments]    ${params}=${NONE}
    ${response}=    GET On Session    api    ${REVIEW_ENDPOINT}    params=${params}    expected_status=any
    RETURN    ${response}

Delete Review By ID
    [Arguments]    ${review_id}
    ${response}=    DELETE On Session    api    ${REVIEW_ENDPOINT}/${review_id}    expected_status=any
    RETURN    ${response}

Cleanup Leaked Review
    [Arguments]    ${json}
    ${id}=    Get From Dictionary    ${json}    id
    Delete Review By ID    ${id}
