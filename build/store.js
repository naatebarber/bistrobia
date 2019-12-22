import { combineReducers } from 'redux';

export const initialState = {
    cart: {
        contents: [],
        total: 0
    },
    account: {
        username: undefined,
        email: undefined,
        signed_in: false,
    }
};

export const loaders = {
    saveState: state => {
        return localStorage.setItem('bistrobia-redux-state', JSON.stringify(state));
    },
    loadState: () => {
        console.log("Loading state from memory...");
        return JSON.parse(localStorage.getItem('bistrobia-redux-state'));
    }
}

const reducers = {
    "cart": (state = initialState.cart, action) => {
        let contents, total;

        switch(action.type) {
            case 'ADD_TO_CART':
                contents = [...state.contents, action.item],
                total = contents.length > 1 
                    ? contents.map(v => v.price).reduce((pv, cv) => cv + pv)
                    : (contents[0] ? contents[0].price : 0);
                return Object.assign({}, state, { contents, total });

            case 'REMOVE_FROM_CART':
                contents = state.contents.filter((v, i) => (i != action.item)),
                total = contents.length > 1 
                    ? contents.map(v => v.price).reduce((pv, cv) => cv + pv)
                    : (contents[0] ? contents[0].price : 0);
                return Object.assign({}, state, { contents, total });

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