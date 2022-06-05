import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
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
  useEffect(() => {
    const getBlog = async () => {
      try {
        const blog = await _getSingleBlog(id);
        console.log(blog);
        formik.setValues(blog?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBlog();
  }, []);
  const uploader = useRef();
  const [setFile, setFileError] = useState('');
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

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
      setFileError('');

      console.log(values);
      if (!values.file) {
        setFileError('Please upload a jpg, jpeg or png file');
        return;
      }

      _editBlog(formik.values, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Blog updated successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/blog');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
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
                  {!formik.values?.file?.startsWith('uploads') ? (
                    <>
                      <FileBase64
                        onDone={(event) => {
                          console.log(event);
                          if (event.name.includes('jpg') || event.name.includes('png') || event.name.includes('jpeg')) {
                            formik.setFieldValue('file', event.base64);
                            setFileError('');
                          } else {
                            formik.setFieldValue('file', '');
                            setFileError('Please upload a jpg, jpeg or png file');
                            notify('Please upload a jpg, jpeg or png file', 'warning');
                          }
                        }}
                        ref={uploader}
                      />
                      {setFile ? <p style={{ color: 'red', fontSize: 12 }}>{setFile}</p> : null}
                    </>
                  ) : (
                    <>
                      <Button variant="contained" href={fileURL + formik.values.file} target="_blank" download>
                        View file
                      </Button>
                      {/* <IconButton aria-label="delete" href={fileURL + formik.values.file} target="_blank" download>
                          <PictureAsPdfIcon fontSize="inherit" />
                        </IconButton> */}

                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          formik.setFieldValue('file', '');
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </Grid>
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                    Update
                  </Button>
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
