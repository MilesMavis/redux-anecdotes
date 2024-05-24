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
      <div data-testid="main-text">
        {blog.title}
        {' '}
        {blog.author}
        {' '}
      </div>
      <button type="button" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          <span>
            likes
            {' '}
            {blog.likes}
          </span>
          {' '}
          <button
            type="button"
            onClick={() => {
              likeBlog(blog.id);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === loggedUser.username && (
          <button type="button" onClick={() => deleteBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  );
}

// <h2>{user ? 'blogs' : 'log in to application'}</h2>

export default Blog;
