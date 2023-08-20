import {
    //Executive
        LOGIN_EXECUTIVE,
        LOGIN_EXECUTIVE_SUCCESS,
        LOGOUT_EXECUTIVE,
        LOGOUT_EXECUTIVE_SUCCESS,
    //Doctor
        LOGIN_DOCTOR,
        LOGIN_DOCTOR_SUCCESS,
        LOGOUT_DOCTOR,
        LOGOUT_DOCTOR_SUCCESS,
    //Lab
        LOGIN_LAB,
        LOGIN_LAB_SUCCESS,
        LOGOUT_LAB,
        LOGOUT_LAB_SUCCESS,
    //Patient
        LOGIN_PATIENT,
        LOGIN_PATIENT_SUCCESS,
        LOGOUT_PATIENT,
        LOGOUT_PATIENT_SUCCESS,
    //API
        API_ERROR,
    } from './actionTypes'

const initialState = {
    error: '',
    loading: false,
}

const login = (state = initialState, action) => {
    switch (action.type) {
      // Executive
      case LOGIN_EXECUTIVE:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_EXECUTIVE_SUCCESS:
        return {
          ...state,
          loading: false,
          isExecutiveLogout: false,
        };
      case LOGOUT_EXECUTIVE:
        return { ...state };
      case LOGOUT_EXECUTIVE_SUCCESS:
        return { ...state, isExecutiveLogout: true };
      
      // Doctor
      case LOGIN_DOCTOR:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_DOCTOR_SUCCESS:
        return {
          ...state,
          loading: false,
          isDoctorLogout: false,
        };
      case LOGOUT_DOCTOR:
        return { ...state };
      case LOGOUT_DOCTOR_SUCCESS:
        return { ...state, isDoctorLogout: true };
      
      // Lab
      case LOGIN_LAB:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_LAB_SUCCESS:
        return {
          ...state,
          loading: false,
          isLabLogout: false,
        };
      case LOGOUT_LAB:
        return { ...state };
      case LOGOUT_LAB_SUCCESS:
        return { ...state, isLabLogout: true };
      
      // Patient
      case LOGIN_PATIENT:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_PATIENT_SUCCESS:
        return {
          ...state,
          loading: false,
          isPatientLogout: false,
        };
      case LOGOUT_PATIENT:
        return { ...state };
      case LOGOUT_PATIENT_SUCCESS:
        return { ...state, isPatientLogout: true };
      
      // API Error
      case API_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
          isUserLogout: false,
        };
      
      default:
        return state;
    }
  };
  
  export default login;