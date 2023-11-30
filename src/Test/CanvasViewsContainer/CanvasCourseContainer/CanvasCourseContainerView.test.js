import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CanvasCourseContainer from './CanvasCourseContainer';  // Adjust the path based on your project structure

const mockStore = configureMockStore();

describe('CanvasCourseContainer', () => {
    let store;

    beforeEach(() => {
        // Mock the Redux store with the initial state
        store = mockStore({
            loadingStatusReducer: {
                coursesLoading: false,
                iLearnVideosLoading: false,
            },
            coursesReducer: {
                // Mock your coursesReducer state here
            },
            // Add other reducers as needed
        });
    });

    test('renders CanvasCourseContainer component', () => {
        const { container } = render(
            <Provider store={store}>
                <CanvasCourseContainer />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    test('handles input change correctly', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <CanvasCourseContainer />
            </Provider>
        );

        // Example: Trigger a checkbox change
        fireEvent.click(getByLabelText('Ignore Course'));

        // Add assertions based on your component's behavior
        // For example, check if the Redux store state is updated as expected
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: 'UPDATE_COURSE',  // Replace with your actual action type
                payload: {
                    // Add expected payload properties
                },
            },
        ]);
    });

    // Add more test cases as needed for other component functionalities/functionsbenchmarks
});
