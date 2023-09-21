import { combineReducers } from 'redux';
import { CartSlice } from './cartReducer';
import { mapDataSlice } from './mapDataSlice';
import { menuDataSlice } from './menuDataSlice';
import { usersSlice } from './usersSlice';

export const rootReducer = combineReducers({
  user: usersSlice.reducer,
  menu: menuDataSlice.reducer,
  cartReducer: CartSlice.reducer,
  mapData: mapDataSlice.reducer
});
