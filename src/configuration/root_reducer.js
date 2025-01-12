import { combineReducers } from 'redux';
import scholarshipReducer from '../modules/scholarships/scholarship_reducer';

const rootReducer = combineReducers({
  scholarships: scholarshipReducer,
});

export default rootReducer;
