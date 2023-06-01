import AsyncStorage from "@react-native-async-storage/async-storage";
import { get_auth } from "../../src/utils/service";

const BASE_URL =  'https://parkauthority-37803.botics.co'; // change your BASE_URL in `options/options.js` to edit this value
const token = "Token 3513a72309a0a282a318a7538735238c3859b446"; 
// FIXME: Make this call with Authorization
// Right now there is no login in this module but when this feture will be added
// there will be a user profile added make changes accordingly

// export const set_paymentIntent = async data =>
//   AsyncStorage.setItem(
//     'paymentIntent',
//     data
//   );

// export const get_paymentIntent = async () => JSON.parse(await AsyncStorage.getItem('paymentIntent'));

export const fetchPaymentSheetParams = async (amount) => {
  console.log('pi rq: ', parseFloat(amount) * 100)
  let user = await get_auth();
  const response = await fetch(`${BASE_URL}/modules/payments/payment_sheet/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user?.token}`
    },
    body: JSON.stringify({
      cents: parseFloat(amount) * 100
    })
  });
  console.log('paym: ', response)
  const { paymentIntent, ephemeralKey, customer } = await response.json();
  __DEV__ && console.log("response", { paymentIntent, ephemeralKey, customer });
  return {
    paymentIntent,
    ephemeralKey,
    customer
  };
};

export const fetchPaymentHistory = async () => {
  const response = await fetch(
    `${BASE_URL}/modules/payments/get_payments_history/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }
  );
  const { data } = await response.json();
  return data;
};
