*** Settings ***
Library    SeleniumLibrary
Resource    ../config/messages.resource
Resource    ../config/timeouts.resource
Resource    ../pages/Review/review_selectors.resource
Resource    ../pages/Cancel/cancel_selectors.resource

*** Keywords ***
Verify Review Created Successfully
    Wait Until Element Contains    ${TOAST}    ${REVIEW_SUCCESS_SUBMIT}    timeout=${DEFAULT_TIMEOUT}
    Wait Until Element Is Visible    ${REVIEW_OUTPUT}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain    ${REVIEW_OUTPUT}    "id"

Verify Review Error Message
    [Arguments]    ${expected_message}
    Wait Until Element Is Visible    ${TOAST}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain    ${TOAST}    ${expected_message}

Verify Review Deleted Successfully
    Wait Until Element Contains    ${TOAST}    ${REVIEW_DELETE_SUCCESS}    timeout=${DEFAULT_TIMEOUT}
