import {createReducer} from 'redux-act';

const defaultsState = {
    loading: false,
    request: null,
    data: null,
    error: null
};

function reducerFormater(actionAsync, defaultsState) {
    return {
        [actionAsync.request]: (state, payload) => ({
            ...state,
            request: payload,
            loading: true,
            error: null
        }),
        [actionAsync.ok]: (state, payload) => ({
            ...state,
            loading: false,
            data: payload.response
        }),
        [actionAsync.error]: (state, payload) => ({
            ...state,
            loading: false,
            error: payload.error
        }),
        [actionAsync.reset]: () => (defaultState)
    };
}

export default function createREducerAsync(actionAsync, defaultsState = defaultsState) {
    if (toString.call(actionAsync) === '[object Array]') {
        const arr = actionAsync.reduce((acc, cur, index) => {
            let accReducer = acc;
            if (index === 1) {
                accReducer = reducerFormater(acc, defaultsState);
            }
            const curReducer = reducerFormater(cur, defaultsState);
            return Object.assign(accReducer, curReducer);
        });
        return createReducer(arr, defaultsState);
    }
    return createReducer(reducerFormater(actionAsync, defaultsState));
}
