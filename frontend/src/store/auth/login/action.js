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

//Executive
export const loginExecutive = (executive, history) => {
    return {
        type: LOGIN_EXECUTIVE,
        payload: { executive, history },
    }
}

export const loginExecutiveSuccess = executive => {
    return {
        type: LOGIN_EXECUTIVE_SUCCESS,
        payload: executive
    }
}

export const logoutExecutive = history => {
    return {
        type: LOGOUT_EXECUTIVE,
        payload: { history },
    }
}

export const logoutExecutiveSuccess = () => {
    return {
        type: LOGOUT_EXECUTIVE_SUCCESS,
        payload: {},
    }
}

//Doctor
export const loginDoctor = (doctor, history) => {
    return {
        type: LOGIN_DOCTOR,
        payload: { doctor, history },
    }
}

export const loginDoctorSuccess = doctor => {
    return {
        type: LOGIN_DOCTOR_SUCCESS,
        payload: doctor
    }
}

export const logoutDoctor = history => {
    return {
        type: LOGOUT_DOCTOR,
        payload: { history },
    }
}

export const logoutDoctorSuccess = () => {
    return {
        type: LOGOUT_DOCTOR_SUCCESS,
        payload: {},
    }
}

// Lab
export const loginLab = (lab, history) => {
    return {
        type: LOGIN_LAB,
        payload: { lab, history },
    }
}

export const loginLabSuccess = lab => {
    return {
        type: LOGIN_LAB_SUCCESS,
        payload: lab,
    }
}

export const logoutLab = history => {
    return {
        type: LOGOUT_LAB,
        payload: { history },
    }
}

export const logoutLabSuccess = () => {
    return {
        type: LOGOUT_LAB_SUCCESS,
        payload: {},
    }
}

// Patient
export const loginPatient = (patient, history) => {
    return {
        type: LOGIN_PATIENT,
        payload: { patient, history },
    }
}

export const loginPatientSuccess = patient => {
    return {
        type: LOGIN_PATIENT_SUCCESS,
        payload: patient,
    }
}

export const logoutPatient = history => {
    return {
        type: LOGOUT_PATIENT,
        payload: { history },
    }
}

export const logoutPatientSuccess = () => {
    return {
        type: LOGOUT_PATIENT_SUCCESS,
        payload: {},
    }
}

//API
export const apiError = error => {
    return {
        type: API_ERROR,
        payload: error,
    }
}