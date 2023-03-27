import { emailVerify, setLoginData, setSignupData, tutorialData } from "../state/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_auth = async data =>
  AsyncStorage.setItem(
    'auth',
    JSON.stringify(
      Object.assign({}, JSON.parse(await AsyncStorage.getItem('auth')), data)
    )
  );

export const get_auth = async () =>
  JSON.parse(await AsyncStorage.getItem('auth'));

export const loginRequest = (reqData) => async (dispatch) => {
  console.log('req: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/login/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(setLoginData(json.data))
    set_auth(Object.assign({}, json.data));
    return json
}

export const signUpRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/signup/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
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

export const verifyEmailRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/verify/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(emailVerify(json.data))
    return json
}

export const forgotPasswordRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/forgot-password/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        // Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const feedBackRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/feedback/`];
    let user = await get_auth();
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const sendLinkRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/feedback/`];
    let user = await get_auth();
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const inviteFriendRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/invite-friend/`];
    let user = await get_auth();
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const logoutRequest = () => async (dispatch) => {
    const requestUrl = ['POST', `${API_URL}/user/api/v1/logout/`];
    let user = await get_auth();
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const deleteAccountRequest = () => async (dispatch) => {
  let user = await get_auth();
  console.log('request: ', user.user.id)
    const requestUrl = ['DELETE', `${API_URL}/user/api/v1/remove-account/${user.user.id}/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}

export const changePasswordRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    let user = await get_auth();
    const requestUrl = ['PUT', `${API_URL}/user/api/v1/change-password/${user.user.id}/`];
    console.log('requestUrl: ', requestUrl)
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}