import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, Box } from '@mui/material';
// components
import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import BlogPostCard from './BlogCard';
// mock
import POSTS from '../../_mock/blog';

// ----------------------------------------------------------------------

import BlogService from '../../services/BlogService';

// ----------------------------------------------------------------------

export default function Blog() {
  const { _getAllBlogs } = BlogService;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    _getAllBlogs().then((res) => {
      if (res.status === 200) {
        console.log(res);
        setPosts(res.data.data);
      }
    });
  };
  return (
    <Page title="Dashboard: Blog">
      <Container>
        {' '}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blogs
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/blog/addBlog"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>
        {posts.length > 0 ? (
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                post={post}
                index={index}
                onDelete={() => {
                  console.log('on delete');
                  getAllBlogs();
                }}
              />
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2>No Blog</h2>
          </Box>
        )}
      </Container>
    </Page>
  );
}
