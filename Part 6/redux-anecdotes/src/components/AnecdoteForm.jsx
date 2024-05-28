/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();

<<<<<<< HEAD:Part 6/redux-anecdotes 14.19.06/src/components/AnecdoteForm.jsx
  const addAnecdote = async (event) => {
    // event.preventDefault();
    // const content = event.target.anecdote.value;
    // event.target.anecdote.value = '';
    // const newAnecdote = await anecdoteService.createNew(content);
    // dispatch(createAnecdote(newAnecdote));
    // dispatch(showVote(`you added ${newAnecdote.content}`));
    // setTimeout(() => {
    //   dispatch(showVote(''));
    // }, 5000);
=======
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
>>>>>>> parent of bfeaa25 (6.16):Part 6/redux-anecdotes/src/components/AnecdoteForm.jsx
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
