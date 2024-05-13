const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
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
  const { body, user } = request;

  const blog = new Blog({
    ...body,
    user: user.id,
  });

  if (!blog.likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  return response.status(201).json(savedBlog);
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
  const blog = { ...body };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  return response.json(updatedBlog);
});

module.exports = blogsRouter;
