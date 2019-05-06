import {_LOADINGCOURSES, _LOADINGILEARNVIDEOS, _LOADINGINSTRUCTORS, _LOADINGMEDIA, _LOADINGSTUDENTS, _LOADINGVIDEOJOBS} from "../actions/status";

export default function loadingStatusReducer (state={

    coursesLoading: true,
    iLearnVideosLoading: true,
    instructorsLoading: true,
    mediaLoading: true,
    studentsLoading: true,
    videoJobsLoading: true,

}, action) {

    switch (action.type) {


        case _LOADINGCOURSES:
            return {

                ...state,
                "coursesLoading": action.status,
            };

        case _LOADINGILEARNVIDEOS:
            return {
                ...state,
                "iLearnVideosLoading": action.status,
            };

        case _LOADINGINSTRUCTORS:
            return {
                ...state,
                "instructorsLoading": action.status,
            };
        case _LOADINGSTUDENTS:
            return {
                ...state,
                "studentsLoading": action.status,
            };

        case _LOADINGMEDIA:
            return {
                ...state,
                "mediaLoading": action.status,
            };

        case _LOADINGVIDEOJOBS:
            return {
                ...state,
                "videoJobsLoading": action.status,
            };

        default:
            return state
    }



}