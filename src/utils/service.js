import { managePayments, parkingCompHome, prevBookings, reports, setLoginData, setParkingSearch, setParkingSearchByID, setSignupData, tutorialData, upcomingBookings } from "../state/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const set_auth = async data =>
  AsyncStorage.setItem(
    'auth',
    JSON.stringify(
      Object.assign({}, JSON.parse(await AsyncStorage.getItem('auth')), data)
    )
  );

export const get_auth = async () => JSON.parse(await AsyncStorage.getItem('auth'));

export const loginRequest = (reqData) => async (dispatch) => {
  console.log('req: ', reqData)
  let statusCode
    const requestUrl = ['POST', `${BASE_API_URL}/login/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(reqData)
    }).then(response => { 
      statusCode = response.status
      return response });
    let json = await response.json();
    json.data={
      ... json.data,
      statusCode
    }
    console.log('statusCode json data: ', json.data)
    dispatch(setLoginData(json.data))
    set_auth(Object.assign({}, json.data));
    return json
}

export const googleLoginRequest = (reqData) => async (dispatch) => {
  console.log('req: ', reqData)
  let statusCode
    const requestUrl = ['POST', `${API_URL}/modules/social-auth/google/login/`];
    console.log('url: ', requestUrl)
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(reqData)
    }).then(response => { 
      statusCode = response.status
      return response });
    let json = await response.json();
    json.data={
      ... json.data,
      statusCode
    }
    console.log('statusCode json data: ', json.data)
    dispatch(setLoginData(json.data))
    set_auth(Object.assign({}, json.data));
    return json
}

export const signUpRequest = (reqData) => async (dispatch) => { //400: already registered
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/signup/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(reqData)
    }).then(response => { 
      statusCode = response.status
      return response });
    let json = await response.json();
    json.data={
      ... json.data,
      statusCode
    }
    console.log('statusCode json data: ', json.data)
    dispatch(setSignupData(json.data))
    set_auth(Object.assign({}, json.data));
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
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    dispatch(setLoginData(json.data))
    set_auth(Object.assign({}, json.data));
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

export const proceedGuestRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/proceed-as-guest/`];
    console.log('requestUrl: ', requestUrl)
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    // dispatch(setLoginData(json.data))
    // set_auth(Object.assign({}, json.data));
    return json
}

export const resendCodeRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${BASE_API_URL}/re-send-otp/`];
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(reqData)
    });
    let json = await response.json();
    console.log('response: ', json.data)
    return json
}


export const parkingSearchRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
  let responseData = null
  const baseUrl = `${API_URL}/parking/api/v1/search/`
  const reqUrl = `${baseUrl}?${reqData?.is_airport ? 'is_airport=true' : ''}${reqData?.places_working_time__start_time__gte ? `&places_working_time__start_time__gte=${reqData?.places_working_time__start_time__gte}` : ''}${reqData?.places_working_time__end_time__lte ? `&places_working_time__end_time__lte=${reqData?.places_working_time__end_time__lte}` : ''}${reqData?.places_working_time__day ? `&places_working_time__day=${reqData?.places_working_time__day}` : ''}${reqData?.availability ? `&availability=${reqData?.availability}` : ''}`
  const url = reqData ? reqUrl : baseUrl

  const requestUrl = ['GET', url];
  console.log('requestUrl: ', requestUrl)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
    },
  })
  let json = await response.json();
  console.log('response: ', json)
  dispatch(setParkingSearch(json))
  return json
}

export const parkingSearchListRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
  let responseData = null
  const baseUrl = `${API_URL}/parking/api/v1/search-spots/`
  const reqUrl = `${baseUrl}?${reqData?.is_airport ? 'is_airport=true' : ''}${reqData?.best_price ? `&best_price=${reqData?.best_price}` : ''}${reqData?.closest ? `&closest=${reqData?.closest}` : ''}${reqData?.weighted ? `&weighted=${reqData?.weighted}` : ''}${reqData?.availability ? `availability=${reqData?.availability}` : ''}${reqData?.start ? `&start=${reqData?.start}` : ''}${reqData?.end ? `&end=${reqData?.end}` : ''}${reqData?.day ? `&day=${reqData?.day}` : ''}${reqData?.g_location ? `&g_location=${reqData?.g_location}` : ''}`
  const url = reqData ? reqUrl : baseUrl

  const requestUrl = ['GET', url];
  console.log('requestUrl: ', requestUrl)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
    },
  })
  let json = await response.json();
  console.log('response: ', json)
  dispatch(setParkingSearch(json))
  return json
}

export const parkingSearchByIDRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['GET', `${API_URL}/parking/api/v1/parking-spot-detail/${reqData}/`];
    let user = await get_auth();
    console.log('requestUrl: ', requestUrl)
    let response = await fetch(requestUrl[1], {
      method: requestUrl[0],
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Token ${user?.token}`
      },
    });
    let json = await response.json();
    console.log('response: ', json)
    dispatch(setParkingSearchByID(json))
    return json
}

export const rateReviewRequest = (reqData) => async (dispatch) => {
  console.log('request: ', reqData)
    const requestUrl = ['POST', `${API_URL}/parking/api/v1/place-rate-review/`];
    console.log('req url: ', requestUrl)
    let user = await get_auth();
    console.log('token: ', user?.token)
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
    console.log('response: ', json)
    return json
}

