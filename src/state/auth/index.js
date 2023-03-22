// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const loginRequest = createAsyncThunk(
//   'loginRequest',
//   async (data, { dispatch }) => {
//     console.log('make_request : ', data)
//     const requestUrl = ['POST', `${BASE_API_URL}/login/`];
//     // logApiRequest('order-request/request', requestUrl, data);
//     let response = await fetch(requestUrl[1], {
//       method: requestUrl[0],
//       headers: {
//         'Content-type': 'application/json',
//         accept: 'application/json',
//         // Authorization: `Token ${user.token}`
//       },
//       body: JSON.stringify(data)
//     });
//     console.log('loginRequest response : ', response)
//     // logApiResponse('order-request/request', response);
//     return response.json();
//   },
//   {
//     dispatchConditionRejection: true
//   }
// );

// export const signUpRequest = createAsyncThunk(
//     'signUpRequest',
//     async (data, { dispatch }) => {
//       console.log('make_request : ', data)
//       const requestUrl = ['POST', `${BASE_API_URL}/signup/`];
//       // logApiRequest('order-request/request', requestUrl, data);
//       let response = await fetch(requestUrl[1], {
//         method: requestUrl[0],
//         headers: {
//           'Content-type': 'application/json',
//           accept: 'application/json',
//         //   Authorization: `Token ${user.token}`
//         },
//         body: JSON.stringify(data)
//       });
//       console.log('signUpRequest response : ', response)
//       // logApiResponse('order-request/request', response);
//       return response.json();
//     },
//     {
//       dispatchConditionRejection: true
//     }
//   );

// export const auth_requests = createSlice({
//   name: 'auth-requests',
//   initialState: {
//     loading: false,
//     error: [],
//     success: [],
//     token: {},
//     user: {}
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(loginRequest.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(loginRequest.fulfilled, (state, action) => {
//         logReduxReducerSuccess('loginRequest', action.payload);
//         state.token = action.payload;
//         state.user = action.payload?.data?.user;
//         state.loading = false;
//       })
//       .addCase(loginRequest.rejected, (state, action) => {
//         logReduxReducerFailure('loginRequest', action.error);
//         state.loading = false;
//       });
//     builder
//         .addCase(signUpRequest.pending, (state, action) => {
//         state.loading = true;
//         })
//         .addCase(signUpRequest.fulfilled, (state, action) => {
//         logReduxReducerSuccess('signUpRequest', action.payload);
//         state.loading = false;
//         })
//         .addCase(signUpRequest.rejected, (state, action) => {
//         logReduxReducerFailure('signUpRequest', action.error);
//         state.loading = false;
//     });
//   }
// });
