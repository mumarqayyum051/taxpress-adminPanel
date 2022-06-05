import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { toast, ToastContainer } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import environment from '../../environment/env';
import StatuteService from '../../services/StatuteService';

const EditStatute = () => {
  const navigate = useNavigate();
  const { _editStatute, _getStatuteById } = StatuteService;
  const uploader = useRef();
  useEffect(() => {
    getStatute(id);
  }, []);
  const { fileURL } = environment;
  const { state } = useLocation();
  const { id } = state;
  const allowedFormates = ['pdf'];
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
      law_or_statute: '',
      chapter: '',
      section: '',
      text_search_1: '',
      text_search_2: '',
      file: '',
    },
    validationSchema: yup.object({
      law_or_statute: yup.string().required('Law or Statute is required'),
      chapter: yup.string().required('Chapter is required'),
      section: yup.string().required('Section is required'),
      text_search_1: yup.string().required('Text Search 1 is required'),
      text_search_2: yup.string().required('Text Search 2 is required'),
      file: yup.string().required('File is required'),
    }),

    onSubmit: (values) => {
      setFileError('');
      setIsSubmitting(true);

      console.log(values);
      if (!formik.isValid) {
        console.log(values);
      }
      if (!values.file) {
        setFileError('Please select a file');

        return;
      }

      if (!values.file.includes('pdf')) {
        setFileError('Please attach a pdf file');
        notify('Please attach a PDF file', 'warning');

        return;
      }
      _editStatute(formik.values, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Statute updated successfully', 'success');

            setTimeout(() => {
              navigate('/statutes');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(setIsSubmitting(false));
    },
  });

  const getStatute = (id) => {
    _getStatuteById(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          formik.setValues(res.data.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Edit Statute{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Law/Statute"
                    color="secondary"
                    id="law_or_statute"
                    type="text"
                    key="law_or_statute"
                    value={formik.values.law_or_statute}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.law_or_statute && formik.touched.law_or_statute ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.law_or_statute}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Chapter"
                    color="secondary"
                    id="chapter"
                    type="text"
                    key="chapter"
                    value={formik.values.chapter}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.chapter && formik.touched.chapter ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.chapter}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Search 1"
                    color="secondary"
                    id="text_search_1"
                    type="text"
                    key="text_search_1"
                    value={formik.values.text_search_1}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.text_search_1 && formik.touched.text_search_1 ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.text_search_1}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Search 2"
                    color="secondary"
                    id="text_search_2"
                    type="text"
                    key="text_search_2"
                    value={formik.values.text_search_2}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.text_search_2 && formik.touched.text_search_2 ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.text_search_2}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="section"
                    label="Section"
                    color="secondary"
                    key="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.section && formik.touched.section ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.section}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  {!formik.values?.file?.startsWith('uploads') ? (
                    <>
                      <FileBase64
                        onDone={(event) => {
                          console.log(event);
                          if (event.name.includes('pdf')) {
                            formik.setFieldValue('file', event.base64);
                            setFileError('');
                          } else {
                            formik.setFieldValue('file', '');

                            setFileError('Please upload a pdf file');
                            notify('Please attach a pdf file', 'warning');
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
                  <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                    Submit
                  </LoadingButton>
                </Grid>
                ;
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default EditStatute;
