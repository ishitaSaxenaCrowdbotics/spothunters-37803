// Please, update the values below as instructed in the README.md file.
export const GOOGLE_WEB_CLIENT_ID = "993169876801-92aink9vca20s5ver7bj9uapbmlkgia1.apps.googleusercontent.com";
export const GOOGLE_IOS_CLIENT_ID = "993169876801-4vbfjstkloq1h0t25k403a7ig200m8ml.apps.googleusercontent.com";
export const APPLE_SERVICE_ID = "com.spotHunter.web";
export const APPLE_REDIRECT_CALLBACK =
  "https://parkauthority-37803.botics.co/accounts/apple/login/callback/";

// -----------------------------------------------------
const messageMap = {
  "Request failed with status code 400": {
    code: 400,
    message: "Invalid credentials."
  },
  "Request failed with status code 403": {
    code: 403,
    message: "You do not have access to this resource."
  },
  "Request failed with status code 500": {
    code: 500,
    message: "Unexpected Server Error."
  },
  "Network Error": {
    code: null,
    message:
      "Network Error: It was not possible to establish a connection with the server."
  }
};

export const mapErrorMessage = error => {
  const message = error.message;
  return messageMap[message]
    ? { ...messageMap[message] }
    : { code: null, message };
};
