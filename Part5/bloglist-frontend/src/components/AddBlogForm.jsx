/* eslint-disable react/prop-types */
import { useState } from 'react';

function AddBlogForm({ createBlog }) {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // const addBlog = (event) => {
  //   addBlogFormRef.current.toggleVisibility();
  //   event.preventDefault();
  //   const blogObject = {
  //     title: newTitle,
  //     author: newAuthor,
  //     url: newUrl,
  //   };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        {' '}
        <input
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
        {' '}
        <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        url:
        {' '}
        <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
}

export default AddBlogForm;
