import { test, expect } from '@jest/globals'
import React from 'react';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json'
import Header from '../../components/Header';
// test('should render header correctly', () => {
//     const renderer = new ReactShallowRenderer();
//     renderer.render(<Header />);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();
// });

test('should render the header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    //toJSON is not needed, as it is configured to snap in jest.config.json
    // expect(toJSON(wrapper)).toMatchSnapshot();
}); 
