*** Settings ***
Documentation    Review Management Tests
Resource         ../pages/Review/review_page.resource
Resource         ../config/TestData.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Cleanup Created Review

*** Test Cases ***

TC-41 Create Valid Review
    [Documentation]    Review submission completes when all required fields are correct.
    [Tags]    review    create    positive
    Fill Valid Review
    Submit Review
    Verify Review Created Successfully

TC-42 Review Blocked With Blank Hotel ID
    [Documentation]    Review is blocked when Hotel ID is blank.
    [Tags]    review    create    negative
    Verify Review Blocked With Blank Field    ${REVIEW_HOTEL_ID_INPUT}

TC-43 Review Blocked With Blank Customer Name
    [Documentation]    Review is blocked when Customer Name is blank.
    [Tags]    review    create    negative
    Verify Review Blocked With Blank Field    ${REVIEW_CUSTOMER_NAME_INPUT}

TC-44 Review Blocked With Negative Rating
    [Documentation]    Rating field should reject values below 1.
    [Tags]    review    create    negative    bug
    Verify Review Blocked With Invalid Rating    ${review_negative_rating}    ${review_invalid_rating_comment}

TC-45 Review Blocked With Rating Above 5
    [Documentation]    Rating field should reject values above 5.
    [Tags]    review    create    negative    bug
    Verify Review Blocked With Invalid Rating    ${review_high_rating}    ${review_invalid_rating_comment}

TC-46 Review Blocked With Blank Comment
    [Documentation]    Review is blocked when Comment is blank.
    [Tags]    review    create    negative
    Verify Review Blocked With Blank Field    ${REVIEW_COMMENT_INPUT}

TC-47 Review Load Blocked With Blank Hotel ID
    [Documentation]    Load Reviews is blocked when Hotel ID is blank.
    [Tags]    review    load    negative
    Verify Review Load Blocked With Empty Hotel ID

TC-48 Delete Valid Review
    [Documentation]    Deleting a review using a valid Review ID works successfully.
    [Tags]    review    delete    positive
    Verify Review Deletion By Created Review
