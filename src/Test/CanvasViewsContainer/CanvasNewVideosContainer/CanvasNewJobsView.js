import React, { Component } from 'react';
import { connect } from 'react-redux'
import {withRouter} from "react-router";
import CanvasCourseContainer from '../CanvasCourseContainer/CanvasCourseContainerView.test'
import '../../../css/courseContainer-css.css'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache} from "react-virtualized";
import CircularProgress from "@material-ui/core/CircularProgress";
import CanvasNewVideosContainer from "./CanvasNewVideosContainer";


class CanvasNewJobView extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     cache: new CellMeasurerCache({
        //         fixedWidth: true,
        //         defaultHeight: 200
        //     })
        // };
        // this.renderRowAlpha = this.renderRowAlpha.bind(this)


    }

    // componentDidMount() {
    //
    //     if (this.props.studentActive === true) {
    //         this.setState({
    //             cache: new CellMeasurerCache({
    //                 fixedWidth: true,
    //                 defaultHeight: 200
    //             }),
    //             canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
    //             captioningCourses: Object.keys(this.props.requests_captioning)
    //
    //         })
    //
    //
    //     }
    //
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //     if (Object.keys(this.props.coursesReducer).length !== Object.keys(prevProps.coursesReducer).length) {
    //         if (this.props.studentActive === true) {
    //             this.setState({
    //                 cache: new CellMeasurerCache({
    //                     fixedWidth: true,
    //                     defaultHeight: 200
    //                 }),
    //                 canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
    //                 captioningCourses: Object.keys(this.props.requests_captioning)
    //             })
    //         } else {
    //
    //             this.setState({
    //                 cache: new CellMeasurerCache({
    //                     fixedWidth: true,
    //                     defaultHeight: 200
    //                 }),
    //                 canvasVideoRowCount:Object.keys(this.props.no_captioning).length,
    //                 captioningCourses:Object.keys(this.props.no_captioning)
    //             })
    //         }
    //     }
    //
    //     if (this.props.studentActive !== prevProps.studentActive) {
    //
    //         if (this.props.studentActive === true) {
    //             this.setState({
    //                 cache: new CellMeasurerCache({
    //                     fixedWidth: true,
    //                     defaultHeight: 200
    //                 }),
    //                 canvasVideoRowCount: Object.keys(this.props.requests_captioning).length,
    //                 captioningCourses: Object.keys(this.props.requests_captioning)
    //
    //             })
    //
    //         } else {
    //
    //             this.setState({
    //                 cache: new CellMeasurerCache({
    //                     fixedWidth: true,
    //                     defaultHeight: 200
    //                 }),
    //                 canvasVideoRowCount:Object.keys(this.props.no_captioning).length,
    //                 captioningCourses:Object.keys(this.props.no_captioning)
    //
    //             })
    //
    //         }
    //     }
    //
    // }
    //
    // renderRowAlpha(index) {
    //     console.log(index)
    //
    //     if (this.state.cache !== undefined) {
    //
    //         return(
    //             <CellMeasurer
    //                 key={index.key}
    //                 cache={this.state.cache}
    //                 parent={index.parent}
    //                 columnIndex={0}
    //                 rowIndex={index.index}>
    //                 <div key={index.key} style={index.style} className="row">
    //
    //
    //                     <CanvasCourseContainer canvasvideos={this.props.courseCanvasVideos}
    //                                            course_id={this.state.captioningCourses[index.index]}
    //                                            key={this.state.captioningCourses[index.index]}/>
    //
    //                 </div>
    //             </CellMeasurer>
    //
    //         )
    //
    //     }
    //
    // }


    render() {
        return(


                <div className={"canvasContentContainer"}>
                    <CanvasNewVideosContainer/>
                </div>

        )
    }



}


function mapStateToProps({canvasVideoReducer, loadingStatusReducer, coursesReducer}, {studentActive})  {




    let courseIsLoading = loadingStatusReducer['coursesLoading'] && Object.keys(coursesReducer).length === 0;
    let isLoading = loadingStatusReducer['canvasVideosLoading'] && Object.keys(canvasVideoReducer).length === 0;
    let showCourseStubs = courseIsLoading || isLoading;

    let requests_captioning = {};
    let no_captioning = {};

    let canvasVideosSearchTemp = {...canvasVideoReducer}
    let courseCanvasVideos = {}

    // build canvas-videos dict
    Object.keys(coursesReducer).forEach(courseKey => {

        if (coursesReducer[courseKey].canvas_page_id !== null) {

            courseCanvasVideos[courseKey] = {};
            Object.keys(canvasVideosSearchTemp).forEach(videoKey => {
                if (canvasVideosSearchTemp[videoKey]['course_gen_id'] === courseKey) {
                    courseCanvasVideos[courseKey][videoKey] = canvasVideosSearchTemp[videoKey]
                    delete canvasVideosSearchTemp[videoKey]
                }
            })
        }

    });

    let showCourseContainer = !courseIsLoading && !isLoading && Object.keys(courseCanvasVideos).length > 0;

    Object.keys(coursesReducer).forEach(function(key){

        if (coursesReducer[key].canvas_page_id !== null) {

            requests_captioning[key] = coursesReducer[key]
        }
    });

    return {
        courseIsLoading,
        coursesReducer,
        showCourseStubs,
        showCourseContainer,
        requests_captioning,
        no_captioning,
        courseCanvasVideos,
        studentActive
    }
}


export default withRouter(connect(mapStateToProps)(CanvasNewJobView))