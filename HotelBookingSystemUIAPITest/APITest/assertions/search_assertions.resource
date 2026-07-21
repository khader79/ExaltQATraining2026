*** Settings ***
Library    Collections
Resource    ../base.resource

*** Keywords ***
Verify Default Hotels Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    ${json}=    Set Variable    ${response.json()}
    Should Be Equal As Numbers    ${json}[page]    1
    Verify Response List Not Empty    ${response}    hotels

Verify Filtered By Field
    [Arguments]    ${response}    ${field}    ${value}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${hotel}    IN    @{hotels}
        Should Be Equal    ${hotel}[${field}]    ${value}
    END

Verify Filtered By Amenity
    [Arguments]    ${response}    ${amenity}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${hotel}    IN    @{hotels}
        List Should Contain Value    ${hotel}[amenities]    ${amenity}
    END

Verify Filtered By Max Price
    [Arguments]    ${response}    ${max_price}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${hotel}    IN    @{hotels}
        Should Be True    ${hotel}[pricePerNight] <= ${max_price}
    END

Verify Filtered By Min Rating
    [Arguments]    ${response}    ${min_rating}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${hotel}    IN    @{hotels}
        Should Be True    ${hotel}[rating] >= ${min_rating}
    END

Verify Page Number
    [Arguments]    ${response}    ${page}
    Verify Status Code    ${response}    ${STATUS_OK}
    Should Be Equal As Numbers    ${response.json()}[page]    ${page}

Verify Empty Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response List Empty    ${response}    hotels
