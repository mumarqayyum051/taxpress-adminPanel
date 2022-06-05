import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';
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
      setFileError('');
      console.log(values);
      if (!values.file) {
        setFileError('Please select a file');
        return;
      }

      _addNotification(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Notification added successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/notifications');
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
      <ToastContainer />
    </Container>
  );
};

export default AddNotification;
