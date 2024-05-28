/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import Notification from './components/Notification';

import { initializeAnecdotes } from './reducers/anecdoteReducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
}

// moi

export default App;
