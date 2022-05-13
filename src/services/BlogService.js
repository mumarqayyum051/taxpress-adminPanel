import { _get, _post, _put, _delete } from './httpService';

const _createBlog = (blogData) => _post('/blogs/createBlog', blogData);

const _editBlog = (blogData, blogId) => _put(`/blogs/editBlogById/${blogId}`, blogData);

const _getSingleBlog = (blogId) => _get(`/blogs/getBlogById/${blogId}`);

const _getAllBlogs = () => _get('/blogs/getAllBlogs');

const _deleteBlog = (blogId) => _delete(`/blogs/deleteBlogById/${blogId}`);

const BlogsService = {
  _createBlog,
  _editBlog,
  _getSingleBlog,
  _getAllBlogs,
  _deleteBlog,
};

export default BlogsService;
