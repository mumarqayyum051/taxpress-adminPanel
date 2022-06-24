/* eslint-disable react/jsx-key */
import { css } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';

import InsightsService from '../../services/InsightsService';

const Add = () => {
  const { _addInsight } = InsightsService;

  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
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

  const formik = useFormik({
    initialValues: {
      file: '',
      title: '',
      shortParagraph: '',
      date: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        year: 'numeric',
        month: 'numeric',
      }),
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      shortParagraph: yup.string().required('Short Paragraph is required'),
      file: yup.string().required('File is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('title', values.title);
      formData.append('date', values.date);
      formData.append('shortParagraph', values.shortParagraph);
      setIsSubmitting(true);
      _addInsight(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIsSubmitting(false);
            notify(`Insight added successfully`, 'success');
            setTimeout(() => {
              navigate('/insights');
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
            Add Research & Insights
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
                <Grid item xs={12} md={12}>
                  <TextField
                    id="shortParagraph"
                    label="Short Paragraph"
                    color="secondary"
                    key="title"
                    value={formik.values.shortParagraph}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.shortParagraph && formik.touched.shortParagraph ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.shortParagraph}</p>
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
