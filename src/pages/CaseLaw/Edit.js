/* eslint-disable camelcase */
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { fileURL } = environment;

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
      text_search_1: '',
      text_search_2: '',
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
      law_or_statute: yup.object().required('Required'),
      section: yup.string().required('Required'),
      section2: yup.string().required('Required'),
      court: yup.string().required('Required'),
      caseNo: yup.string().required('Required'),
      dated: yup.string().required('Required'),
      text_search_1: yup.string().required('Required'),
      text_search_2: yup.string().required('Required'),
      phraseSearch: yup.string().required('Required'),
      judge: yup.string().required('Required'),
      lawyer: yup.string().required('Required'),
      journals: yup.string().required('Required'),
      appellant_or_opponent: yup.string().required('Required'),
      principleOfCaseLaws: yup.string().required('Required'),
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
      values.law_or_statute = values.law_or_statute.id;
      // values.court = values.court.id;
      _updateCase(formik.values, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Case updated successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/caselaws');
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
                  <Grid item xs={12} md={4}>
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
                    {!formik.values.file.startsWith('uploads') ? (
                      <>
                        <FileBase64
                          onChange={onFileUpload}
                          onDone={(event) => {
                            console.log(event.base64);
                            formik.setFieldValue('file', event.base64);
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
                        {/* <IconButton aria-label="delete" href={fileURL + formik.values.file} target="_blank" download>
                          <PictureAsPdfIcon fontSize="inherit" />
                        </IconButton> */}

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
                    <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      ) : (
        ''
      )}
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

export default EditCase;
