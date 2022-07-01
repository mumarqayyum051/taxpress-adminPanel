import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import { ADMIN_TYPES } from '../../constants/constants';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FileBase64 from 'react-file-base64';

import RoleService from '../../services/RoleService';

const AddAdmin = () => {
  const { _addRole } = RoleService;
  const navigate = useNavigate();
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
      role: '',
      email: '',
      password: '',
      username: '',
    },
    validationSchema: yup.object({
      role: yup.string().required('Role is required'),
      email: yup.string().email('Please enter a valid email address').required('Email is required'),
      password: yup.string().required('Password is required'),
      username: yup.string().required('Username is required'),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true);
      _addRole(values)
        .then((res) => {
          console.log(res);
          setIsSubmitting(false);
          if (res.status === 200) {
            notify(`A new role has been created & added to admins list`, 'success');
            setTimeout(() => {
              navigate('/admins');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          {
            err?.response?.data?.message
              ? notify(err?.response?.data?.message, 'error')
              : notify(err?.message, 'error');
          }
          // notify(err?.response?.data?.message, 'error');
          console.log(err);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Admin
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="role"
                    select
                    label="Role"
                    color="secondary"
                    key="text"
                    value={formik.values.role}
                    onChange={(event) => {
                      formik.setFieldValue('role', event.target.value);
                    }}
                    fullWidth
                  >
                    {ADMIN_TYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.month && formik.touched.month ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.month}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Username"
                    color="secondary"
                    id="username"
                    type="text"
                    key="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.username}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Email"
                    color="secondary"
                    id="email"
                    type="text"
                    key="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.email}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Password"
                    color="secondary"
                    id="password"
                    type="password"
                    key="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.password}</p>
                  ) : null}
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

export default AddAdmin;
