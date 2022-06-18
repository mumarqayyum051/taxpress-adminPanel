/* eslint-disable react/jsx-key */
import { css } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { ORDINANCE } from '../../constants/constants';
import OrdinanceService from '../../services/OrdinanceService';
import Loader2 from '../../components/Loader2';

const Add = () => {
  const { _addOrdinanceDetail, _getAllOrdinanceByType } = OrdinanceService;

  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: blue;
  `;
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

  const getAllOrdinanceByType = async (type) => {
    setLoading(true);
    try {
      const response = await _getAllOrdinanceByType(type);
      if (response.status === 200) {
        setResult(response?.data?.data);
        console.log(response.data);

        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      file: '',
      title: '',
      ordinance_id: '',
      type_name: '',
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      file: yup.string().required('File is required'),
      ordinance_id: yup.string().required('Ordinance is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('title', values.title);
      formData.append('ordinance_id', values.ordinance_id);
      setIsSubmitting(true);
      _addOrdinanceDetail(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`${formik.values.type_name} details added successfully`, 'success');
            setTimeout(() => {
              navigate('/ordinanceDetail');
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
      {' '}
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : null}
      {loading ? (
        <>
          <Loader2 />
        </>
      ) : null}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Detail to Ordinance, Act or Rule
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
                      getAllOrdinanceByType(e.target.value);

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
                    id="ordinance_id"
                    label="Select Ordinance"
                    color="secondary"
                    key="ordinance_id"
                    onChange={(e) => {
                      console.log(e);
                      formik.setFieldValue('ordinance_id', e.target.value);
                    }}
                    select
                    fullWidth
                  >
                    {result.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.detail}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.errors.ordinance_id && formik.touched.ordinance_id ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.ordinance_id}</p>
                  ) : null}{' '}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="title"
                    label="Title"
                    color="secondary"
                    key="title"
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.title && formik.touched.title ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.title}</p>
                  ) : null}{' '}
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

export default Add;
