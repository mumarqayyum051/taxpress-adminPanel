/*   -disable react/jsx-key */
import { css } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import IconButton from '@mui/material/IconButton';
import { ORDINANCE } from '../../constants/constants';

import ServiceDetailService from '../../services/ServiceDetailService';

const Add = () => {
  const { _createServiceDetail } = ServiceDetailService;

  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
  const [result, setResult] = useState([]);
  const { state } = useLocation();
  const { superCategory, type } = useParams();

  // const { service, subService, serviceId, subServiceId } = state;
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

  const formik = useFormik({
    initialValues: {
      file: '',
      title: '',
      fee: '',
      highlights: '',
      completionTime: '',
      superCategory,
      type: type?.split('_').join(' '),
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      file: yup.string().required('File is required'),
      // highlights: yup.string().required('Please enter at lease one highlight'),
      fee: yup.number().required('Please enter a number figure'),
      superCategory: yup.string().required('Please select a super category'),
      type: yup.string().required('Please select a type'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      // formData.append('file', values.file);
      formData.append('title', values.title);
      formData.append('highlights', JSON.stringify(highlights));
      formData.append('fee', values.fee);
      formData.append('completionTime', values.completionTime);
      formData.append('superCategory', values.superCategory);
      formData.append('type', values.type);
      setIsSubmitting(true);
      _createServiceDetail(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`Service Created successfully`, 'success');
            setTimeout(() => {
              navigate(`/serviceDetails/${superCategory}/${type}`);
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
            Create Service
          </Typography>
          <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
            {superCategory}
            {' > '} {type}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
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
                <Grid item xs={6} md={6}>
                  <TextField
                    id="fee"
                    label="Fee"
                    color="secondary"
                    key="fee"
                    value={formik.values.fee}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.fee && formik.touched.fee ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.fee}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    id="completionTime"
                    label="Completion Time"
                    placeholder="1-5 Working Days"
                    color="secondary"
                    key="completionTime"
                    value={formik.values.completionTime}
                    onChange={formik.handleChange}
                    fullWidth
                  />

                  {formik.errors.completionTime && formik.touched.completionTime ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.completionTime}</p>
                  ) : null}
                </Grid>
                {highlights.map((highlight, index) =>
                  //   -disable-next-line react/jsx-key
                  [
                    //   -disable-next-line react/jsx-key
                    <Grid item xs={10} md={10}>
                      <TextField
                        label={index === 0 ? `Highlight` : `Highlight ${index}`}
                        color="secondary"
                        id={`name${index}`}
                        type="text"
                        key={`name${index}`}
                        name={`name${index}`}
                        onChange={(e) => {
                          setHighlights([
                            ...highlights.slice(0, index),
                            { id: index, name: e.target.value },
                            ...highlights.slice(index + 1),
                          ]);
                          formik.setFieldValue('highlights', highlights);
                        }}
                        fullWidth
                      />

                      {formik.errors.chapter && formik.touched.chapter ? (
                        <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.chapter}</p>
                      ) : null}
                    </Grid>,
                    <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey' }}>
                      <IconButton
                        aria-label="Add"
                        onClick={() => {
                          setHighlights([...highlights, '']);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>,
                    <>
                      {index !== 0 ? (
                        <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => {
                              setHighlights(highlights.filter((item, i) => i !== index));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      ) : (
                        ''
                      )}
                    </>,
                  ]
                )}

                {/* <Grid item xs={12} md={12}>
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

export default Add;
