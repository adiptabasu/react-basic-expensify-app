const expencesReducerDefaultState = [];
const expencesReducer = (state = expencesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            // console.log(action.expense)
            // return state.concat(action.expense);
            return [...state, action.expense];
            break;
        }
        case 'REMOVE_EXPENSE': {
            return state.filter((expense) => expense.id != action.id);
            break;
        }
        case 'EDIT_EXPENSE': {
            return state.map((expense) => {
                if (expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else {
                    return expense;
                }
            })
            break;
        }
        default: {
            return state;
            break;
        }
    }
};

export default expencesReducer;