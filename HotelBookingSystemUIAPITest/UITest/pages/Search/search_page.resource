*** Settings ***
Library    SeleniumLibrary
Library    ../../utils/data_helper.py
Resource   ../base_page.resource
Resource   search_selectors.resource
Resource   ../../config/timeouts.resource
Resource   ../../assertions/search_assertions.resource

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
    Wait Until Element Is Visible    ${HOTELS_LIST_CONTAINER}    timeout=${DEFAULT_TIMEOUT}

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

Click Next Page
    Click Element    ${PAGINATION_NEXT_BTN}
    Wait Until Element Is Visible    ${PAGINATION_INFO}    timeout=${DEFAULT_TIMEOUT}

Click Previous Page
    Click Element    ${PAGINATION_PREV_BTN}
    Wait Until Element Is Visible    ${PAGINATION_INFO}    timeout=${DEFAULT_TIMEOUT}

Get Current Page Info
    ${text}=    Get Text    ${PAGINATION_INFO}
    RETURN    ${text}

Verify Pagination Changes Page
    Verify Hotel Results Displayed
    ${page_before}=    Get Current Page Info
    Verify Pagination Next Button Exists
    Click Next Page
    ${page_after}=    Get Current Page Info
    Should Not Be Equal    ${page_before}    ${page_after}
    Click Previous Page
