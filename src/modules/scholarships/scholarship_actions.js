import actionTypes from './scholarship_types';

const getScholarships = (params ) => ({
  type: actionTypes.GET_SCHOLARSHIPS,
  params,
});

const getScholarship = (scholarshipId) => ({
  type: actionTypes.GET_SCHOLARSHIP,
  scholarshipId,
});

const addUserPreference = (email, level, type, scholarship_id) => ({
  type: actionTypes.ADD_USER_PREFERENCE,
  payload: { email, level, type, scholarship_id },
});

const clearMessage = () => ({
  type: actionTypes.CLEAR_MESSAGE,
});

const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

const clearError = () => ({
  type: actionTypes.CLEAR_ERROR,
});

export default {
  getScholarships,
  getScholarship,
  addUserPreference,
  clearMessage,
  setError,
  clearError
};
