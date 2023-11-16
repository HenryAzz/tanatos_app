import {combineReducers} from 'redux';
import {usersSlice} from './usersSlice';

export const rootReducer = combineReducers({
  user: usersSlice.reducer,
});
