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
import { MONTHS } from '../../constants/months';
import CaseLawService from '../../services/CaseLawService';

const AddCase = () => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];
  const { _addCase } = CaseLawService;
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
      year_or_vol: '',
      pageNo: '',
      month: '',
      law_or_statute: '',
      section: '',
      section2: '',
      court: '',
      caseNo: '',
      dated: '',
      textSearch1: '',
      textSearch2: '',
      phraseSearch: '',
      judge: '',
      lawyer: '',
      journals: '',
      appellant_or_opponent: '',
      principleOfCaseLaws: '',
      file: '',
    },
    validationSchema: yup.object({
      year_or_vol: yup.string().required('Required'),
      pageNo: yup.number().required('Required a number'),
      month: yup.string().required('Required'),
      law_or_statute: yup.string().required('Required'),
      section: yup.string().required('Required'),
      section2: yup.string().required('Required'),
      court: yup.string().required('Required'),
      caseNo: yup.string().required('Required'),
      dated: yup.string().required('Required'),
      textSearch1: yup.string().required('Required'),
      textSearch2: yup.string().required('Required'),
      phraseSearch: yup.string().required('Required'),
      judge: yup.string().required('Required'),
      lawyer: yup.string().required('Required'),
      journals: yup.string().required('Required'),
      appellant_or_opponent: yup.string().required('Required'),
      principleOfCaseLaws: yup.string().required('Required'),
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
      const lawyers = _.compact(formik.values.lawyer.split(','));
      const judges = _.compact(formik.values.judge.split(','));
      const caseNos = _.compact(formik.values.caseNo.split(','));
      const journals = _.compact(formik.values.journals.split(','));

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
      // formData.append('principleOfCaseLaws', values.principleOfCaseLaws);
      // formData.append('file', values.file);
      // console.log(...formData);
      _addCase(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setOpen({
              open: true,
              message: 'Case added successfully',
            });

            setTimeout(() => {
              setOpen({
                open: false,
                message: '',
              });
              navigate('/dashboard/caselaws');
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
            Add Case{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Page No"
                    color="secondary"
                    id="pageNo"
                    type="number"
                    InputProps={{
                      inputProps: {
                        type: 'number',
                        min: 0,
                      },
                    }}
                    key="pageNo"
                    value={formik.values.pageNo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.pageNo && formik.touched.pageNo ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.pageNo}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Year/Vol"
                    color="secondary"
                    id="year_or_vol"
                    type="text"
                    key="year_or_vol"
                    value={formik.values.year_or_vol}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.year_or_vol && formik.touched.year_or_vol ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.year_or_vol}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    id="month"
                    select
                    label="Month"
                    color="secondary"
                    key="month"
                    value={formik.values.month}
                    onChange={(event) => {
                      formik.setFieldValue('month', event.target.value);
                    }}
                    fullWidth
                  >
                    {MONTHS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.month && formik.touched.month ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.month}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
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
                <Grid item xs={6} md={4}>
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
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Phrase Search"
                    color="secondary"
                    id="phraseSearch"
                    type="text"
                    key="phraseSearch"
                    value={formik.values.phraseSearch}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.phraseSearch && formik.touched.phraseSearch ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.phraseSearch}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Judge"
                    color="secondary"
                    id="judge"
                    type="text"
                    key="judge"
                    value={formik.values.judge}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.judge && formik.touched.judge ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.judge}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Lawyer"
                    color="secondary"
                    id="lawyer"
                    type="text"
                    key="lawyer"
                    value={formik.values.lawyer}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.lawyer && formik.touched.lawyer ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.lawyer}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Appellant or Opponent"
                    color="secondary"
                    id="appellant_or_opponent"
                    type="text"
                    key="appellant_or_opponent"
                    value={formik.values.appellant_or_opponent}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.appellant_or_opponent && formik.touched.appellant_or_opponent ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.appellant_or_opponent}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Section 1"
                    color="secondary"
                    id="section"
                    type="text"
                    key="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.section && formik.touched.section ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.section}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={4}>
                  <TextField
                    label="Section 2"
                    color="secondary"
                    id="section2"
                    type="text"
                    key="section2"
                    value={formik.values.section2}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.section2 && formik.touched.section2 ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.section2}</p>
                  ) : null}
                </Grid>

                <Grid item xs={6} md={4}>
                  <TextField
                    color="secondary"
                    id="dated"
                    type="date"
                    key="dated"
                    value={formik.values.dated}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.dated && formik.touched.dated ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.dated}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Court"
                    color="secondary"
                    id="court"
                    type="text"
                    key="court"
                    value={formik.values.court}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.court && formik.touched.court ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.court}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Journals"
                    color="secondary"
                    id="journals"
                    type="text"
                    key="journals"
                    value={formik.values.journals}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.journals && formik.touched.journals ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.journals}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Law or Statute"
                    color="secondary"
                    id="law_or_statute"
                    type="text"
                    key="law_or_statute"
                    value={formik.values.law_or_statute}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.law_or_statute && formik.touched.law_or_statute ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.law_or_statute}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Case no"
                    color="secondary"
                    id="caseNo"
                    type="text"
                    key="caseNo"
                    value={formik.values.caseNo}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.caseNo && formik.touched.caseNo ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.caseNo}</p>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    label="Principle of Case Laws"
                    color="secondary"
                    id="principleOfCaseLaws"
                    type="text"
                    key="principleOfCaseLaws"
                    rows={3}
                    value={formik.values.principleOfCaseLaws}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.principleOfCaseLaws && formik.touched.principleOfCaseLaws ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.principleOfCaseLaws}</p>
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

export default AddCase;
