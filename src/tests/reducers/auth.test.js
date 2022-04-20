import { test, expect } from '@jest/globals';
import authReducer from '../../reducers/auth';

test('should test uid for login', () => {
    const action = { type: 'LOGIN', uid: 'abc' };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
    const action = { type: 'LOGOUT' };
    const state = authReducer({ uid: 'anydata' }, action);
    // console.log(state);
    expect(state).toEqual({});
});
