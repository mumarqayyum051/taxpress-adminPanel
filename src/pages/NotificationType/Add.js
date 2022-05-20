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
import NotificationService from '../../services/NotificationService';

const AddNotificationType = () => {
  const { _addNotificationType } = NotificationService;
  const navigate = useNavigate();
  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [data, setData] = useState([]);
  const [statutes, setStatutes] = useState([]);
  const [open, setOpen] = React.useState({
    open: false,
    message: '',
  });

  const formik = useFormik({
    initialValues: {
      notificationCategoryName: '',
    },
    validationSchema: yup.object({
      notificationCategoryName: yup.string().required('Category  is required'),
    }),

    onSubmit: (values) => {
      _addNotificationType(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setOpen({
              open: true,
              message: 'Notification type created successfully',
            });

            setTimeout(() => {
              setOpen({
                open: false,
                message: '',
              });
              navigate('/dashboard/notificationsType');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Notification Type{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Category"
                    color="secondary"
                    id="notificationCategoryName"
                    type="text"
                    key="notificationCategoryName"
                    value={formik.values.notificationCategoryName}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.notificationCategoryName && formik.touched.notificationCategoryName ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.notificationCategoryName}</p>
                  ) : null}
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
                sx={{ width: '100%', background: '#28a793' }}
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

export default AddNotificationType;
