module.exports = {
    preloadedState: {
        redux: true
    },
    reducer: (state = {}, action) => {
        switch(action.type) {
            case "TOGGLE": 
                return Object.assign({}, state, {
                    redux: !state.redux
                })
            default: return state;
        }
    }
}