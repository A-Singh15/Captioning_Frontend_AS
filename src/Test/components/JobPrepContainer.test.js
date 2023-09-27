// Test File for JobPrepContainer.js
// This file contains the tests for the JobPrepContainer component.
//Tested with Jest and Enzyme
// createTransaction, createListTransaction, clearTransaction, and finalizeTransaction functions in our JobPrepContainer component testing
// unsure of the reddex usage
// In-Progress


import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import JobPrepContainer from 'src/components/AddCapJobView/JobPrepContainer.js';

const mockStore = configureStore([]);
const initialState = {
    mediaSearchReducer: {},
    errorsReducer: {},
    tempJobsFormReducer: {},
    loadingStatusReducer: {},
    tempFormDataReducer: {},
};

describe('JobPrepContainer', () => {
    // ... Other test cases ...

    it('handles createTransaction function', () => {
        const store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <JobPrepContainer />
                </MemoryRouter>
            </Provider>
        );

        const addButton = getByText('Add Single Request');
        fireEvent.click(addButton);

        // Verify that the state has been updated as expected
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'ADD_TEMP_JOB', // Replace with the actual action type
            payload: {
                // Replace with the expected payload (in this case, the payload is an object i think?
            },
        });
        expect(actions).toContainEqual({
            type: 'UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE', // Replace with main actual action type
            payload: 'single', // Replace with the expected payload (in this case, the payload is a string)?
        });
        expect(actions).toContainEqual({
            type: 'UPDATE_TRANSACTION_ID', // Replace with given actual action type?
            payload: {
                transaction_id: expect.any(String), // Transaction ID should be a string
            },
        });
    });

    it('handles createListTransaction function', () => {
        const store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <JobPrepContainer />
                </MemoryRouter>
            </Provider>
        );

        const addButton = getByText('Add From Playlist');
        fireEvent.click(addButton);

        // Verify that the state has been updated as expected
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE', // Replace with the actual action type
            payload: 'list', // Replace with the expected payload
        });
    });

    it('handles clearTransaction function', () => {
        const store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <JobPrepContainer />
                </MemoryRouter>
            </Provider>
        );

        const clearButton = getByText('Clear');
        fireEvent.click(clearButton);

        // Verify that the state has been updated as expected
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'CLEAR_INCOMPLETE_TEMP_CAP_JOBS', // Replace with the actual action type
        });
        expect(actions).toContainEqual({
            type: 'CLEAR_MEDIA_SEARCH', // Replace with the actual action type
            payload: expect.any(String), // Transaction ID should be a string
        });
        expect(actions).toContainEqual({
            type: 'REMOVE_ERROR_STATE', // Replace with the actual action type
            payload: expect.any(String), // Transaction ID should be a string
        });
        expect(actions).toContainEqual({
            type: 'CLEAR_FORM_DATA', // Replace with the actual action type
        });
    });

    it('handles finalizeTransaction function', () => {
        const store = mockStore(initialState);
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <JobPrepContainer />
                </MemoryRouter>
            </Provider>
        );

        const addButton = getByText('Add Single Request');
        fireEvent.click(addButton);

        const finalizeButton = getByText('Finalize Transaction');
        fireEvent.click(finalizeButton);

        // Verify that the state has been updated as expected- in-progress
        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'COMPLETE_TEMP_JOB', // What is th actual action type
            payload: {


                //  expected payload?





            },
        });
    });
});
