import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LogoutButton from './components/LogoutButton';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((returnedBlogs) => setBlogs(returnedBlogs));
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
      // täällä
      messageTimeout({ message: 'wrong credentials', type: 'error' });
      // setErrorMessage('wrong credentials');
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
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

  const clearForm = () => {
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        messageTimeout({message: `A new blog ${returnedBlog.title} was added` });
      });

    clearForm();
  };

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

  const blogForm = () => (
    <div>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

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
        {/* addBlog, newTitle, newAuthor, newUrl, setNewTitle, setNewAuthor, setNewUrl */}
        <AddBlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          setNewTitle={setNewTitle}
          setNewAuthor={setNewAuthor}
          setNewUrl={setNewUrl}
        />
        {blogForm()}
      </div>
      )}
    </div>
  );
}

export default App;
