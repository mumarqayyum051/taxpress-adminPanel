import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
import { COURTS, MONTHS, APPOINTMENT_TYPES } from '../../constants/constants';
import CaseLawService from '../../services/CaseLawService';
import StatuteService from '../../services/StatuteService';
import AppointmentsService from '../../services/AppointmentsService';

const AddBackground = () => {
  const courts = COURTS;
  const { _addCase } = CaseLawService;
  const { _createAppointment } = AppointmentsService;
  const navigate = useNavigate();
  useEffect(() => {}, []);
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
  const date = new Date();

  const formik = useFormik({
    initialValues: {
      startTime: date.toLocaleTimeString('en-GB'),
      endTime: date.toLocaleTimeString('en-GB'),
      consultant: '',
      appointmentType: '',
    },

    validationSchema: yup.object({
      startTime: yup.string().required('Start time is required'),
      endTime: yup.string().required('End time is required'),
      appointmentType: yup.string().required('Appointment type is required'),
    }),

    onSubmit: (values) => {
      console.log(values);
      setIsSubmitting(true);
      _createAppointment(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Appointment Slot has been added', 'success');
            setIsSubmitting(false);
            setTimeout(() => {
              navigate('/appointments');
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
            Create Appointment Slot
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      onChange={(e) => {
                        formik.setFieldValue('startTime', e.toLocaleTimeString('en-GB'));
                      }}
                      label="Start Time"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      onChange={(e) => {
                        formik.setFieldValue('endTime', e.toLocaleTimeString('en-GB'));
                      }}
                      label="End Time"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Consultant"
                    color="secondary"
                    id="consultant"
                    type="text"
                    key="consultant"
                    value={formik.values.consultant}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.consultant && formik.touched.consultant ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.consultant}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="appointmentType"
                    select
                    label="Appointment Type"
                    color="secondary"
                    key="appointmentType"
                    placeholder="Select Appointment Type"
                    value={formik.values.appointmentType}
                    onChange={(event) => {
                      formik.setFieldValue('appointmentType', event.target.value);
                    }}
                    fullWidth
                  >
                    {APPOINTMENT_TYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.appointmentType && formik.touched.appointmentType ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.appointmentType}</p>
                  ) : null}
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

export default AddBackground;
