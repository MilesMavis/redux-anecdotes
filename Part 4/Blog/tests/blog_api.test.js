/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
const jwt = require('jsonwebtoken');
const {
  test, after, beforeEach, describe,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
// eslint-disable-next-line no-unused-vars
const { includes } = require('lodash');
const { title } = require('node:process');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const initialUser = {
  username: 'TuoT',
  password: 'Salasana',
  name: 'Tuomas Testaaja',
};

let authorization = null;

const initialBlogs = [
  {
    title: 'Testi',
    author: initialUser.name,
    url: 'testiblog.com',
    likes: 5,
  },
  {
    title: 'Toinen testi',
    author: initialUser.name,
    url: 'toinentestiblog.com',
    likes: 10,
  },
];

const getId = async () => {
  const response = await api.get('/api/blogs');
  const { id } = response.body[0];
  return id;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});
  const userObject = new User(initialUser);
  await userObject.save();

  const { username } = initialUser;
  const user = await User.findOne({ username });

  const userForToken = {
    username: user.username,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  };

  authorization = await jwt.sign(userForToken, process.env.SECRET);

  // await Blog.deleteMany({});
  // await User.deleteMany({});

  // await api
  //   .post('/api/users')
  //   .send(initialUser)
  //   .expect(201)
  //   .expect('Content-type', /application\/json/);

  // const login = await api
  //   .post('/api/login')
  //   .send({
  //     username: initialUser.username,
  //     password: initialUser.password,
  //   })
  //   .expect(200)
  //   .expect('Content-type', /application\/json/);

  // const { token } = login.body;

  // await api
  //   .post('/api/blogs')
  //   .set('Authorization', `Bearer ${token}`)
  //   .send(initialBlogs[0])
  //   .expect(201);

  // await api
  //   .post('/api/blogs')
  //   .set('Authorization', `Bearer ${token}`)
  //   .send(initialBlogs[1])
  //   .expect(201);

  // const blogs = await api.get('/api/blogs');

  // console.log('Bar', blogs.body);

  // authorization = token;
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, 2);
});

test('Blog id is right format', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(Object.keys(response.body[0]).find((element) => /id/i.test(element)), 'id');
});

test('POST increases the amount of blogs by one', async () => {
  const newBlog = {
    title: 'Uusi blogi',
    author: 'Uusi kirjoittaja',
    url: 'uusiblogi.com',
    likes: 15,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorization}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const response = await api.get('/api/blogs');
  const names = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(names.includes(newBlog.title));
});

test('A blog with empty likes gets a value of 0', async () => {
  const newBlog = {
    title: 'Uusi blogi',
    author: 'Uusi kirjoittaja',
    url: 'Uusiblogi.com',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${authorization}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/);

  const response = await api.get('/api/blogs');
  const returnedBlog = response.body.find((blog) => blog.title === newBlog.title);
  assert.strictEqual(returnedBlog.likes, 0);
});

test('If a blog is added without a token, return 401 Unauthorized', async () => {
  const newBlog = {
    title: 'Testi3',
    author: initialUser.name,
    url: 'uusiblogi.com',
    likes: 15,
  };

  const response = await api
    .post('/api/blogs')
    .set('Authorization', null)
    .send(newBlog);

  assert.strictEqual(response.status, 400);
});

test('A blog without title or url returns 400 bad request', async () => {
  let newBlog = {
    author: 'Uusi kirjoittaja',
    url: 'uusiblogi.com',
    likes: 15,
  };

  let response = await api
    .post('/api/blogs')
    .send(newBlog);

  assert.strictEqual(response.status, 400);

  newBlog = {
    title: 'Uusi blogi',
    author: 'Uusi kirjoittaja',
    likes: 15,
  };

  response = await api
    .post('/api/blogs')
    .send(newBlog);

  assert.strictEqual(response.status, 400);

  newBlog = {
    author: 'Uusi kirjoittaja',
    likes: 15,
  };

  response = await api
    .post('/api/blogs')
    .send(newBlog);

  assert.strictEqual(response.status, 400);
});

describe('Deleting a note works', () => {
  test('The length of the blogs is reduced by one', async () => {
    const id = await getId();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);

    const returnedBlogs = await api
      .get('/api/blogs');

    assert.strictEqual(returnedBlogs.body.length, initialBlogs.length - 1);
  });

  test('The list of blogs does not contain the deleted blog', async () => {
    const id = await getId();

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);

    const returnedBlogs = await api
      .get('/api/blogs');
    assert(!returnedBlogs.body.find((blog) => blog.id === id));
  });
});

describe('Updating notes works', () => {
  test('The amount of likes is updated', async () => {
    const id = await getId();
    const updatedBlog = { ...initialBlogs[0], likes: 1 };

    await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200);

    const response = await api
      .get('/api/blogs')
      .expect(200);

    assert.deepStrictEqual(
      response.body.find((blog) => blog.name === initialBlogs[0].name),
      { ...updatedBlog, id },
    );
  });
});

test();

after(async () => {
  await mongoose.connection.close();
});
