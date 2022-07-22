import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInfromation: null,
  user: null,
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
    setTravelTimeInfromation(state, action) {
      if (!action.payload) {
        state.travelTimeInfromation = action.payload;
        return;
      }
      state.travelTimeInfromation = {
        ...state.travelTimeInfromation,
        ...action?.payload,
      };
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfromation, setUser } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInfromation = (state) =>
  state.nav.travelTimeInfromation;
export const selectUser = (state) => state.nav.user;

export default navSlice.reducer;
