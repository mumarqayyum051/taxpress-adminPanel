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
  const [open, setOpen] = React.useState({
    open: false,
    message: '',
  });

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
      notificationTypeId: '',
      sroNO: '',
      year: '',
      dated: +new Date(),
      subject: '',
      file: '',
    },
    validationSchema: yup.object({
      law_or_statute_id: yup.string().required('Law or Statute is required'),
      notificationTypeId: yup.string().required('Notification Type is required'),
      sroNO: yup.string().required('SRO No is required'),
      year: yup.string().required('Year is required'),
      dated: yup.string().required('Date is required'),
      subject: yup.string().required('Subject is required'),
      file: yup.string().required('Please attach a PDF'),
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
            setOpen({
              open: true,
              message: 'Notification added successfully',
            });

            setTimeout(() => {
              setOpen({
                open: false,
                message: '',
              });
              navigate('/dashboard/notifications');
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
                      value={formik.values.notificationTypeId}
                      label="Statute"
                      onChange={(event) => {
                        formik.setFieldValue('notificationTypeId', event.target.value);
                      }}
                    >
                      {notificationTypes.map((notificationType) => (
                        <MenuItem value={notificationType.id} key={notificationType.id}>
                          {notificationType.notificationCategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.errors.notificationTypeId && formik.touched.notificationTypeId ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.notificationTypeId}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="sroNO"
                    label="SRO No"
                    color="secondary"
                    key="sroNO"
                    value={formik.values.sroNO}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.sroNO && formik.touched.sroNO ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.sroNO}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="year"
                    label="Year"
                    color="secondary"
                    key="year"
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

export default AddNotification;
