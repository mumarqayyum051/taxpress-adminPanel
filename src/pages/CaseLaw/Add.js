import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';

import { ToastContainer, toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { COURTS, MONTHS } from '../../constants/constants';
import CaseLawService from '../../services/CaseLawService';
import StatuteService from '../../services/StatuteService';

const AddCase = () => {
  const courts = COURTS;
  const { _addCase } = CaseLawService;
  const { _getStatutesOnly } = StatuteService;
  const navigate = useNavigate();
  useEffect(() => {
    getStatutes();
  }, []);
  const uploader = useRef();
  const [setFile, setFileError] = useState('');
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
      year_or_vol: '',
      pageNo: '',
      month: '',
      law_or_statute_id: '',
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
      year_or_vol: yup.string().required('Year or Vol is required'),
      pageNo: yup.string().required('Page No is required'),
      month: yup.string().required('Month is required'),
      law_or_statute_id: yup.string().required('Law or Statute is required'),
      section: yup.string().required('Section is required'),
      section2: yup.string().required('Section2 is required'),
      court: yup.string().required('Court is required'),
      caseNo: yup.string().required('Case No is required'),
      dated: yup.string().required('Dated is required'),
      textSearch1: yup.string().required('Text Search1 is required'),
      textSearch2: yup.string().required('Text Search2 is required'),
      phraseSearch: yup.string().required('Phrase Search is required'),
      judge: yup.string().required('Judge is required'),
      lawyer: yup.string().required('Lawyer is required'),
      journals: yup.string().required('Journals is required'),
      appellant_or_opponent: yup.string().required('Appellant or Opponent is required'),
      principleOfCaseLaws: yup.string().required('Principle of Case Laws is required'),
      file: yup.string().required('File is required'),
    }),

    onSubmit: (values) => {
      setFileError('');

      console.log(values);
      if (!values.file) {
        setFileError('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('year_or_vol', values.year_or_vol);
      formData.append('pageNo', values.pageNo);
      formData.append('month', values.month);
      formData.append('law_or_statute_id', values.law_or_statute_id);
      formData.append('section', values.section);
      formData.append('section2', values.section2);
      formData.append('court', values.court);
      formData.append('caseNo', values.caseNo);
      formData.append('dated', values.dated);
      formData.append('textSearch1', values.textSearch1);
      formData.append('textSearch2', values.textSearch2);
      formData.append('phraseSearch', values.phraseSearch);
      formData.append('judge', values.judge);
      formData.append('lawyer', values.lawyer);
      formData.append('journals', values.journals);
      formData.append('appellant_or_opponent', values.appellant_or_opponent);
      formData.append('principleOfCaseLaws', values.principleOfCaseLaws);
      setIsSubmitting(true);
      _addCase(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Case has been added', 'success');
            setIsSubmitting(false);
            setTimeout(() => {
              navigate('/caselaws');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
          notify(err?.response?.data?.message, 'error');
        });
    },
  });

  const getStatutes = () => {
    _getStatutesOnly()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setStatutes(res.data.data);
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
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      views={['year']}
                      label="Year/Vol"
                      value={formik.values.year_or_vol}
                      sx={{  width: '100%' }}
                      onChange={(newValue) => {
                        console.log(newValue);
                        const date = new Date(newValue);
                        formik.setFieldValue('year_or_vol', date.getFullYear());
                      }}
                      renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                  </LocalizationProvider> */}
                  <TextField
                    label="Year/Vol"
                    color="secondary"
                    id="year_or_vol"
                    type="number"
                    key="year_or_vol"
                    InputProps={{
                      inputProps: {
                        type: 'number',
                        min: 0,
                      },
                    }}
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
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={courts}
                    value={courts.label}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      formik.setFieldValue('court', newValue?.label || '');
                    }}
                    renderInput={(params) => <TextField {...params} label="Court" />}
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
                  <Autocomplete
                    disablePortal
                    id="statutes"
                    options={statutes}
                    getOptionLabel={(option) => option.law_or_statute}
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      formik.setFieldValue('law_or_statute_id', newValue?.id || '');
                    }}
                    renderInput={(params) => <TextField {...params} label="Law/Statute" />}
                    fullWidth
                  />

                  {formik.errors.law_or_statute_id && formik.touched.law_or_statute_id ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.law_or_statute_id}</p>
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
                {/* <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </Grid> */}
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

export default AddCase;
