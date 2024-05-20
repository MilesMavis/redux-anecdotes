/* eslint-disable react/prop-types */
import { useState } from 'react';

function Blog({
  blog, loggedUser, likeBlog, deleteBlog,
}) {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}
      {' '}
      <button type="button" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes
        {' '}
        {blog.likes}
        {' '}
        <button
          type="button"
          onClick={() => {
            likeBlog(blog);
          }}
        >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {blog.user.username === loggedUser.username && (
          <button type="button" onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  );
}

// <h2>{user ? 'blogs' : 'log in to application'}</h2>

export default Blog;
