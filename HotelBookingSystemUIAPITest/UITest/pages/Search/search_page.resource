*** Settings ***
Library    SeleniumLibrary
Library    ../../utils/data_helper.py
Resource   ../base_page.resource
Resource   search_selectors.resource
Resource   ../../config/Constants.resource

*** Keywords ***
Enter City
    [Arguments]    ${city_name}
    Clear Element Text    ${SEARCH_CITY_INPUT}
    Input Text            ${SEARCH_CITY_INPUT}    ${city_name}

Clear City
    Clear Element Text    ${SEARCH_CITY_INPUT}

Enter Min Rating
    [Arguments]    ${rating}
    Clear Element Text    ${SEARCH_MIN_RATING_INPUT}
    Input Text            ${SEARCH_MIN_RATING_INPUT}    ${rating}

Clear Min Rating
    Clear Element Text    ${SEARCH_MIN_RATING_INPUT}

Enter Max Price
    [Arguments]    ${price}
    Clear Element Text    ${SEARCH_MAX_PRICE_INPUT}
    Input Text            ${SEARCH_MAX_PRICE_INPUT}    ${price}

Clear Max Price
    Clear Element Text    ${SEARCH_MAX_PRICE_INPUT}

Select Amenity By Label
    [Arguments]    ${label}
    Select From List By Label    ${SEARCH_AMENITY_SELECT}    ${label}

Reset Amenity
    Select From List By Index    ${SEARCH_AMENITY_SELECT}    0

Select Sort By Label
    [Arguments]    ${label}
    Select From List By Label    ${SEARCH_SORT_BY_SELECT}    ${label}

Reset Sort By
    Select From List By Index    ${SEARCH_SORT_BY_SELECT}    0

Click Search Hotels Button
    Click Button    ${SEARCH_SUBMIT_BTN}
    Sleep    ${SLEEP_DURATION}


Filter Hotels By City
    [Arguments]    ${city_name}
    Enter City    ${city_name}
    Click Search Hotels Button

Filter Hotels By Min Rating
    [Arguments]    ${rating}
    Enter Min Rating    ${rating}
    Click Search Hotels Button

Filter Hotels By Max Price
    [Arguments]    ${price}
    Enter Max Price    ${price}
    Click Search Hotels Button

Filter Hotels By Amenity
    [Arguments]    ${label}
    Select Amenity By Label    ${label}
    Click Search Hotels Button

Sort Hotels By Label
    [Arguments]    ${label}
    Select Sort By Label    ${label}
    Click Search Hotels Button

Search With All Fields Empty
    Clear City
    Clear Min Rating
    Clear Max Price
    Reset Amenity
    Reset Sort By
    Click Search Hotels Button


Reset Search Filters
    Clear City
    Clear Min Rating
    Clear Max Price
    Reset Amenity
    Reset Sort By
    Click Search Hotels Button


Verify Hotel Results Contains Text
    [Arguments]    ${expected_text}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain    ${HOTELS_LIST_CONTAINER}    ${expected_text}

Verify Hotel Results Not Contains Text
    [Arguments]    ${text}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Not Contain    ${HOTELS_LIST_CONTAINER}    ${text}

Verify Hotel Results Are Displayed
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Element Should Be Visible    ${HOTELS_LIST_CONTAINER}

Verify No Results Message
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    Wait Until Element Contains    ${HOTELS_LIST_CONTAINER}    ${NO_RESULTS_TEXT}    timeout=${DEFAULT_TIMEOUT}

Verify No Hotel Exceeds Max Price
    [Arguments]    ${max_price}
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}
    ${text}=    Get Text    ${HOTELS_LIST_CONTAINER}
    ${has_expensive}=    Has Price Above    ${text}    ${max_price}
    Should Not Be True    ${has_expensive}    Hotels exceeding max price ${max_price} were found

Verify Pagination Next Button Exists
    Element Should Be Visible    ${PAGINATION_NEXT_BTN}

Click Next Page
    Click Element    ${PAGINATION_NEXT_BTN}
    Sleep    ${SLEEP_DURATION}

Click Previous Page
    Click Element    ${PAGINATION_PREV_BTN}
    Sleep    ${SLEEP_DURATION}

Get Current Page Info
    ${text}=    Get Text    ${PAGINATION_INFO}
    RETURN    ${text}
