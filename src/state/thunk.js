// import { login } from "../utils/service"

// export const loginRequest = (
//     siNumber,
//     callback,
//   ) => async (dispatch) => {
//     const reqModel = {
//       siNumber: siNumber
//     }
//     login(reqModel)
//         .then(response => {
//             if (response) {
//                 dispatch({ type: 'SET_AUTH_DETAILS', payload: response})
//                 callback && callback(true, response)
//             } else {
//                 callback && callback(false)
//             }
//         })
//   }