/* eslint-disable react/jsx-key */
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
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
import React, { useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

import { ORDINANCE } from '../../constants/constants';
import OrdinanceService from '../../services/OrdinanceService';

const Add = () => {
  const { _addOrdinance } = OrdinanceService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');

  const [highlights, setHighlights] = useState(['']);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      detail: '',
      type_name: '',
    },
    validationSchema: yup.object({
      type_name: yup.string().required('Type is required'),
      detail: yup.string().required('Detail is required'),
    }),
    onSubmit: (values) => {
      console.log(values);

      setIsSubmitting(true);
      _addOrdinance({ highlights, ...formik.values })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`${formik.values.type_name} added successfully`, 'success');
            setTimeout(() => {
              navigate('/ordinance');
            }, 2000);
          }
        })
        .catch((err) => {
          setIsSubmitting(false);
          notify(err?.response?.data?.message, 'error');
          console.log(err);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Act, Ordinance, Rule{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="type_name"
                    select
                    label="Type"
                    color="secondary"
                    key="type_name"
                    value={formik.values.type_name}
                    onChange={(e) => {
                      formik.setFieldValue('type_name', e.target.value);
                    }}
                    fullWidth
                  >
                    {ORDINANCE.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.month && formik.touched.month ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.month}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="detail"
                    label="Detail"
                    color="secondary"
                    key="detail"
                    value={formik.values.detail}
                    onChange={formik.handleChange}
                    fullWidth
                  />
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

export default Add;
