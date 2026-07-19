*** Variables ***
# Search Form Inputs
${SEARCH_CITY_INPUT}         id=city
${SEARCH_MIN_RATING_INPUT}   id=minRating
${SEARCH_MAX_PRICE_INPUT}    id=maxPrice
${SEARCH_AMENITY_SELECT}     id=amenity
${SEARCH_SORT_BY_SELECT}     id=sortBy
${SEARCH_SUBMIT_BTN}         xpath=//button[contains(text(), 'Search Hotels')]

# Results
${HOTELS_LIST_CONTAINER}     id=hotelsList
${HOTEL_CARD}                css=.hotel-card

# Pagination
${PAGINATION_INFO}           id=hotelsPageInfo
${PAGINATION_NEXT_BTN}       id=nextHotelsBtn
${PAGINATION_PREV_BTN}       id=prevHotelsBtn
