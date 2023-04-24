const initialState = {
  userData: {},
  token: '',
  data: {},
  tutorial: [],
  emailVerify: {},
  rememberMe: false,
  parkingSearchList: [],
  parkingPlace: {}
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
        case 'REMEMBER_ME':
            return {
                ...state,
                rememberMe: true
            }
        case 'RESET':
            return {
                userData: {},
                token: '',
                data: {},
                tutorial: [],
                emailVerify: {}
            }
        case 'SET_PARKING_SEARCH':
            return {
                ...state,
                parkingSearchList: action.payload
                
            }

        case 'SET_PARKING_SEARCH_ID':
            return {
                ...state,
                parkingPlace: action.payload
            }
        
        default:
        return state
    }
}
export default SpotHunterReducer
