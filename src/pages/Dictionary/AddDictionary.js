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
import Loader2 from '../../components/Loader2';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';

import DictionaryService from '../../services/DictionaryService';

const AddDictionary = () => {
  const { _addDictionary } = DictionaryService;
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
      word: '',
      meaning: '',
      sld: '',
      file: '',
    },
    validationSchema: yup.object({
      word: yup.string().required('Word is required'),
      meaning: yup.string().required('Meaning is required'),
      sld: yup.number().required('SLD is required'),
      file: yup.string().required('File is required'),
    }),

    onSubmit: (values) => {
      setFileError('');

      const formData = new FormData();
      formData.append('word', values.word);
      formData.append('meaning', values.meaning);
      formData.append('sld', values.sld);
      formData.append('file', values.file);
      setIsSubmitting(true);
      _addDictionary(formData)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          if (res.status === 200) {
            notify(`Word has been added successfully`, 'success');
            setTimeout(() => {
              navigate('/dictionary');
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
            Add Dictionary{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="SLD"
                    color="secondary"
                    id="sld"
                    type="text"
                    key="sld"
                    value={formik.values.sld}
                    onChange={formik.handleChange}
                    InputProps={{
                      inputProps: {
                        type: 'number',
                        min: 0,
                      },
                    }}
                    fullWidth
                  />
                  {formik.errors.sld && formik.touched.sld ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.sld}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Word"
                    color="secondary"
                    id="word"
                    type="text"
                    key="word"
                    value={formik.values.word}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.word && formik.touched.word ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.word}</p>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    label="Meaning"
                    color="secondary"
                    id="meaning"
                    type="text"
                    key="meaning"
                    rows={3}
                    value={formik.values.meaning}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.meaning && formik.touched.meaning ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.meaning}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files[0].type !== 'application/pdf') {
                        notify('Please upload only pdf file', 'warning');
                        uploader.current.value = '';
                        return;
                      }
                      formik.setFieldValue('file', e.target.files[0]);
                    }}
                    accept="application/pdf"
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
