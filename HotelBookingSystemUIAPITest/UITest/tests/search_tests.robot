*** Settings ***
Documentation    Hotel Search and Filter Tests
Resource         ../pages/Search/search_page.resource
Resource         ../config/TestData.resource
Suite Setup      Open Hotel Application
Suite Teardown   Close Hotel Application
Test Teardown    Reset Search Filters

*** Test Cases ***

TC-1 Search Hotels By City
    [Documentation]    Searching by city shows hotels in that city only.
    [Tags]    search    city    positive
    Filter Hotels By City    ${city}
    Verify Hotel Results Contains Text    ${city}

TC-2 Filter Hotels By Min Rating
    [Documentation]    Filtering by min rating shows hotels with equal or higher ratings.
    [Tags]    filter    rating    positive
    Filter Hotels By Min Rating    ${min_rating}
    Verify Hotel Results Are Displayed

TC-3 Filter Hotels By Max Price
    [Documentation]    Filtering by max price shows hotels with equal or lower prices.
    [Tags]    filter    price    negative    bug
    Filter Hotels By Max Price    ${max_price}
    Verify Hotel Results Are Displayed
    Verify No Hotel Exceeds Max Price    ${max_price}

TC-4 Filter Hotels By Amenity
    [Documentation]    Filtering by amenity shows hotels that have that amenity.
    [Tags]    filter    amenity    positive
    Filter Hotels By Amenity    ${amenity}
    Verify Hotel Results Contains Text    ${amenity}

TC-5 Sort Hotels By Default
    [Documentation]    Selecting Default sort displays hotels in original order.
    [Tags]    sort    default    positive
    Sort Hotels By Label    ${sort_default}
    Verify Hotel Results Are Displayed

TC-6 Sort Hotels By Price
    [Documentation]    Selecting Price sort orders hotels from lowest to highest price.
    [Tags]    sort    price    positive
    Sort Hotels By Label    ${sort_price}
    Verify Hotel Results Are Displayed

TC-7 Sort Hotels By Rating
    [Documentation]    Selecting Rating sort orders hotels from highest to lowest rating.
    [Tags]    sort    rating    positive
    Sort Hotels By Label    ${sort_rating}
    Verify Hotel Results Are Displayed

TC-8 Pagination Next Button
    [Documentation]    Clicking Next shifts to the next set of hotels.
    [Tags]    pagination    positive
    Verify Hotel Results Are Displayed
    ${page_before}=    Get Current Page Info
    Verify Pagination Next Button Exists
    Click Next Page
    ${page_after}=    Get Current Page Info
    Should Not Be Equal    ${page_before}    ${page_after}
    Click Previous Page

TC-9 Search Non-Existent City
    [Documentation]    Searching for non-existent city displays no results.
    [Tags]    search    city    negative
    Filter Hotels By City    ${non_existent_city}
    Verify No Results Message

TC-10 Search With All Fields Blank
    [Documentation]    Leaving all criteria blank returns the full hotel list.
    [Tags]    search    blank    positive
    Search With All Fields Empty
    Verify Hotel Results Are Displayed
