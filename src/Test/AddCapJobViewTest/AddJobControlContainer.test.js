import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import AddJobControlContainer from './AddJobControlContainer.test';
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
