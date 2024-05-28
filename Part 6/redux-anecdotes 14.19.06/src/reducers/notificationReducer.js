import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showVote(state, action) {
      return action.payload;
    },
  },
});

export const { showVote } = notificationSlice.actions;
export default notificationSlice.reducer;
