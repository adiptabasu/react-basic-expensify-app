import React from 'react';
import { shallow } from 'enzyme';
import { test, expect } from '@jest/globals'
import { LoginPage } from '../../components/LoginPage';

test('should correctly render the login page', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});