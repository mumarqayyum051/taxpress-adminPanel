import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
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

const EditBlog = () => {
  const { _createBlog } = BlogsService;
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();
  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      year: 'numeric',
      month: 'numeric',
    });
    console.log(date);
  }, []);
  const uploader = useRef();
  const allowedFormates = ['jpeg', 'png', 'jpg'];
  const [setFile, setFileError] = useState('');
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success',
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
      shortParagraph: '',
      image: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      paragraph: yup.string().required('Paragraph is required'),

      shortParagraph: yup.string().required('Short Paragraph is required'),
      image: yup.string().required('Please attach an Image'),
    }),

    onSubmit: (values) => {
      setFileError('');

      console.log(values);
      if (!values.image) {
        setFileError('Please upload a jpg, jpeg or png file');
        return;
      }

      _createBlog(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Blog added successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/dashboard/blog');
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
            Add Blog{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
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
                    id="shortParagraph"
                    type="text"
                    key="shortParagraph"
                    rows={3}
                    value={formik.values.shortParagraph}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.shortParagraph && formik.touched.shortParagraph ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.shortParagraph}</p>
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
                  <FileBase64
                    onDone={(event) => {
                      console.log(event);
                      if (event.name.includes('jpg') || event.name.includes('png') || event.name.includes('jpeg')) {
                        formik.setFieldValue('image', event.base64);
                        setFileError('');
                      } else {
                        formik.setFieldValue('image', '');
                        setFileError('Please upload a jpg, jpeg or png file');
                        setAlert({
                          open: true,
                          message: 'Please upload a jpg, jpeg or png file',
                          severity: 'info',
                        });
                      }
                    }}
                    ref={uploader}
                  />
                  {setFile ? <p style={{ color: 'red', fontSize: 12 }}>{setFile}</p> : null}
                </Grid>
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
      {alert
        ? [
            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              TransitionComponent="SlideTransition"
              onClose={() => {
                setAlert({
                  open: false,
                  message: '',
                });
              }}
              key="Snackbar"
            >
              <Alert
                onClose={() => {
                  setAlert({
                    open: false,
                    message: '',
                  });
                }}
                severity={alert.severity}
                sx={{ width: '100%' }}
                key="alert"
              >
                {alert.message}
              </Alert>
            </Snackbar>,
          ]
        : null}
    </Container>
  );
};

export default EditBlog;