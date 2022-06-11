/* eslint-disable react/jsx-key */
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

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { SUPER_CATEGORIES } from '../../constants/constants';
import ServicesService from '../../services/ServicesService';
import ServiceTypeService from '../../services/ServiceTypeService';

const Add = () => {
  const { _createServiceType } = ServiceTypeService;
  const { _getAllServices } = ServicesService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
  const [result, setResult] = useState([]);

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      const result = await _getAllServices();
      if (result.status === 200) {
        setResult(result?.data?.data);
      }
    } catch (e) {
      console.log(e);
      notify('Error while fetching data', 'error');
    }
  };
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
      title: '',
      superCategory: '',
    },
    validationSchema: yup.object({
      superCategory: yup.string().required('Super Category is required'),
      title: yup.string().required('Please enter a title'),
    }),
    onSubmit: (values) => {
      console.log(values);

      setIsSubmitting(true);
      _createServiceType(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`Service Type added successfully`, 'success');
            setTimeout(() => {
              navigate('/serviceTypes');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          notify(err?.response?.data?.message, 'error');
          console.log(err);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Create Service Type{' '}
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
                      <MenuItem key={option.label} value={option.value}>
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
