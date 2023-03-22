import { emailVerify, setLoginData, setSignupData, tutorialData } from "../state/actions";

export const loginRequest = (loginData) => async (dispatch) => {
    const requestUrl = ['POST', `${BASE_API_URL}/login/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(loginData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(setLoginData(json.data))
    return json
}

export const signUpRequest = (loginData) => async (dispatch) => {
  console.log('request: ', loginData)
    const requestUrl = ['POST', `${BASE_API_URL}/signup/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(loginData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(setSignupData(json.data))
    return json
}

export const tutorialRequest = () => async (dispatch) => {
    const requestUrl = ['GET', `${BASE_API_URL}/onboarding/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
    });
    let json = await response.json();
    console.log('response: ', json)
    dispatch(tutorialData(json))
    return json
}

export const verifyEmailRequest = (loginData) => async (dispatch) => {
  console.log('request: ', loginData)
    const requestUrl = ['POST', `${BASE_API_URL}/verify/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(loginData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(emailVerify(json.data))
    return json
}