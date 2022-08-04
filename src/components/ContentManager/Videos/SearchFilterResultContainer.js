import React, {Component} from 'react';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import "../../../css/searchFilter.css"
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";


class SearchFilterResultContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            source_url: this.props.source_url,
            media_id: this.props.media_id,
            reducer: this.props.reducer,
            caption_select: "",
            output_select: "",
            video_select: ""
        };

        this.getData = this.getData.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)


    }


    jobFocusedStyle() {
        return (
            {
                "background": "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 74%," +
                    "rgba(237,235,235,1) 95%, rgba(207,207,207,1) 98%, rgba(148,148,148,1) 100%)"

            }
        )
    }

    getData() {
        let data = []

        let reducer = this.state.reducer;
        let media_id = this.state.media_id
        let formatData = (content) => {
            return {
                title: content.title,
                source_url: content.source_url,
                captioned_resources: content.captioned_resources,
                media_objects: content.media_objects

            }
        }


        if (Object.keys(reducer).length > 0) {


            Object.keys(reducer).forEach(function (key) {

                if (key == media_id) {
                    data.push(formatData(reducer[key]))

                }
            });


            console.log("data array ", data)

        }

        return data
    }

    handleInputChange(event) {


        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });


    }


    render() {

        let data = this.getData()
        let captionFiles = data[0].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_captions !== null) {
                accumulator.push({
                    caption_id: currentValue.associated_captions.id,
                    value: currentValue.associated_captions.file_name,
                    label: currentValue.associated_captions.file_name,
                    association_id: currentValue.id
                })
            }
            return accumulator
        }, [])

        let outputFiles = data[0].captioned_resources.reduce((accumulator, currentValue) => {

            console.log("Current value", currentValue)

            if (currentValue.amara_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.amara_resource.url,
                })

            }
            if (currentValue.s3_file_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.s3_file_resource.file_name,
                })


            }
            if (currentValue.other_id !== null) {
                accumulator.push({
                    value: currentValue.id,
                    label: currentValue.other_resource.source_link,
                })
            }

            return accumulator
        }, [])

        let videoFiles = data[0].media_objects.reduce((accumulator, currentValue) => {
            if (currentValue.associated_files !== null) {

                accumulator.push({
                    value: currentValue.associated_files.id,
                    label: currentValue.associated_files.file_name,
                })
            }


            console.log("inside s3 accumulator: ", accumulator);

            return accumulator
        }, [])

        return (
            <div>

                <div className="job-container-search masterListItemSearch" style={this.jobFocusedStyle()} tabIndex={0}
                     onBlur={this.clearFocus}>

                    <div className="inner-container-left">
                        <div className={"text-container"}>
                            <label className={"title"}>Title: </label>
                            <label className={"title"}>{data[0].title}</label>
                        </div>

                        <div className={"source-caption-container"}>
                            <div className={"source-container"}>
                                <div style={{"display": "flex"}}>
                                    <label className={"label"}>Source: </label>
                                    <label
                                        className={"description"}>{data[0].source_url}</label>
                                </div>

                            </div>

                            <div className={"caption-container"}>
                                <label className={"label"}>Caption Files: </label>
                                <Select
                                    className={"caption-selector"}
                                    name="caption_select"
                                    value={this.state.caption_select}
                                    onChange={this.handleInputChange}

                                >
                                    {
                                        captionFiles.map(e => {
                                            return (<MenuItem value={e.label}>{e.label}</MenuItem>)
                                        })
                                    }

                                </Select>
                            </div>
                        </div>

                        <div className={"search-lower-container"}>
                            <div className={"output-dropdown"}>
                                <label className={"label"}>Output Files: </label>
                                <Select
                                    name="output_select"
                                    value={this.state.output_select}
                                    className={"output-selector"}
                                    onChange={this.handleInputChange}
                                >
                                    {
                                        outputFiles.map(e => {
                                            return (<MenuItem value={e.label}>{e.label}</MenuItem>)
                                        })
                                    }

                                </Select>


                                <div>
                                    <div className={"caption-dropdown"}>
                                        <label className={"label"}>Video Files: &nbsp; </label>
                                        <Select
                                            name="video_select"
                                            className={"video-selector"}
                                            onChange={this.handleInputChange}
                                            value={this.state.video_select}
                                        >
                                            {
                                                videoFiles.map(e => {
                                                    return (<MenuItem value={e.label}>{e.label}</MenuItem>)
                                                })
                                            }
                                        </Select>
                                    </div>
                                </div>

                            </div>

                            <div className={"upload-download"}>

                                <div>
                                    <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                    >Download</label>
                                    <Button><GetAppIcon fontSize="small"/></Button>
                                </div>
                                <div>
                                    <div>
                                        <label style={{display: "block", fontSize: '12px', textAlign: "center"}}
                                        >Upload</label>
                                        <Button><PublishIcon fontSize="small"/></Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}


function mapStateToProps({loadingStatusReducer, mediaReducer}) {


    return {
        mediaReducer,
        loadingStatusReducer
    }
}

export default withRouter(connect(mapStateToProps)(SearchFilterResultContainer))