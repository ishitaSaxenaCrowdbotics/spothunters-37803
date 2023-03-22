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