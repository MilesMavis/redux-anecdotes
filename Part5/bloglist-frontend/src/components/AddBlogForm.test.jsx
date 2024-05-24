import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import AddBlogForm from './AddBlogForm';

test('The form is submitted with the right parameters', async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  const { container } = render(<AddBlogForm createBlog={createBlog} />);

  const titleInput = container.querySelector('#title-input');
  const authorInput = container.querySelector('#author-input');
  const urlInput = container.querySelector('#url-input');
  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'title');
  await user.type(authorInput, 'author');
  await user.type(urlInput, 'url');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual({ title: 'title', author: 'author', url: 'url' });
});
