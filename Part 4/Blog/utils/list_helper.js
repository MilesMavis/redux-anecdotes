const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (
  blogs.reduce((acc, value) => acc + value.likes, 0)
);

const favoriteBlog = (blogs) => (
  blogs.reduce((acc, value) => (acc.likes > value.likes ? acc : value), blogs[0])
);

const authorWithMostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, 'author');
  const authorsBlogs = Object.keys(authors).map((author) => ({
    author,
    blogs: authors[author].length,
  }));

  return _.maxBy(authorsBlogs, 'blogs');
};

const authorWithMostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author');
  const authorsBlogs = Object.keys(authors).map((author) => ({
    author,
    likes: _.reduce(authors[author], (acc, value) => acc + value.likes, 0),
  }));

  return _.maxBy(authorsBlogs, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes,
};
