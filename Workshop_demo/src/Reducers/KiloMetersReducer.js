import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = {
    kilometersList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_KILOMETERS_LIST':
            return { ...state, kilometersList: action.kilometers }

        case REHYDRATE: {
            //  console.log(action.payload ,"useruseruseruseruseruseruseruseruseruser")
            return { ...state, ...action.payload.kilometers }
        }
        default:
            return state;
    }

}