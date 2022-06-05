import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import TeamService from '../../services/TeamService';

const AddMember = () => {
  const { _addMember } = TeamService;
  const navigate = useNavigate();
  const uploader = useRef();

  const [setFile, setFileError] = useState('');

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
      name: '',
      designation: '',
      about: '',
      linkedIn: '',
      facebook: '',
      instagram: '',
      file: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name  is required'),
      designation: yup.string().required('Designation is required'),
      about: yup.string().required('About is required'),

      file: yup.mixed().required('File is required'),
    }),

    onSubmit: (values) => {
      console.log(values);
      _addMember(formik.values)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('A member has been added to the team', 'success');

            setTimeout(() => {
              navigate('/team');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({
            open: true,
            message: err?.response?.data?.message,
            severity: 'error',
          });
        })
        .finally(() => {
          setIsSubmitting(false);
          setTimeout(() => {
            setAlert({
              open: false,
              message: '',
            });
          }, 2000);
        });
    },
  });

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Member
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Name"
                    color="secondary"
                    id="name"
                    type="text"
                    key="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.name}</p>
                  ) : null}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    label="Designation"
                    color="secondary"
                    id="designation"
                    type="text"
                    key="designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.designation && formik.touched.designation ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.designation}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="About"
                    color="secondary"
                    id="about"
                    type="text"
                    key="about"
                    rows={3}
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    multiline
                    fullWidth
                  />
                  {formik.errors.about && formik.touched.about ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.about}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Facebook"
                    color="secondary"
                    id="facebook"
                    type="text"
                    key="facebook"
                    value={formik.values.facebook}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.facebook && formik.touched.facebook ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.facebook}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="LinkedIn"
                    color="secondary"
                    id="linkedIn"
                    type="text"
                    key="linkedIn"
                    value={formik.values.linkedIn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.linkedIn && formik.touched.linkedIn ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.linkedIn}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Instagram"
                    color="secondary"
                    id="instagram"
                    type="text"
                    key="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.instagram && formik.touched.instagram ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.instagram}</p>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <FileBase64
                    onDone={(event) => {
                      console.log(event);
                      if (event.name.includes('jpg') || event.name.includes('png') || event.name.includes('jpeg')) {
                        formik.setFieldValue('file', event.base64);
                        setFileError('');
                      } else {
                        formik.setFieldValue('file', '');
                        setFileError('Please upload a jpg, jpeg or png file');
                        setAlert({
                          open: true,
                          message: 'Please upload a jpg, jpeg or png file',
                          severity: 'info',
                        });
                      }
                    }}
                    ref={uploader}
                  />
                  {setFile ? <p style={{ color: 'red', fontSize: 12 }}>{setFile}</p> : null}
                </Grid>
                {/* <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </Grid> */}
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <LoadingButton
                    size="medium"
                    type="submit"
                    onClick={() => {
                      if (formik.isValid) {
                        setIsSubmitting(true);
                        formik.handleSubmit();
                      }
                    }}
                    variant="contained"
                    loading={isSubmitting}
                  >
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

export default AddMember;
