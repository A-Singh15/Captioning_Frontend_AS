import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CanvasCourseLoadingContainer from './CanvasCourseLoadingContainer';  // Adjust the path based on your project structure

const mockStore = configureMockStore();

describe('CanvasCourseLoadingContainer', () => {
    let store;

    beforeEach(() => {
        // Mock the Redux store with the initial state
        store = mockStore({
            iLearnVideoReducer: {},
            loadingStatusReducer: {
                iLearnVideosLoading: false,
            },
            coursesReducer: {
                // Mock your coursesReducer state here
            },
            // Add other reducers as needed
        });
    });

    test('renders CanvasCourseLoadingContainer component', () => {
        const { container } = render(
            <Provider store={store}>
                <CanvasCourseLoadingContainer />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    test('renders loading state when iLearnVideosLoading is true', () => {
        // Set iLearnVideosLoading to true in the Redux store
        store = mockStore({
            ...store.getState(),
            loadingStatusReducer: {
                iLearnVideosLoading: true,
            },
        });

        const { getByText } = render(
            <Provider store={store}>
                <CanvasCourseLoadingContainer />
            </Provider>
        );

        expect(getByText('Videos Loading')).toBeInTheDocument();
    });

    test('renders course information when iLearnVideosLoading is false', () => {
        const { getByText } = render(
            <Provider store={store}>
                <CanvasCourseLoadingContainer />
            </Provider>
        );

        expect(getByText('Course:')).toBeInTheDocument();
        expect(getByText('Videos Loading')).toBeInTheDocument();
    });

    // Add more test cases as needed for other component functionalities
});
