*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   review_selectors.resource
Resource   ../../config/timeouts.resource
Resource   ../../config/TestData.resource
Resource   ../../config/messages.resource
Resource   ../../assertions/review_assertions.resource

*** Keywords ***
Fill Review Field
    [Arguments]    ${field_locator}    ${value}
    Clear Element Text    ${field_locator}
    Input Text    ${field_locator}    ${value}

Clear Review Field
    [Arguments]    ${field_locator}
    Clear Element Text    ${field_locator}

Fill Review Hotel ID
    [Arguments]    ${hotel_id}
    Fill Review Field    ${REVIEW_HOTEL_ID_INPUT}    ${hotel_id}

Clear Review Hotel ID
    Clear Review Field    ${REVIEW_HOTEL_ID_INPUT}

Fill Review Customer Name
    [Arguments]    ${name}
    Fill Review Field    ${REVIEW_CUSTOMER_NAME_INPUT}    ${name}

Clear Review Customer Name
    Clear Review Field    ${REVIEW_CUSTOMER_NAME_INPUT}

Fill Review Rating
    [Arguments]    ${rating}
    Fill Review Field    ${REVIEW_RATING_INPUT}    ${rating}

Clear Review Rating
    Clear Review Field    ${REVIEW_RATING_INPUT}

Fill Review Comment
    [Arguments]    ${comment}
    Fill Review Field    ${REVIEW_COMMENT_INPUT}    ${comment}

Clear Review Comment
    Clear Review Field    ${REVIEW_COMMENT_INPUT}

Fill Delete Review ID
    [Arguments]    ${review_id}
    Fill Review Field    ${DELETE_REVIEW_ID_INPUT}    ${review_id}

Clear Delete Review ID
    Clear Review Field    ${DELETE_REVIEW_ID_INPUT}

Clear Review Form
    Clear Review Hotel ID
    Clear Review Customer Name
    Clear Review Rating
    Clear Review Comment

Fill Valid Review
    [Arguments]    ${hotel_id}=${review_hotel_id}    ${customer_name}=${review_customer_name}    ${rating}=${review_rating}    ${comment}=${review_comment}
    Fill Review Hotel ID         ${hotel_id}
    Fill Review Customer Name    ${customer_name}
    Fill Review Rating           ${rating}
    Fill Review Comment          ${comment}

Submit Review
    Click Button    ${REVIEW_SUBMIT_BTN}

Load Reviews
    Click Button    ${REVIEW_LOAD_BTN}

Delete Review
    Click Button    ${REVIEW_DELETE_BTN}

Create Test Review
    Fill Valid Review
    Submit Review
    Verify Review Created Successfully

Create Test Review And Verify All Fields
    Fill Valid Review
    Submit Review
    Verify Review Created Successfully

Verify Review Blocked With Blank Field
    [Arguments]    ${field_locator}
    Fill Valid Review
    Clear Review Field    ${field_locator}
    Submit Review
    Verify Review Error Message    ${REVIEW_MISSING_FIELDS}

Verify Review Blocked With Invalid Rating
    [Arguments]    ${rating}    ${comment}
    Fill Valid Review    rating=${rating}    comment=${comment}
    Submit Review
    Verify Review Created Successfully

Verify Review Deletion By Created Review
    Create Test Review
    ${text}=    Get Text    ${REVIEW_OUTPUT}
    ${data}=    Evaluate    json.loads("""${text}""")
    ${review_id}=    Set Variable    ${data["id"]}
    Fill Delete Review ID    ${review_id}
    Delete Review
    Verify Review Deleted Successfully

Verify Review Load Blocked With Empty Hotel ID
    Load Reviews
    Verify Review Error Message    ${REVIEW_MISSING_FIELDS}

Cleanup Created Review
    ${text}=    Get Text    ${REVIEW_OUTPUT}
    ${is_object}=    Run Keyword And Return Status    Should Start With    ${text}    {
    IF    ${is_object}
        ${data}=    Evaluate    json.loads("""${text}""")
        ${has_id}=    Run Keyword And Return Status    Dictionary Should Contain Key    ${data}    id
        IF    ${has_id}
            ${review_id}=    Set Variable    ${data["id"]}
            Fill Delete Review ID    ${review_id}
            Delete Review
            Run Keyword And Ignore Error    Wait Until Element Contains    ${TOAST}    ${REVIEW_DELETE_SUCCESS}    timeout=10s
        END
    END
    Clear Review Form
    Clear Delete Review ID
