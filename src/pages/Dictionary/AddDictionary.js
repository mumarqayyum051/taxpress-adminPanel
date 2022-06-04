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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';

import DictionaryService from '../../services/DictionaryService';

const AddDictionary = () => {
  const { _addDictionary } = DictionaryService;
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
      word: '',
      meaning: '',
      sld: '',
      file: '',
    },
    validationSchema: yup.object({
      word: yup.string().required('Word is required'),
      meaning: yup.string().required('Meaning is required'),
      sld: yup.number().required('SLD is required'),
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
      _addDictionary(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Word has been added to the dictionary',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/dictionary');
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
      setFileError('Please upload a pdf file');
      formik.setFieldValue('file', '');
      uploader.current.value = '';
    }
  };

  return (
    <Container>
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
                  <FileBase64
                    onDone={(event) => {
                      console.log(event);
                      if (event.name.includes('pdf')) {
                        formik.setFieldValue('file', event.base64);
                        setFileError('');
                      } else {
                        setFileError('Please upload a pdf file');
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

export default AddDictionary;
