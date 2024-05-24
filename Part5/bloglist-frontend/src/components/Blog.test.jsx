/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import Blog from './Blog';

const blog = {
  title: 'moi',
  author: 'Jonne',
  user: { name: 'Testaaja' },
  url: 'testi.com',
  likes: 5,
};

test('renders title', () => {
  render(<Blog blog={blog} loggedUser={{ username: null }} likeBlog={null} deleteBlog={null} />);
  const element = screen.getByText('moi Jonne');
  expect(element).toBeDefined();
});

test('Url, likes, and user are shown after visible', async () => {
  const mockHandler = vi.fn();

  render(<Blog blog={blog} loggedUser={{ username: null }} likeBlog={null} deleteBlog={null} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const url = screen.getByText('testi.com');
  const userName = screen.getByText('Testaaja');
  const likes = screen.getByText('likes 5');

  expect(url).toBeDefined();
  expect(userName).toBeDefined();
  expect(likes).toBeDefined();
});

test('If like is pressed twice, the event handler is called twice', async () => {
  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      loggedUser={{ username: null }}
      likeBlog={mockHandler}
      deleteBlog={null}
    />,
  );

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

/*

title: { type: String, required: true },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: { type: String, required: true },
  likes: Number,

*/
