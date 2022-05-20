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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import BlogsService from '../../services/BlogService';
import StatuteService from '../../services/StatuteService';

const AddBlog = () => {
  const { _createBlog } = BlogsService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['jpeg', 'png', 'jpg'];
  const [setFile, setFileError] = useState('');
  const [open, setOpen] = React.useState({
    open: false,
    message: '',
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      paragraph: '',
      date: +new Date(),
      shortParagraph: '',
      image: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      paragraph: yup.string().required('Paragraph is required'),

      date: yup.string().required('Date is required'),
      shortParagraph: yup.string().required('Short Paragraph is required'),
      image: yup.string().required('Please attach a Image'),
    }),

    onSubmit: (values) => {
      setFileError('');

      console.log(values);
      if (!values.image) {
        setFileError('Please select a file');
        return;
      }

      _createBlog(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setOpen({
              open: true,
              message: 'BLog added successfully',
            });

            setTimeout(() => {
              setOpen({
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

  const onFileUpload = (event) => {
    console.log(event.target.files[0]);
    setFileError('');
    const fileFormate = event.target.files[0].name.split('.').pop();
    console.log(fileFormate);
    const isValidFormate = allowedFormates.filter((formate) => formate === fileFormate).length;
    if (isValidFormate === 0) {
      setFileError('Please upload a Image file');
      uploader.current.value = '';
      return;
    }

    // formik.setFieldValue('file', event.target.files[0]);
    // fileToBase64(event);
    fileToBase64(event.target.files[0], (result) => {
      formik.setFieldValue('image', result);
      console.log(result);
    });
  };
  const fileToBase64 = async (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add BLog{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="title"
                    label="title"
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

                <Grid item xs={6} md={4}>
                  <TextField
                    color="secondary"
                    id="date"
                    type="date"
                    key="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.date && formik.touched.date ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.date}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="shortParagraph"
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
                  <input type="file" onChange={onFileUpload} ref={uploader} />
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
      {open
        ? [
            <Snackbar
              open={open.open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              TransitionComponent="SlideTransition"
              onClose={() => {
                setOpen({
                  open: false,
                  message: '',
                });
              }}
              key="Snackbar"
            >
              <Alert
                onClose={() => {
                  setOpen({
                    open: false,
                    message: '',
                  });
                }}
                severity="success"
                sx={{ width: '100%', background: '#28a793' }}
                key="alert"
              >
                {open.message}
              </Alert>
            </Snackbar>,
          ]
        : null}
    </Container>
  );
};

export default AddBlog;
