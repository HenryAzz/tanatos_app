import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import ApiRequest, { GetApiRequest } from '../../Services/ApiRequest';

// First, define the reducer and action creators via `createSlice`
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: {},
    address: [],
    loading: false,
    cards: [],
    preference: {}
  },
  reducers: {
    loadingStart(state, action) {
      state.loading = true
    },
    loadingEnd(state, action) {
      state.loading = false
    },
    addUsersCard(state, action) {
      state.cards = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setPreference(state, action) {
      state.preference = action.payload;
    },
    updateUsers(state, action) {
      state.users = { ...state.users, ...action.payload };
    },
    setUserAddress(state, action) {
      state.address = action.payload;
    },
    updateUserAddress(state, action) {
      state.address = [...state.address, ...action.payload];
    },
    userLogout(state) {
      state.users = {};
      state.address = [];
      state.cards = [];
      state.loading = false;
    },
  },
});

// // Action creators are generated for each case reducer function
// Destructure and export the plain action creators
export const {
  setUsers,
  userLogout,
  updateUsers,
  setUserAddress,
  updateUserAddress,
  loadingStart,
  loadingEnd,
  addUsersCard,
  setPreference
} = usersSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchUsers = (user_id) => async dispatch => {
  try {
    const response = await GetApiRequest("users/get", { id: user_id });
    console.log(response.data)
    dispatch(setUsers(response.data.data));
  } catch (error) { }
};
// Define a thunk that dispatches those action creators
export const fetchPreferences = () => async dispatch => {
  try {
    const response = await ApiRequest({ type: 'get_data', table_name: "preferences", id: 1 });
    dispatch(setPreference(response.data.data[0]));
    console.log(response.data.data[0])
  } catch (error) { }
};
// Define a thunk that dispatches those action creators
export const fetchUsersAddress = () => async dispatch => {
  dispatch(loadingStart())
  const user_id = await AsyncStorage.getItem('user_id');
  try {
    const response = await ApiRequest({ type: 'get_data', table_name: "user_addresses", user_id: user_id });
    if (response.data.data) {
      dispatch(setUserAddress(response.data.data));
    }
  } catch (error) { }
  finally {
    dispatch(loadingEnd())
  }
};

export const fetchUsersCards = () => async dispatch => {
  const user_id = await AsyncStorage.getItem('user_id');
  if (user_id) {
    try {
      const response = await ApiRequest({ type: 'get_data', user_id: user_id, table_name: "cards" });
      if (response.data.data) {
        dispatch(addUsersCard(response.data.data));
      }
    } catch (error) { }
  }
};
