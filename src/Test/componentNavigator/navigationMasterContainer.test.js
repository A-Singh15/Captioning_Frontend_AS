import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NavigationMasterContainer from './navigationMasterContainer.test';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  requesterReducer: {},
  userPermissionReducer: {},
  loadingStatusReducer: {},
  globalsReducer: {
    currentSemester: 'sp20', // Initial value for testing
  },
};
const store = mockStore(initialState);

describe('NavigationMasterContainer', () => {
  it('renders NavigationMasterContainer component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationMasterContainer />
        </MemoryRouter>
      </Provider>
    );

    // Test if the component renders the navigation links
    expect(screen.getByText('Job Manager')).toBeInTheDocument();
    expect(screen.getByText('Add Job')).toBeInTheDocument();
    expect(screen.getByText('iLearn Scraper')).toBeInTheDocument();
    // Add more assertions for other navigation links

    // Test if the semester select dropdown is rendered
    expect(screen.getByLabelText('Semester')).toBeInTheDocument();

    // Test if the logout link is rendered
    expect(screen.getByText('logout')).toBeInTheDocument();
  });

  it('updates semester when select dropdown changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationMasterContainer />
        </MemoryRouter>
      </Provider>
    );

    // Find the semester select dropdown
    const semesterSelect = screen.getByLabelText('Semester');

    // Simulate a user selecting a different semester
    fireEvent.change(semesterSelect, { target: { value: 'fa23' } });

    // Verify that the component's state is updated
    expect(semesterSelect).toHaveValue('fa23');
  });

  it('updates global parameter when semester changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavigationMasterContainer />
        </MemoryRouter>
      </Provider>
    );

    // Find the semester select dropdown
    const semesterSelect = screen.getByLabelText('Semester');

    // Simulate a user selecting a different semester
    fireEvent.change(semesterSelect, { target: { value: 'su22' } });

    // Verify that the Redux store is updated with the new semester
    expect(store.getActions()).toEqual([
      {
        type: 'UPDATE_GLOBAL_PARAM',
        payload: {
          paramName: 'currentSemester',
          paramValue: 'su22',
        },
      },
    ]);
  });

});
