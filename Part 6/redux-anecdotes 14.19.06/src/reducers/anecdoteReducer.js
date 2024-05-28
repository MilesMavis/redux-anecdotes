import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((e) => e.id === id);
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      return state.map((e) => (e.id !== id ? e : votedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export default anecdoteSlice.reducer;
