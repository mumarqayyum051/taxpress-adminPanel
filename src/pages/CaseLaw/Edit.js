/* eslint-disable camelcase */
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { COURTS, MONTHS } from '../../constants/constants';
import environment from '../../environment/env';
import CaseLawService from '../../services/CaseLawService';
import StatuteService from '../../services/StatuteService';

const EditCase = () => {
  const courts = COURTS;
  const { _updateCase, _getCaseById } = CaseLawService;
  const { _getStatutesOnly } = StatuteService;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('Component Initiated');
    console.log('Component Initiated');
    getStatutes();
    getCaseById(id);
  }, []);
  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [statutes, setStatutes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [hasFile, setHasFile] = useState(false);

  useEffect(() => {
    setisLoading(false);
  }, []);
  const { fileURL } = environment;

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
      setIsSubmitting(true);
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
      // values.court = values.court.id;
      setIsSubmitting(true);
      _updateCase(formData, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Case updated successfully', 'success');
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
        })
        .finally(setIsSubmitting(false));
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
      formik.setFieldValue('file', '');
    }
  };

  const getStatutes = () => {
    setisLoading(true);
    _getStatutesOnly()
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res);
          setStatutes(res.data.data);
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const getCaseById = (id) => {
    setisLoading(true);

    _getCaseById(id)
      .then(async (res) => {
        if (res.status === 200) {
          console.log(res);
          if (res.data.data.length) {
            const response = res.data.data[0];
            console.log(res.data.data[0]);
            setHasFile(true);
            await formik.setValues(response);
            const court = _.findIndex(COURTS, ['label', response.court]);
            console.log(court);
            formik.setFieldValue('court', COURTS[court]);
            if (statutes.length) {
              const law_or_statute = _.findIndex(statutes, ['id', response.law_or_statute]);
              // console.log(law_or_statute);
              await formik.setFieldValue('law_or_statute', statutes[law_or_statute]);
              setisLoading(false);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  return (
    <Container>
      {' '}
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : null}
      {!isLoading ? (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
              Edit Case{' '}
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={4}>
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

                  <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={courts}
                      value={formik.values.court}
                      onChange={(event, newValue) => {
                        console.log(newValue);
                        formik.setFieldValue('court', newValue.label || '');
                      }}
                      renderInput={(params) => <TextField {...params} label="Court" />}
                      fullWidth
                    />
                    {formik.errors.court && formik.touched.court ? (
                      <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.court}</p>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      value={formik.values.law_or_statute}
                      getOptionLabel={(option) => option?.law_or_statute || ''}
                      onChange={(event, newValue) => {
                        console.log(newValue);
                        formik.setFieldValue('law_or_statute', newValue || '');
                      }}
                      renderInput={(params) => <TextField {...params} label="Law/Statute" />}
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
                    {!hasFile ? (
                      <>
                        <input
                          type="file"
                          onChange={(e) => {
                            console.log(e);
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
                        ) : null}
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
                            setHasFile(false);
                          }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    )}
                  </Grid>
                  {/* <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                    <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                      Update
                    </Button>
                  </Grid> */}
                  <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                    <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                      Update
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
      <ToastContainer />
    </Container>
  );
};

export default EditCase;
