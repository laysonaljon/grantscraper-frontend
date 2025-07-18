import { call, put, takeEvery } from 'redux-saga/effects';
import actionTypes from './scholarship_types';
import api from '../../configuration/api';

function* getScholarships(action) {
  const response = yield call(api.getScholarships, action.params);
  if (response.status === 200) {
    yield put({
      type: actionTypes.SET_SCHOLARSHIPS,
      data: response.data,
    });
  }
}

function* getScholarship(action) {
  const response = yield call(api.getScholarship, action.scholarshipId);
  if (response.status === 200) {
    yield put({
      type: actionTypes.SET_SCHOLARSHIP,
      data: response.data,
    });
  }
}

function* addUserPreference(action) {
  const response = yield call(api.addUserPreference, action.payload);
  if (response.status === 200) {
    yield put({
      type: actionTypes.SET_MESSAGE,
      data: response.data,
    });
  }
}

function* clearMessage() {
  yield put({
    type: actionTypes.SET_MESSAGE,
    data:  {type: "", message: "" },
  });
}

export default function* scholarshipSaga() {
  yield takeEvery(actionTypes.GET_SCHOLARSHIPS, getScholarships);
  yield takeEvery(actionTypes.GET_SCHOLARSHIP, getScholarship);
  yield takeEvery(actionTypes.ADD_USER_PREFERENCE, addUserPreference);
  yield takeEvery(actionTypes.CLEAR_MESSAGE, clearMessage);
}
