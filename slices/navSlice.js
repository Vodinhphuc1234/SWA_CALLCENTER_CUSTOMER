import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  tripInformation: null,
  user: null,
  driverInformation: null,
  messages: [],
  socketLink: null,
  pingAuth: true,
  pingData: true,
  IP: null,
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
    updateDriverInformation(state, action) {
      state.driverInformation = {
        ...state.driverInformation,
        ...action.payload,
      };
    },
    setMessages(state, action) {
      state.messages = [...action.payload];
    },
    addMessages(state, action) {
      state.messages = [...action.payload, ...state.messages];
    },
    setSocketLink(state, action) {
      state.socketLink = action.payload;
    },
    setPingAuth(state, action) {
      state.pingAuth = action.payload;
    },
    setPingData(state, action) {
      state.pingData = action.payload;
    },
    reset(state, action) {
      state.origin = null;
      state.destination = null;
      state.tripInformation = null;
      state.user = null;
      state.driverInformation = null;
      state.socketLink = null;
    },
    resetTrip(state, action) {
      state.origin = null;
      state.destination = null;
      state.tripInformation = null;
      state.driverInformation = null;
      state.socketLink = null;
    },
    setIP(state, action) {
      state.IP = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTripInformation,
  setUser,
  setDriverInformation,
  updateDriverInformation,
  setMessages,
  addMessages,
  setSocketLink,
  reset,
  resetTrip,
  setPingAuth,
  setPingData,
  setIP,
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTripInformation = (state) => state.nav.tripInformation;
export const selectUser = (state) => state.nav.user;
export const selectDriverInfomation = (state) => state.nav.driverInformation;
export const selectMessages = (state) => state.nav.messages;
export const selectSocketLink = (state) => state.nav.socketLink;
export const selectPingAuth = (state) => state.nav.pingAuth;
export const selectPingData = (state) => state.nav.pingData;
export const selectIP = (state) => state.nav.IP;
export default navSlice.reducer;
