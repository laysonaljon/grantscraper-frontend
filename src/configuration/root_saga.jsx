import { all } from 'redux-saga/effects';

import scholarshipSaga from '../modules/scholarships/scholarship_saga.js';

export default function* rootSaga() {
  yield all([
    scholarshipSaga(),
  ]);
}
