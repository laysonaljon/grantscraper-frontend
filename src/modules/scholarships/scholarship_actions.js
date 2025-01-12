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

export default {
  getScholarships,
  getScholarship,
  addUserPreference,
};
