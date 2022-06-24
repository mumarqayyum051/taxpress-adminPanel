import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import { toast, ToastContainer } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';
import BlogsService from '../../services/BlogService';
import StatuteService from '../../services/StatuteService';
import environment from '../../environment/env';

const EditBlog = () => {
  const { _editBlog, _getSingleBlog } = BlogsService;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const { fileURL } = environment;
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await _getSingleBlog(id);
        console.log(blog);
        formik.setValues(blog?.data?.data[0]);
        setHasFile(true);
      } catch (err) {
        console.log(err);
      }
    };

    getBlog();
  }, []);
  const uploader = useRef();
  const [setFile, setFileError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = (message, type) =>
    toast(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type,
    });
  const formik = useFormik({
    initialValues: {
      title: '',
      paragraph: '',
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        year: 'numeric',
        month: 'numeric',
      }),
      short_paragraph: '',
      file: '',
      author: '',
    },
    validationSchema: yup.object({
      author: yup.string().required('Author is required'),
      title: yup.string().required('Title is required'),
      paragraph: yup.string().required('Paragraph is required'),

      short_paragraph: yup.string().required('Short Paragraph is required'),
      file: yup.string().required('Please attach an Image'),
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('paragraph', values.paragraph);
      formData.append('short_paragraph', values.short_paragraph);
      formData.append('author', values.author);
      formData.append('date', values.date);
      formData.append('file', values.file);

      setIsSubmitting(true);
      _editBlog(formData, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Blog Updated Successfully', 'success');
            setIsSubmitting(false);
            setTimeout(() => {
              navigate('/blog');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);

          notify(err?.message, 'error');
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Update Blog{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="author"
                    label="Author"
                    color="secondary"
                    key="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.author && formik.touched.author ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.author}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="title"
                    label="Title"
                    color="secondary"
                    key="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.title && formik.touched.title ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.title}</p>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    label="Short Paragraph"
                    color="secondary"
                    id="short_paragraph"
                    type="text"
                    key="short_paragraph"
                    rows={3}
                    value={formik.values.short_paragraph}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.short_paragraph && formik.touched.short_paragraph ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.short_paragraph}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Paragraph"
                    color="secondary"
                    id="paragraph"
                    type="text"
                    key="paragraph"
                    rows={3}
                    value={formik.values.paragraph}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.paragraph && formik.touched.paragraph ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.paragraph}</p>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={12}>
                  {!hasFile ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          // allow png, jpg, jpeg
                          console.log(e.target.files[0].type);
                          const fileType = e.target.files[0].type;
                          if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
                            formik.setFieldValue('file', e.target.files[0]);
                          } else {
                            notify('Please upload jpg or png file', 'warning');
                            uploader.current.value = '';
                          }
                        }}
                        accept="image/apng, image/avif, image/gif, image/jpeg, image/png"
                        ref={uploader}
                      />
                      {formik.errors.file && formik.touched.file ? (
                        <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.file}</p>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <Button variant="contained" href={fileURL + formik.values.file} target="_blank" download>
                        View file
                      </Button>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          formik.setFieldValue('file', '');
                          setHasFile(false);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </Grid>
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                    Update
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default EditBlog;
