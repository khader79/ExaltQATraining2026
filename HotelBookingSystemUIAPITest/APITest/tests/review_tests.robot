*** Settings ***
Documentation    Reviews API Tests
Library          Collections
Resource         ../base.resource
Resource         ../client/review/review_keywords.resource
Resource         ../assertions/review_assertions.resource
Resource         ../config/review_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-39 Create Valid Review
    [Tags]    review    positive
    ${body}=    Valid Review Body
    ${response}=    Send Review    ${body}
    Verify Successful Review    ${response}
    ${review_id}=    Set Variable    ${response.json()}[id]
    Delete Review By ID    ${review_id}

TC-40 Reject Review Missing hotelId
    [Tags]    review    negative
    ${body}=    Valid Review Body
    Remove From Dictionary    ${body}    hotelId
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-41 Reject Review Empty hotelId
    [Tags]    review    negative
    ${body}=    Valid Review Body    hotel_id=${EMPTY}
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-42 Reject Review Non Existent Hotel
    [Tags]    review    negative
    ${body}=    Valid Review Body    hotel_id=${NON_EXISTENT_REVIEW_HOTEL}
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_NOT_FOUND}    ${ERR_REVIEW_HOTEL_NOT_FOUND}

TC-43 Reject Review Missing customerName
    [Tags]    review    negative
    ${body}=    Valid Review Body
    Remove From Dictionary    ${body}    customerName
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-44 Reject Review Empty customerName
    [Tags]    review    negative
    ${body}=    Valid Review Body    customer_name=${EMPTY}
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-45 Reject Review Missing rating
    [Tags]    review    negative
    ${body}=    Valid Review Body
    Remove From Dictionary    ${body}    rating
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-46 Reject Review Empty rating
    [Tags]    review    negative
    ${body}=    Valid Review Body    rating=${EMPTY}
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-47 Reject Review Rating Greater Than 5
    [Tags]    review    negative    bug
    ${body}=    Valid Review Body    rating=${INVALID_RATING_HIGH}
    ${response}=    Send Review    ${body}
    Run Keyword And Ignore Error    Cleanup Leaked Review    ${response.json()}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_RATING}

TC-48 Reject Review Rating Less Than 1
    [Tags]    review    negative    bug
    ${body}=    Valid Review Body    rating=${INVALID_RATING_LOW}
    ${response}=    Send Review    ${body}
    Run Keyword And Ignore Error    Cleanup Leaked Review    ${response.json()}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_RATING}

TC-49 Reject Review Rating As String
    [Tags]    review    negative    bug
    ${body}=    Valid Review Body    rating=${INVALID_RATING_STRING}
    ${response}=    Send Review    ${body}
    Run Keyword And Ignore Error    Cleanup Leaked Review    ${response.json()}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_RATING}

TC-50 Reject Review Missing comment
    [Tags]    review    negative
    ${body}=    Valid Review Body
    Remove From Dictionary    ${body}    comment
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-51 Reject Review Empty comment
    [Tags]    review    negative
    ${body}=    Valid Review Body    comment=${EMPTY}
    ${response}=    Send Review    ${body}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-52 Reject Review Whitespace Only comment
    [Tags]    review    negative    bug
    ${body}=    Valid Review Body    comment=${WHITESPACE_COMMENT}
    ${response}=    Send Review    ${body}
    Run Keyword And Ignore Error    Cleanup Leaked Review    ${response.json()}
    Verify Review Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_COMMENT}

TC-53 Get All Reviews
    [Tags]    review    positive
    ${response}=    Get Reviews
    Verify Reviews List Success    ${response}
    Verify Reviews Not Empty    ${response}

TC-54 Get Reviews By Hotel ID
    [Tags]    review    positive
    ${params}=    Create Dictionary    hotelId=${REVIEW_HOTEL_ID}
    ${response}=    Get Reviews    ${params}
    Verify Reviews List Success    ${response}

TC-55 Get Reviews By Hotel ID With No Reviews
    [Tags]    review    positive
    ${params}=    Create Dictionary    hotelId=${HOTEL_NO_REVIEWS}
    ${response}=    Get Reviews    ${params}
    Verify Reviews List Success    ${response}
    Verify Reviews Empty    ${response}

TC-56 Delete Existing Review
    [Tags]    review    positive
    ${body}=    Valid Review Body
    ${create_response}=    Send Review    ${body}
    ${review_id}=    Set Variable    ${create_response.json()}[id]
    ${response}=    Delete Review By ID    ${review_id}
    Verify Deleted Review Success    ${response}
