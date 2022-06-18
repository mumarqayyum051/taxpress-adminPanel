/* eslint-disable react/jsx-key */
import { css } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import Loader2 from '../../components/Loader2';
import { SUPER_CATEGORIES, SERVICE_CATEGORIES } from '../../constants/constants';
import ServicesService from '../../services/ServicesService';

const Add = () => {
  const { _createService } = ServicesService;

  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
  `;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: '',
      title: '',
      description: '',
      superCategory: '',
      serviceCategory: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      file: yup.string().required('File is required'),
      description: yup.string().required('Short Paragraph is required'),
      superCategory: yup.string().required('Super Category is required'),
      serviceCategory: yup.string().required('Service Category is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('title', values.title);
      formData.append('superCategory', values.superCategory);
      formData.append('description', values.description);
      formData.append('serviceCategory', values.serviceCategory);
      setIsSubmitting(true);
      _createService(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`${formik.values.superCategory.split(' ')[0]} service created successfully`, 'success');
            setTimeout(() => {
              navigate('/services');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          notify(err?.message, 'error');
          console.log(err);
        });
    },
  });

  return (
    <Container>
      {' '}
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : null}
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : null}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Service
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="superCategory"
                    select
                    label="Super Category"
                    color="secondary"
                    key="superCategory"
                    value={formik.values.superCategory}
                    onChange={(e) => {
                      formik.setFieldValue('superCategory', e.target.value);
                    }}
                    fullWidth
                  >
                    {SUPER_CATEGORIES.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.superCategory && formik.touched.superCategory ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.superCategory}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="serviceCategory"
                    select
                    label="Service Category"
                    color="secondary"
                    key="serviceCategory"
                    value={formik.values.serviceCategory}
                    onChange={(e) => {
                      formik.setFieldValue('serviceCategory', e.target.value);
                    }}
                    fullWidth
                  >
                    {SERVICE_CATEGORIES.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.serviceCategory && formik.touched.serviceCategory ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.serviceCategory}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="title"
                    label="Title"
                    color="secondary"
                    key="title"
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.title && formik.touched.title ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.title}</p>
                  ) : null}{' '}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="description"
                    label="Description"
                    color="secondary"
                    key="title"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.description && formik.touched.description ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.description}</p>
                  ) : null}{' '}
                </Grid>
                <Grid item xs={12} md={12}>
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
                  ) : null}{' '}
                </Grid>
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                    Submit
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

export default Add;
