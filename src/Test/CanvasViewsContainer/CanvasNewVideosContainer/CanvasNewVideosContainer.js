import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import CanvasTabulatorContainer from '../CanvasTabulatorViewContainer/TabulatorContainer'
import '../../../css/courseContainer-css.css'
import moment from "moment"



class CanvasNewVideosContainer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            pastDays: 3,
            canvasVids: []
        };

        this.handleInputChange = this.handleInputChange.bind(this)
        this.recentVideos = this.recentVideos.bind(this)
    }


    recentVideos() {

        return Object.keys(this.props.canvasVideoReducer).reduce((accumulator, element) => {
            if (moment(this.props.canvasVideoReducer[element].scan_date).isAfter(moment().subtract(this.state.pastDays, 'days'))) {

                if ( (this.props.canvasVideoReducer[element].captioned === false || this.props.canvasVideoReducer[element].captioned === null) && (this.props.canvasVideoReducer[element].submitted_for_processing === null || this.props.canvasVideoReducer[element].submitted_for_processing === false)) {

                    if (this.props.canvasVideoReducer[element].ignore_video === false || this.props.canvasVideoReducer[element].auto_caption_passed === false) {
                        accumulator.push(this.props.canvasVideoReducer[element])
                    }


                }


            }
            return accumulator
        }, []);
    }

    componentDidMount(prevProps, prevState, snapshot) {

        this.setState({
            canvasVids: this.recentVideos()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let recent_videos = this.recentVideos()


        if (JSON.stringify(prevState.canvasVids) !== JSON.stringify(recent_videos)) {
            console.log("SETTING", prevState.canvasVids.length === recent_videos.length)
            this.setState({
                canvasVids: recent_videos
            })
        }


    }

    handleInputChange(event) {

        this.setState({
            canvasVids: this.recentVideos(),
            pastDays: event.target.value
        });

    }

    render() {
        return (
            <div className={"courseContainer masterListItem"}>
                <div className={"courseUpperContainer"}>
                    <div>Recent Canvas Videos</div>
                    <div>
                        Past Days
                        <form onChange={this.handleInputChange}>
                            <select value={this.state.pastDays}>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>30</option>
                                <option>90</option>
                                <option>300</option>
                            </select>
                        </form>
                    </div>

                </div>
                <div className={"courseLowerContainer"}>

                    {this.props.new_videos_available === true && (
                        <CanvasTabulatorContainer type={'newVideos'} canvasVideos={this.state.canvasVids}/>)}
                    {this.props.new_videos_available === false && (
                        <div className={"courseNoVideos"}>No New Videos To Check</div>)}
                </div>
            </div>

        )
    }


}


function mapStateToProps({loadingStatusReducer, coursesReducer, canvasVideoReducer}, {}) {

    return {
        new_videos_available: true,
        canvasVideoReducer

    }
}


export default withRouter(connect(mapStateToProps)(CanvasNewVideosContainer))