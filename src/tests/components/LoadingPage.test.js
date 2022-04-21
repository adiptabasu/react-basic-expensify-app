import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';
import { expect } from '@jest/globals';

test('should correctly rnder the loading page', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
})
