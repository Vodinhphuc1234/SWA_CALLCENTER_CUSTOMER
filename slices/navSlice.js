import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  tripInformation: null,
  user: null,
  driverInformation: null,
  messages: [],
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin(state, action) {
      if (!action.payload) {
        state.origin = action.payload;
        return;
      }
      state.origin = {
        ...state.origin,
        ...action?.payload,
      };
    },
    setDestination(state, action) {
      if (!action.payload) {
        state.destination = action.payload;
        return;
      }
      state.destination = {
        ...state.destination,
        ...action?.payload,
      };
    },
    setTripInformation(state, action) {
      if (!action.payload) {
        state.tripInformation = action.payload;
        return;
      }
      state.tripInformation = {
        ...state.tripInformation,
        ...action?.payload,
      };
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setDriverInformation(state, action) {
      state.driverInformation = action.payload;
    },
    setMessages(state, action) {
      state.messages = [...action.payload];
    },
    addMessages(state, action) {
      state.messages = [...action.payload, ...state.messages];
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTripInformation,
  setUser,
  setDriverInformation,
  setMessages,
  addMessages
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) => state.nav.tripInformation;
export const selectUser = (state) => state.nav.user;
export const selectDriverInfomation = (state) => state.nav.driverInformation;
export const selectMessages = (state) => state.nav.messages;

export default navSlice.reducer;
