import { SIGNUP_ACTION_TYPES, LOGIN_ACTION_TYPES } from '../Actions/ActionTypes'

const INITIAL_STATE = {
    isLoading: false,
    formError: null,
    successMessage: null,
    notification_count: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //signup Case
        case SIGNUP_ACTION_TYPES.SIGNUP_REQUEST:
            return { ...state, isLoading: true }
        case SIGNUP_ACTION_TYPES.SIGNUP_REQUEST_FAIL:
            return { ...state, isLoading: false, formError: action.payload.formError, sucessMessage: null }
        case SIGNUP_ACTION_TYPES.SIGNUP_REQUEST_SUCCESS:
            return {
                ...state, isLoading: false, formError: null, successMessage: 'Successfully Signup',
                successMessage: action.payload.successMessage
            }

        case 'NOTIFICATION_COUNT':
            return { ...state, notification_count: action.notification_count }


        //login Case 
        case LOGIN_ACTION_TYPES.LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case LOGIN_ACTION_TYPES.LOGIN_REQUEST_FAIL:
            return { ...state, isLoading: false, formError: action.payload.formError, user: null }
        case LOGIN_ACTION_TYPES.LOGIN_REQUEST_SUCCESS:
            return { ...state, isLoading: false, formError: null, user: action.payload.user, successMessage: 'Successfully Login', }
        //clear message  
        case LOGIN_ACTION_TYPES.CLEAR_MESSAGE:
            return { ...state, isLoading: false, formError: null, successMessage: '' }

        //logout Case 
        case LOGIN_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS:
            return { ...state, isLoading: false, formError: null, user: null }

        default:
            return state;
    }
}