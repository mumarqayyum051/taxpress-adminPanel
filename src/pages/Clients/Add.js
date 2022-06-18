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
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ClientSerivce from '../../services/ClientService';

const AddClient = () => {
  const { _addClient } = ClientSerivce;
  const navigate = useNavigate();
  const uploader = useRef();

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
      clientName: '',
      clientDesignation: '',
      review: '',
      reviewTitle: '',
      comment: '',
      file: '',
    },
    validationSchema: yup.object({
      clientName: yup.string().required('Client Name is required'),
      clientDesignation: yup.string().required('Client Designation is required'),
      review: yup.string().required('Review is required'),
      reviewTitle: yup.string().required('Review Title is required'),
      comment: yup.string().required('Comment is required'),
      file: yup.string().required('File is required'),
    }),

    onSubmit: (values) => {
      console.log(values);

      const formData = new FormData();

      formData.append('clientName', values.clientName);
      formData.append('clientDesignation', values.clientDesignation);
      formData.append('review', values.review);
      formData.append('reviewTitle', values.reviewTitile);
      formData.append('comment', values.comment);
      formData.append('file', values.file);

      setIsSubmitting(true);

      _addClient(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('A client has been added', 'success');

            setTimeout(() => {
              navigate('/clients');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);

          notify(err?.response?.data?.message, 'error');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Client
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Client Name"
                    color="secondary"
                    id="clientName"
                    type="text"
                    key="clientName"
                    value={formik.values.clientName}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.clientName && formik.touched.clientName ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.clientName}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Client Designation"
                    color="secondary"
                    id="clientDesignation"
                    type="text"
                    key="clientDesignation"
                    value={formik.values.clientDesignation}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.clientDesignation && formik.touched.clientDesignation ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.designation}</p>
                  ) : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <TextField
                    label="Review"
                    color="secondary"
                    id="review"
                    key="review"
                    value={formik.values.review}
                    onChange={(e) => {
                      let value = parseInt(e.target.value, 10);

                      if (value > 5) value = 5;
                      if (value < 1) value = 1;
                      formik.setFieldValue('review', value);
                    }}
                    type="number"
                    InputProps={{ min: 1, max: 5 }}
                    fullWidth
                  />
                  {formik.errors.review && formik.touched.review ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.review}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Review Title"
                    color="secondary"
                    id="reviewTitle"
                    type="text"
                    key="reviewTitle"
                    value={formik.values.reviewTitle}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.reviewTitle && formik.touched.reviewTitle ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.reviewTitle}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Feedback"
                    color="secondary"
                    id="comment"
                    type="text"
                    key="comment"
                    rows={3}
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.comment && formik.touched.comment ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.comment}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <input
                    type="file"
                    onChange={(e) => {
                      // allow png, jpg, jpeg
                      console.log(e.target.files[0].type);
                      const fileType = e.target.files[0].type;
                      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
                        formik.setFieldValue('file', e.target.files[0]);
                      } else {
                        notify('Please upload jpg or png file', 'warning');
                        uploader.current.value = '';
                      }
                    }}
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png"
                    ref={uploader}
                  />
                  {formik.errors.file && formik.touched.file ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.file}</p>
                  ) : null}{' '}
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

export default AddClient;
