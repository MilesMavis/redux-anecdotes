import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
  },
});

export const { newNotification } = notificationSlice.actions;

export const setNotification = (message, time) => async (dispatch) => {
  dispatch(newNotification(message));
  setTimeout(() => {
    dispatch(newNotification(''));
  }, time * 1000);
};

// anecdotes ja anecdoteform

export default notificationSlice.reducer;