export const getQr = async (data) => {
  try {
    const response = await fetch(`${API_URL}/modules/qr-code/qrcode/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error("NETWORK_ERROR").message;
  }
};

export const previousBookingRequest = (reqData) => async (dispatch) => {
  const requestUrl = reqData ? ['GET', `${API_URL}/parking/api/v1/previous-booking/?search=${reqData}`] : ['GET', `${API_URL}/parking/api/v1/previous-booking/`]
  console.log(requestUrl)
  let user = await get_auth()
  console.log('token: ', user?.token)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
  });
  let json = await response.json();
  console.log('response: ', json)
  dispatch(prevBookings(json))
  return json
}

export const upcomingBookingRequest = () => async (dispatch) => {
  const requestUrl = ['GET', `${API_URL}/parking/api/v1/upcoming-booking/`];
  let user = await get_auth()
  console.log('token: ', user?.token)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
  });
  let json = await response.json();
  console.log('response: ', json)
  dispatch(upcomingBookings(json))
  return json
}

export const ParkingCompHomeRequest = (reqData) => async (dispatch) => {
  const requestUrl = reqData ? ['GET', `${API_URL}/parking/api/v1/parkcomp-home/?search=${reqData?.search ? reqData?.search : ''}&date=${reqData?.date ? reqData?.date : ''}`] : ['GET', `${API_URL}/parking/api/v1/parkcomp-home/`]
  console.log('requestUrl: ', requestUrl)
  let user = await get_auth();
  console.log('user?.token: ', user?.token)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
  });
  let json = await response.json();
  console.log('response: ', json)
  dispatch(parkingCompHome(json))
  return json
}

export const checkInRequest = (data) => async (dispatch) => {
  const reqData = {
    verified: true
  }
  const requestUrl = ['PATCH', `${API_URL}/parking/api/v1/parkcomp-home/${data}/`];
  console.log('requestUrl: ', requestUrl)
  console.log('user?.token: ', user?.token)
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
  console.log('response: ', json)
  // dispatch(parkingCompHome(json))
  return json
}

export const reportRequest = (reqData) => async (dispatch) => {
  const requestUrl = reqData ? ['GET', `${API_URL}/parking/api/v1/parkcomp-report/?search=${reqData?.search ? reqData?.search : ''}&start_date=${reqData?.start_date ? reqData?.start_date : ''}&end_date=${reqData?.end_date ? reqData?.end_date : ''}&last_week=${reqData?.last_week ? reqData?.last_week : ''}&last_month=${reqData?.last_month ? reqData?.last_month : ''}`] : ['GET', `${API_URL}/parking/api/v1/parkcomp-report/`]
  console.log(requestUrl)
  let user = await get_auth()
  console.log('token: ', user?.token)
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
  });
  let json = await response.json();
  console.log('response: ', json)
  dispatch(reports(json))
  return json
}

export const bookSpotRequest = (data) => async (dispatch) => {
  const requestUrl = ['POST', `${API_URL}/parking/api/v1/book-spot/`];
  console.log('requestUrl: ', requestUrl)
  let user = await get_auth();
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
    body: JSON.stringify(data)
  });
  let json = await response.json();
  console.log('response: ', json)
  // dispatch(parkingCompHome(json))
  return json
}

export const modifySpotRequest = (data, id) => async (dispatch) => {
  const requestUrl = ['PATCH', `${API_URL}/parking/api/v1/book-spot/${id}/`];
  console.log('requestUrl: ', requestUrl)
  let user = await get_auth();
  let response = await fetch(requestUrl[1], {
    method: requestUrl[0],
    headers: {
      'Content-type': 'application/json',
      accept: 'application/json',
      Authorization: `Token ${user?.token}`
    },
    body: JSON.stringify(data)
  });
  let json = await response.json();
  console.log('response: ', json)
  // dispatch(parkingCompHome(json))
  return json
}

export const managePaymentRequest = (reqData) => async (dispatch) => {
  const requestUrl = reqData ? ['GET', `${API_URL}/user/api/v1/manage-payment/?search=${reqData?.search ? reqData?.search : ''}&start_date=${reqData?.start_date ? reqData?.start_date : ''}&end_date=${reqData?.end_date ? reqData?.end_date : ''}`] : ['GET', `${API_URL}/user/api/v1/manage-payment/`]
    // const requestUrl = ['GET', `${API_URL}/user/api/v1/manage-payment/`];
    console.log('requestUrl: ', requestUrl)
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
    console.log('response: ', json)
    dispatch(managePayments(json))
    return json
}

 export const downloadReportRequest = (reqData) => async (dispatch) => {
   const requestUrl = reqData ? ['GET', `${API_URL}/user/api/v1/manage-payment/generate-pdf-report/?search=${reqData?.search ? reqData?.search : ''}&start_date=${reqData?.start_date ? reqData?.start_date : ''}&end_date=${reqData?.end_date ? reqData?.end_date : ''}`] : ['GET', `${API_URL}/user/api/v1/manage-payment/generate-pdf-report/`]
      // const requestUrl = ['GET', `${API_URL}/user/api/v1/manage-payment/`];
     console.log('requestUrl: ', requestUrl)
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
    console.log('response: ', json)
    const blob = new Blob([resp], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "example.pdf"
    a.click()
    URL.revokeObjectURL(url)
        // return json
 }
