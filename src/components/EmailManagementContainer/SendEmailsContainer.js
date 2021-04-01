import React, { Component } from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import  "../../css/users.css"
import EmailTabulator from "./EmailTabulator";
import EmailTemplatesContainer from "./EmailTemplatesContainer";

class SendEmailsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }





    render() {

        return (
            <div className="masterListItem masterListUser">
                <div style={{"margin-bottom":"10px"}} className={"emp-display-container"}>
                    <div className={"emp-display-title"}>
                        <div style={{"font-weight":"600"}}>
                            Templates
                        </div>

                    </div>
                    <EmailTemplatesContainer/>
                </div>
                <div className={"emp-display-container"}>
                    <div className={"emp-display-title"}>
                        <div style={{"font-weight":"600"}}>Current Queues</div>
                    </div>
                </div>

            </div>
        )
    }

}


function mapStateToProps({employeesReducer, requesterReducer, campusOrgReducer}, {props}) {



    return {


    }
}

export default withRouter(connect(mapStateToProps)(SendEmailsContainer))