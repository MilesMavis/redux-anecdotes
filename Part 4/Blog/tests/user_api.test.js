const {
  test, after, beforeEach, describe,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { includes } = require('lodash');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');

const initialUser = { username: 'Testuser', password: 'Salasana', name: 'Tuomas Testaaja' };

beforeEach(async () => {
  await User.deleteMany({});
  const userObject = new User(initialUser);
  await userObject.save();
});

describe('Invalid users are not added to the datavase', () => {
  test('A user with a too short name is not added', async () => {
    const usersAtStart = await User.find({});
    const newUser = { username: 'T', password: 'Salasana', name: 'Tuomas Testaaja Jr.' };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test('A user with a too short password is not added', async () => {
    const usersAtStart = await User.find({});
    const newUser = { username: 'Testi', password: 'S', name: 'Tuomas Testaaja Jr.' };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    const usersAtEnd = await User.find({});

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test('A user with a non-unique username is not added', async () => {
    const usersAtStart = await User.find({});
    const newUser = { username: initialUser.username, password: 'Salasana', name: 'Tuomas Testaaja Jr.' };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    assert(response.body.error.includes('expected username to be unique'));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
