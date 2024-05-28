import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const anecdote = action.payload;
      return state.map((e) => (e.id !== anecdote.id ? e : anecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const returnedAnecdote = await anecdoteService.update(updatedAnecdote);
  dispatch(updateAnecdote(returnedAnecdote));
};

export default anecdoteSlice.reducer;
