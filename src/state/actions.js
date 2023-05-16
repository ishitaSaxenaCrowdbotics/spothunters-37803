export function setLoginData(response) {
    return { 
        type: 'SET_AUTH_DETAILS', 
        payload: response
    }
 }

export function setSignupData(response) {
    return { 
        type: 'SET_SIGNUP_DETAILS', 
        payload: response
    }
}

export function tutorialData(response) {
    return { 
        type: 'SET_TUTORIAL_DETAILS', 
        payload: response
    }
}

export function emailVerify(response) {
    return { 
        type: 'SET_EMAIL_VERIFY', 
        payload: response
    }
}

export function reset() {
    return { 
        type: 'RESET', 
    }
}

export function setRememberMeAction() {
    return { 
        type: 'REMEMBER_ME', 
    }
}

export function setParkingSearch(response) {
    return { 
        type: 'SET_PARKING_SEARCH', 
        payload: response
    }
}

export function setParkingSearchByID(response) {
    return { 
        type: 'SET_PARKING_SEARCH_ID', 
        payload: response
    }
}

export function upcomingBookings(response) {
    return { 
        type: 'UPCOMING_BOOKING', 
        payload: response
    }
}

export function prevBookings(response) {
    return { 
        type: 'PREVIOUS_BOOKING', 
        payload: response
    }
}

export function parkingCompHome(response) {
    return { 
        type: 'PARKING_COMP_HOME', 
        payload: response
    }
}

export function filters(response) {
    return { 
        type: 'APPLY_FILTERS', 
        payload: response
    }
}

export function reports(response) {
    return { 
        type: 'REPORTS', 
        payload: response
    }
}

export function managePayments(response) {
    return { 
        type: 'MANAGE_PAYMENT', 
        payload: response
    }
}
