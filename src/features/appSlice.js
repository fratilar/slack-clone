import {createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelID: null,
  },

  reducers: {
    enterChannel: (state, action) => {
      state.channelID = action.payload.channelID;
    }
  },
});

export const { enterChannel } = appSlice.actions;

export const selectChannelID = (state) => state.app.channelID;

export default appSlice.reducer;
