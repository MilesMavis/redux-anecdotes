/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
