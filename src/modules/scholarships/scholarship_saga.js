import { call, put, takeEvery } from 'redux-saga/effects';
import actionTypes from './scholarship_types';
import api from '../../configuration/api';

function* getScholarships(action) {
  try {
    const response = yield call(api.getScholarships, action.params);
    if (response.status === 200) {
      yield put({
        type: actionTypes.SET_SCHOLARSHIPS,
        data: response.data,
      });
      yield put({
        type: actionTypes.SET_MESSAGE,
        data: { type: "success", message: "Scholarships loaded successfully." },
      });
    } else {
      yield put({
        type: actionTypes.SET_MESSAGE,
        data: { type: "warning", message: `Failed to load scholarships: ${response.data?.message || `Status ${response.status}`}` },
      });
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred while fetching scholarships.";
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.statusText || `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "Network error: Please check your internet connection or server availability.";
    } else {
      errorMessage = error.message;
    }
    yield put({
      type: actionTypes.SET_MESSAGE,
      data: { type: "error", message: `Error loading scholarships: ${errorMessage}` },
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
  try {
    const response = yield call(api.addUserPreference, action.payload);
    if (response.status === 200) {
      yield put({
        type: actionTypes.SET_MESSAGE,
        data: { type: "success", message: response.data.message || "User preference added successfully!" },
      });
    } else {
      yield put({
        type: actionTypes.SET_MESSAGE,
        data: { type: "warning", message: `Failed to add preference: ${response.data?.message || `Status ${response.status}`}` },
      });
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred while adding user preference.";
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.statusText || `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "Network error: Please check your internet connection or server availability.";
    } else {
      errorMessage = error.message;
    }
    yield put({
      type: actionTypes.SET_MESSAGE,
      data: { type: "error", message: `Error adding preference: ${errorMessage}` },
    });
  }
}

function* clearMessage() {
  yield put({
    type: actionTypes.SET_MESSAGE,
    data: { type: "", message: "" },
  });
}

export default function* scholarshipSaga() {
  yield takeEvery(actionTypes.GET_SCHOLARSHIPS, getScholarships);
  yield takeEvery(actionTypes.GET_SCHOLARSHIP, getScholarship);
  yield takeEvery(actionTypes.ADD_USER_PREFERENCE, addUserPreference);
  yield takeEvery(actionTypes.CLEAR_MESSAGE, clearMessage);
}