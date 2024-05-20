import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import LogoutButton from './components/LogoutButton';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((returnedBlogs) => {
      setBlogs(returnedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const initialUser = JSON.parse(loggedUserJSON);
      setUser(initialUser);
      blogService.setToken(initialUser.token);
    }
  }, []);

  const messageTimeout = ({ message, type }) => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: null });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername('');
      setPassword('');
      messageTimeout({ message: `Logged in ${newUser.name}` });
    } catch (exception) {
      messageTimeout({ message: 'wrong credentials', type: 'error' });
    }

    console.log('logging in with', username, password);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const { name } = user;

    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    messageTimeout({ message: `Logged out ${name}` });
  };

  const addBlogFormRef = useRef();

  const addBlog = (blogObject) => {
    addBlogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        messageTimeout({ message: `A new blog ${returnedBlog.title} was added` });
      });
  };

  const likeBlog = (blogObject) => {
    const updatedBlog = {
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    };

    blogService
      .update(blogObject.id, updatedBlog)
      .then((returnedBlog) => setBlogs(blogs.map(
        (tempBlog) => (tempBlog.title !== returnedBlog.title ? tempBlog : returnedBlog),
      )));
  };

  const deleteBlog = (blogObject) => {
    if (window.confirm(`Do you want to delete ${blogObject.title}`)) {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => setBlogs(
          blogs.filter((blogItem) => blogItem.id !== blogObject.id),
        ));
    }
  };
  /* setBlogs(blogs.filter((blogItem) => blogItem. */

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            loggedUser={user}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to application'}</h2>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
      {!user && loginForm()}
      {user && (
      <div>
        <p>
          {user.name}
          {' '}
          logged in
          {' '}
          <LogoutButton handleLogout={handleLogout} />
        </p>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={addBlogFormRef}>
          <AddBlogForm createBlog={addBlog} />
        </Togglable>
        {blogForm()}
      </div>
      )}
    </div>
  );
}

export default App;
