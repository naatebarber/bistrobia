import { combineReducers } from 'redux';

export const initialState = {
    cart: {
        contents: []
    },
    account: {
        username: undefined,
        email: undefined,
        signed_in: false,
    }
};

const reducers = {
    "cart": (state = initialState.cart, action) => {
        switch(action.type) {
            case 'ADD_TO_CART':
                return Object.assign({}, state, {
                    contents: [...state.contents, action.item]
                });
            default: return state;
        }
    },
    "account": (state = initialState.account, action) => {
        return state;
    }
}

export const combinedReducers = combineReducers({
    cart: reducers.cart,
    account: reducers.account
});