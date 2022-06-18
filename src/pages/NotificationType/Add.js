import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';

import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Loader2 from '../../components/Loader2';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast, ToastContainer } from 'react-toastify';

import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import NotificationService from '../../services/NotificationService';

const AddNotificationType = () => {
  const { _addNotificationType } = NotificationService;
  const navigate = useNavigate();
  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [data, setData] = useState([]);
  const [statutes, setStatutes] = useState([]);

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
    },
    validationSchema: yup.object({
      title: yup.string().required('Category  is required'),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true);

      _addNotificationType(formik.values)
        .then((res) => {
          console.log(res);
          setIsSubmitting(true);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify('Notification Type Added Successfully', 'success');
            setTimeout(() => {
              navigate('/notificationsType');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          notify(err.message, 'error');
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Notification Type{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Category"
                    color="secondary"
                    id="title"
                    type="text"
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

export default AddNotificationType;
