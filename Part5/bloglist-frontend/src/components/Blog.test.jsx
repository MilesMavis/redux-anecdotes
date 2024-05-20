import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { expect } from 'vitest';

test('renders title', () => {
  const blog = {
    title: 'moi',
    user: 'Testaaja',
    url: 'testi.com',
    likes: 5,
  };

  render(<Blog blog={blog} loggedUser={{ username: null }} likeBlog={null} deleteBlog={null} />);
  const element = screen.getByText('moi');
  expect(element).toBeDefined();
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
