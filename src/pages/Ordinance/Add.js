import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import StatuteService from '../../services/StatuteService';

const Add = () => {
  const { _addStatute } = StatuteService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const formik = useFormik({
    initialValues: {
      law_or_statute: '',
      chapter: '',
      section: '',
      textSearch1: '',
      textSearch2: '',
      file: '',
    },
    validationSchema: yup.object({
      law_or_statute: yup.string().required('Law or Statute is required'),
      chapter: yup.string().required('Chapter is required'),
      section: yup.string().required('Section is required'),
      textSearch1: yup.string().required('Text Search 1 is required'),
      textSearch2: yup.string().required('Text Search 2 is required'),
    }),

    onSubmit: (values) => {
      setFileError('');

      console.log(values);
      if (!values.file) {
        setFileError('Please select a file');
        return;
      }

      if (!values.file.includes('pdf')) {
        setFileError('Please attach a pdf file');
        return;
      }
      _addStatute(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Statute added successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/dashboard/statutes');
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
            Add Statute{' '}
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
                    id="textSearch1"
                    type="text"
                    key="textSearch1"
                    value={formik.values.textSearch1}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.textSearch1 && formik.touched.textSearch1 ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.textSearch1}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Search 2"
                    color="secondary"
                    id="textSearch2"
                    type="text"
                    key="textSearch2"
                    value={formik.values.textSearch2}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.textSearch2 && formik.touched.textSearch2 ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.textSearch2}</p>
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
                  <FileBase64
                    onDone={(event) => {
                      console.log(event);
                      if (event.name.includes('pdf')) {
                        formik.setFieldValue('file', event.base64);
                        setFileError('');
                      } else {
                        formik.setFieldValue('file', '');

                        setFileError('Please upload a pdf file');
                        setAlert({
                          open: true,
                          message: 'Please attach a pdf file',
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

export default Add;
