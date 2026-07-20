*** Settings ***
Library    SeleniumLibrary
Resource    ../config/messages.resource
Resource    ../config/timeouts.resource
Resource    ../pages/Search/search_selectors.resource
Library    ../utils/data_helper.py 

*** Keywords ***
Verify Hotel Results Displayed
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Be Visible        ${HOTELS_LIST_CONTAINER}

Verify Hotel Results Are Displayed
    Verify Hotel Results Displayed

Verify Results Contain Text
    [Arguments]    ${expected_text}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain           ${HOTELS_LIST_CONTAINER}    ${expected_text}

Verify Results Do Not Contain Text
    [Arguments]    ${unexpected_text}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Not Contain       ${HOTELS_LIST_CONTAINER}    ${unexpected_text}

Verify No Results Message Displayed
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Wait Until Element Contains      ${HOTELS_LIST_CONTAINER}    ${NO_RESULTS_TEXT}    timeout=${DEFAULT_TIMEOUT}

Verify No Results Message
    Verify No Results Message Displayed

Verify No Hotel Exceeds Max Price
    [Arguments]    ${max_price}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    ${text}=    Get Text    ${HOTELS_LIST_CONTAINER}
    ${has_expensive}=    Has Price Above    ${text}    ${max_price}
    Should Not Be True    ${has_expensive}    Hotels exceeding max price ${max_price} were found

Verify Pagination Next Button Exists
    Element Should Be Visible    ${PAGINATION_NEXT_BTN}

Verify Hotel Results Contains Text
    [Arguments]    ${expected_text}
    Verify Results Contain Text    ${expected_text}
