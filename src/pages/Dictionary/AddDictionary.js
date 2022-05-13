import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DictionaryService from '../../services/DictionaryService';

const AddDictionary = () => {
  const { _addDictionary } = DictionaryService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [open, setOpen] = React.useState({
    open: false,
    message: '',
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
      sld: yup.string().required('SLD is required'),
      file: yup.string().required('Required'),
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      setFileError('');

      console.log(values);
      if (!values.file) {
        setFileError('Please select a file');
        return;
      }

      // formData.append('year_or_vol', values.year_or_vol);
      // formData.append('pageNo', values.pageNo);
      // formData.append('month', values.month);
      // formData.append('law_or_statute', values.law_or_statute);
      // formData.append('section', values.section);
      // formData.append('section2', values.section2);
      // formData.append('court', values.court);
      // formData.append('caseNo', caseNos);
      // formData.append('dated', values.dated);
      // formData.append('textSearch1', values.textSearch1);
      // formData.append('textSearch2', values.textSearch2);
      // formData.append('phraseSearch', values.phraseSearch);
      // formData.append('judge', judges);
      // formData.append('lawyer', lawyers);
      // formData.append('journals', journals);
      // formData.append('appellant_or_opponent', values.appellant_or_opponent);
      // formData.append('principleOfDictionaryLaws', values.principleOfDictionaryLaws);
      // formData.append('file', values.file);
      // console.log(...formData);
      _addDictionary(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setOpen({
              open: true,
              message: 'Dictionary added successfully',
            });

            setTimeout(() => {
              setOpen({
                open: false,
                message: '',
              });
              navigate('/dashboard/dictionary');
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
      uploader.current.value = '';
      return;
    }

    // formik.setFieldValue('file', event.target.files[0]);
    // fileToBase64(event);
    fileToBase64(event.target.files[0], (result) => {
      formik.setFieldValue('file', result);
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
            Add Dictionary{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Word"
                    color="secondary"
                    id="word"
                    type="text"
                    key="word"
                    value={formik.values.word}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.word && formik.touched.word ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.word}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="SLD"
                    color="secondary"
                    id="sld"
                    type="text"
                    key="sld"
                    value={formik.values.sld}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.sld && formik.touched.sld ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.sld}</p>
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
                  <input type="file" onChange={onFileUpload} ref={uploader} />
                  {setFile ? <p style={{ color: 'red', fontSize: 12 }}>{setFile}</p> : null}
                </Grid>
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" color="info" size="small" type="submit" onClick={formik.handleSubmit}>
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
                sx={{ width: '100%' }}
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

export default AddDictionary;
