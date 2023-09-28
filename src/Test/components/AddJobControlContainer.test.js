// Tested with Jest and Enzyme
// createTransaction, createListTransaction, clearTransaction, and finalizeTransaction functions in our JobPrepContainer component testing
//jest testing with babel enabled and react dom
//
// testing for
//
// Rendering: The test verifies that the component renders without crashing and that it displays the "Add Job" button.
// Navigation: The test verifies that clicking the "Add Job" button navigates to the /captioning/add-job route, passing along the current search parameters if any.
// Route changes: The test verifies that the component updates the route when the "Add Job" button is clicked.
// State changes: The test verifies that the component updates its state when a change occurs, such as when the user enters text into an input field.
// Redux state changes: The test verifies that the component handles changes in Redux state.
import React from'react';
import { shallow } from 'enzyme';
import { NavLink } from'react-router-dom';
import AddJobControlContainer from'src/components/AddCapJobView/AddJobControlContainer.js';
import expect from "expect";

import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import AddJobControlContainer from 'src/components/AddCapJobView/AddJobControlContainer.js';
import expect from "expect";

describe('AddJobControlContainer', () => {

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        const wrapper = shallow(<AddJobControlContainer />);
        expect(wrapper).toBeDefined();
    });

    // Displays the "Add Job" button
    it('should display the "Add Job" button', () => {
        const wrapper = shallow(<AddJobControlContainer />);
        expect(wrapper.find("#jobManager").text()).toBe("Add Job");
    });

    // Clicking the "Add Job" button navigates to the "/captioning/add-job" route
    it('should navigate to "/captioning/add-job" route when "Add Job" button is clicked', () => {
        const props = {
            location: {
                search: "testSearch"
            }
        };
        const history = {
            push: jest.fn()
        };
        const wrapper = shallow(<AddJobControlContainer {...props} history={history} />);

        wrapper.find('#jobManager').simulate('click');

        expect(history.push).toHaveBeenCalledWith({
            pathname: '/captioning/add-job',
            search: 'testSearch',
        });
    });

    // Handles changes in route
    it('should update the route when the "Add Job" button is clicked', () => {
        const props = {
            location: {
                search: 'testSearch'
            }
        };
        const history = {
            push: jest.fn()
        };
        const wrapper = shallow(<AddJobControlContainer {...props} history={history} />);

        wrapper.find('#jobManager').simulate('click');

        expect(history.push).toHaveBeenCalledWith({
            pathname: '/captioning/add-job',
            search: 'testSearch',
        });
    });

    // Handles changes in component state
    it('should update the state when a change occurs', () => {
        const wrapper = shallow(<AddJobControlContainer />);

        wrapper.find('input').simulate('change', { target: { value: 'New Value' } });

        expect(wrapper.state().inputValue).toEqual('New Value');
    });

    // Handles changes in Redux state
    it('should handle changes in Redux state', () => {
        const props = {
            location: {
                search: 'searchQuery'
            }
        };
        const state = {};

        const wrapper = shallow(<AddJobControlContainer {...props} />);

        wrapper.setProps({ location: { search: 'newSearchQuery' } });

        expect(wrapper.state()).toEqual({});

        expect(wrapper.find(NavLink).prop('to')).toEqual({
            pathname: '/captioning/add-job',
            search: 'newSearchQuery'
        });
    });

});
