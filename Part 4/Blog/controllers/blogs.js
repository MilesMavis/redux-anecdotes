const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  const { user } = request;

  if (!user) {
    return response.status(403).json({ error: 'user missing' });
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  blog.likes |= 0;
  blog.user = user;
  user.blogs = user.blogs.concat(blog._id);

  await user.save();

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const userId = decodedToken.id;
  const blogId = request.params.id;
  if (!userId) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const blog = await Blog.findById(blogId);

  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    return response.status(204).end();
  }
  return response.status(401).json({ error: 'wrong user' });
  // await Blog.findByIdAndDelete(request.params.id);
  // return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
