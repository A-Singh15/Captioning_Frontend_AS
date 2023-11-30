import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContentManagerControlContainer from './ContentManagerControlContainer.test';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  videosJobsReducer: {}, // Add your initial state for videosJobsReducer
};
const store = mockStore(initialState);

describe('ContentManagerControlContainer', () => {
  it('renders ContentManagerControlContainer component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ContentManagerControlContainer />
        </MemoryRouter>
      </Provider>
    );

    // Test if the component renders the navigation links
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('Something')).toBeInTheDocument();
    // Add more assertions for other navigation links

    // Test if the VideosContainer component is rendered initially
    expect(screen.getByText('Videos Container Content')).toBeInTheDocument();
    // Modify the assertion based on your VideosContainer content
  });

  it('navigates to VideosContainer when "Videos" link is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/captioning/content-explorer/videos']}>
          <ContentManagerControlContainer />
        </MemoryRouter>
      </Provider>
    );

    // Verify that the VideosContainer component is rendered
    expect(screen.getByText('Videos Container Content')).toBeInTheDocument();
    // Modify the assertion based on your VideosContainer content
  });

});
