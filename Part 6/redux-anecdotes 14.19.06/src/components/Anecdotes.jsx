/* eslint-disable react/react-in-jsx-scope */
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function Anecdotes() {
  const anecdotesToShow = useSelector(
    ({ anecdotes, filter }) => {
      const filteredAnecdotes = anecdotes.filter(
        (e) => e.content.toLowerCase().includes(filter.toLowerCase()),
      );
      return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
    },
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted for ${anecdote.content}`, 5));
  };

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has
            {' '}
            {anecdote.votes}
            <button type="button" onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Anecdotes;
