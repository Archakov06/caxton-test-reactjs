import { combineReducers } from 'redux';
import departments from './departments';
import employees from './employees';

export default combineReducers({
  departments,
  employees,
});
