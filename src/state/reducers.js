const initialState = {
  userData: {},
  token: '',
  data: {},
  tutorial: [],
  emailVerify: {}
}
const SpotHunterReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'SET_AUTH_DETAILS':
        return {
            ...state,
            userData: action.payload?.user,
            token: action.payload?.token
        }
        case 'SET_SIGNUP_DETAILS':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_TUTORIAL_DETAILS':
            return {
                ...state,
                tutorial: action.payload
            }
        case 'SET_EMAIL_VERIFY':
            return {
                ...state,
                emailVerify: action.payload
            }
        default:
        return state
    }
}
export default SpotHunterReducer
