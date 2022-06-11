import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import NotificationService from '../../services/NotificationService';
import StatuteService from '../../services/StatuteService';

const AddNotification = () => {
  const { _addNotification, _getNotificationTypes } = NotificationService;
  const { _getAllStatutes } = StatuteService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [notificationTypes, setNotificationTypes] = useState([]);
  const [statutes, setStatutes] = useState([]);

  useEffect(() => {
    getNotificationTypes();
    getAllStatutes();
  }, []);

  const getNotificationTypes = () => {
    _getNotificationTypes()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setNotificationTypes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllStatutes = () => {
    _getAllStatutes()
      .then((res) => {
        if (res.status === 200) {
          setStatutes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      law_or_statute_id: '',
      notification_type_id: '',
      sro_no: '',
      year: '',
      dated: '',
      subject: '',
      file: '',
    },
    validationSchema: yup.object({
      law_or_statute_id: yup.string().required('Law or Statute is required'),
      notification_type_id: yup.string().required('Notification Type is required'),
      sro_no: yup.string().required('SRO No is required'),
      year: yup.string().required('Year is required'),
      dated: yup.string().required('Date is required'),
      subject: yup.string().required('Subject is required'),
    }),

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('law_or_statute_id', values.law_or_statute_id);
      formData.append('notification_type_id', values.notification_type_id);
      formData.append('sro_no', values.sro_no);
      formData.append('year', values.year);
      formData.append('dated', values.dated);
      formData.append('subject', values.subject);
      formData.append('file', values.file);
      setIsSubmitting(true);
      _addNotification(formData)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          if (res.status === 200) {
            setTimeout(() => {
              navigate('/notifications');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);

          console.log(err);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Notification{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="notification">Notification</InputLabel>
                    <Select
                      labelId="notification"
                      id="notification"
                      value={formik.values.notification_type_id}
                      label="Notification Type"
                      onChange={(event) => {
                        console.log(event.target.value);
                        formik.setFieldValue('notification_type_id', event.target.value);
                      }}
                    >
                      {notificationTypes.map((notificationType) => (
                        <MenuItem value={notificationType.id} key={notificationType.id}>
                          {notificationType.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.errors.notification_type_id && formik.touched.notification_type_id ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.notification_type_id}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="sro_no"
                    label="SRO No"
                    color="secondary"
                    key="sro_no"
                    type="number"
                    value={formik.values.sro_no}
                    InputProps={{
                      inputProps: {
                        type: 'number',
                        min: 0,
                      },
                    }}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.sro_no && formik.touched.sro_no ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.sro_no}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="year"
                    label="Year"
                    color="secondary"
                    key="year"
                    type="number"
                    placeholder="2011"
                    InputProps={{
                      inputProps: {
                        type: 'number',
                        min: 1900,
                        max: 2100,
                      },
                    }}
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.year && formik.touched.year ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.year}</p>
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
                    label="Subject"
                    color="secondary"
                    id="subject"
                    type="text"
                    key="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.subject && formik.touched.subject ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.subject}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Law/Statute</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.law_or_statute_id}
                      label="Statute"
                      onChange={(event) => {
                        formik.setFieldValue('law_or_statute_id', event.target.value);
                      }}
                    >
                      {statutes.map((statute) => (
                        <MenuItem value={statute.id} key={statute.id}>
                          {statute.law_or_statute}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.errors.law_or_statute_id && formik.touched.law_or_statute_id ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.law_or_statute_id}</p>
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

export default AddNotification;
