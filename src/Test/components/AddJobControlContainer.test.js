import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for testing NavLink
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddJobControlContainer from './AddJobControlContainer';

// Create a mock store for testing
const mockStore = configureStore([]);

describe('AddJobControlContainer', () => {
    let store;

    beforeEach(() => {
        // Initialize a mock store with initial state
        store = mockStore({
            loadingStatusReducer: { /* Your loadingStatusReducer initial state here */ },
            errorsReducer: { /* Your errorsReducer initial state here */ },
            videosJobsReducer: { /* Your videosJobsReducer initial state here */ },
        });
    });

    it('renders the component without errors', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddJobControlContainer />
                </MemoryRouter>
            </Provider>
        );

        // You can add more specific assertions here based on your component's content
        const addJobLink = getByText('Add Job');
        expect(addJobLink).toBeInTheDocument();
    });
});
