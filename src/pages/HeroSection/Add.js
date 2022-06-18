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

import HeroSectionService from '../../services/HeroSectionService';

const AddDictionary = () => {
  const { _createHeroSection } = HeroSectionService;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [loading, setLoading] = useState(false);

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
      btnLink: '',
      btnText: '',
    },
    validationSchema: yup.object({
      btnLink: yup.string().required('Required'),
      btnText: yup.string().required('Required'),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true);
      _createHeroSection(values)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          if (res.status === 200) {
            notify(`Hero section will now be updated in a whlie`, 'success');
            setTimeout(() => {
              navigate('/herosection');
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Change Hero Section
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Label"
                    color="secondary"
                    id="btnText"
                    type="text"
                    key="btnText"
                    value={formik.values.btnText}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.btnText && formik.touched.btnText ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.btnText}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Link"
                    color="secondary"
                    id="btnLink"
                    type="text"
                    key="btnLink"
                    value={formik.values.btnLink}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.btnLink && formik.touched.btnLink ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.btnLink}</p>
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

export default AddDictionary;
