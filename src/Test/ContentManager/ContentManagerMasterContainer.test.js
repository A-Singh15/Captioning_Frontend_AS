import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContentManagerMasterContainer from './ContentManagerMasterContainer.test';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  loadingStatusReducer: {}, // Add your initial state for loadingStatusReducer
  errorsReducer: {}, // Add your initial state for errorsReducer
  videosJobsReducer: {}, // Add your initial state for videosJobsReducer
};
const store = mockStore(initialState);

describe('ContentManagerMasterContainer', () => {
  it('renders ContentManagerMasterContainer component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentManagerMasterContainer />
        </MemoryRouter>
      </Provider>
    );

    // Test if the ContentManagerControlContainer is rendered within ContentManagerMasterContainer
    expect(screen.getByText('Videos')).toBeInTheDocument();
    // Modify the assertion based on your ContentManagerControlContainer content

  });

});
