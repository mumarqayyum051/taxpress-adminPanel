import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';

import AboutusService from '../../services/AboutusService';

const AddDictionary = () => {
  const { _changeAboutus } = AboutusService;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');

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
      youtubeVideoId: '',
      file: '',
    },
    validationSchema: yup.object({
      youtubeVideoId: yup.string().required('Please enter youtube video id'),
      file: yup.string().required('Please upload file'),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true);
      _changeAboutus(values)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          if (res.status === 200) {
            notify(`About us section will now be updated in a whlie`, 'success');
            setTimeout(() => {
              navigate('/aboutus');
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Change About us
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Youtube Video Id"
                    color="secondary"
                    id="youtubeVideoId"
                    type="text"
                    key="youtubeVide"
                    value={formik.values.youtubeVide}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.youtubeVide && formik.touched.youtubeVide ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.youtubeVide}</p>
                  ) : null}
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

export default AddDictionary;
