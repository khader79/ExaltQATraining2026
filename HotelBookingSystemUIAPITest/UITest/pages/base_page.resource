*** Settings ***
Library    SeleniumLibrary
Resource   ../config/env.resource

*** Keywords ***
Open Hotel Application
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window

Close Hotel Application
    Close All Browsers
