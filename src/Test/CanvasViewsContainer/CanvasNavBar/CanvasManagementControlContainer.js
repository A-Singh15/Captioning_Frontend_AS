import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {NavLink, Route, Switch,} from "react-router-dom";
import CanvasAllCoursesView from "../CanvasViewContainers/CanvasAllCoursesView";
import CanvasNewJobView from "../CanvasNewVideosContainer/CanvasNewJobsView";
import moment from "moment";


    recentVideos() {

        return Object.keys(this.props.canvasVideoReducer).reduce((accumulator, element) => {
            if (moment(this.props.canvasVideoReducer[element].scan_date).isAfter(moment().subtract(3, 'days'))) {

                if ( (this.props.canvasVideoReducer[element].captioned === false || this.props.canvasVideoReducer[element].captioned === null) && (this.props.canvasVideoReducer[element].submitted_for_processing === null || this.props.canvasVideoReducer[element].submitted_for_processing === false)) {

                    if (this.props.canvasVideoReducer[element].ignore_video === false || this.props.canvasVideoReducer[element].auto_caption_passed === false) {
                        accumulator.push(this.props.canvasVideoReducer[element])
                    }


                }


            }
            return accumulator
        }, []);
    }





    render() {
        console.log("RECEMTS", this.recentVideos())
        return (
            <div className="ContentManagementMasterContainer">
                <div className="control-bar">
                    <div className="controlBarNavButtons">
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/canvas-scraper/active-courses",
                                    search: this.props.location.search,
                                }}>Active Courses </NavLink><span className={"jobCount"}>{this.props.capActive}</span>
                        </div>
                        <div id="jobManager" role="button" className="navButton">
                            <NavLink
                                to={{
                                    pathname: "/captioning/canvas-scraper/inactive-courses",
                                    search: this.props.location.search,
                                }}>Inactive Courses </NavLink><span
                            className={"jobCount"}>{this.props.capInactive}</span>
                        </div>

                        describe('JobPrepContainer', () => {
                        // ... Other test cases ... needed?

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


                    k





                    });
export default withRouter(connect(mapStateToProps)(CanvasManagementControlContainer))