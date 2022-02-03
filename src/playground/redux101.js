import { createStore } from 'redux';

//Action Generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count = 0 } = {}) => ({
    type: 'SET',
    count
});

const reset = () => ({ type: 'RESET' });


//Reducer
//1.Is a pure function
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': {
            return { count: state.count + action.incrementBy };
            break;
        }
        case 'DECREMENT': {
            return { count: state.count - action.decrementBy };
            break;
        }
        case 'SET': {
            return { count: action.count };
            break;
        }
        case 'RESET': {
            return { count: 0 };
            break;
        }
        default: {
            return state;
            break;
        }
    }
    // if (action.type == 'INCREMENT') {
    //     return { count: state.count + 1 };
    // }
    // else {
    //     return state;
    // }
};
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log('Inside subscibe');
    console.log(store.getState());
})
// unsubscribe();

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(incrementCount());
store.dispatch(decrementCount({ decrementBy: 3 }));
store.dispatch(decrementCount());
store.dispatch(reset());
store.dispatch(setCount({ count: 101 }));
