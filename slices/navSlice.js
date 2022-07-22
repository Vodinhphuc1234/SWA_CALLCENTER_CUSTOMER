import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  tripInformation: null,
  user: null,
  driverInformation: null,
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
    }
  },
});

export const { setOrigin, setDestination, setTripInformation, setUser, setDriverInformation } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) =>
  state.nav.tripInformation;
export const selectUser = (state) => state.nav.user;
export const selectDriverInfomation = (state) => state.nav.driverInformation;

export default navSlice.reducer;
