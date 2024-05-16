/* eslint-disable react/prop-types */
function Blog({ blog }) {
  return (
    <div>
      {blog.title}
      {' '}
      {blog.author}
    </div>
  );
}

export default Blog;
