import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import environment from '../../environment/env';
import TeamService from '../../services/TeamService';

const EditMember = () => {
  const { _editMember, _getMember } = TeamService;
  const navigate = useNavigate();
  const uploader = useRef();
  const { state } = useLocation();
  const { id } = state;
  const { fileURL } = environment;
  const [setFile, setFileError] = useState('');

  const [hasFile, setHasFile] = useState(false);

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

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('designation', values.designation);
      formData.append('about', values.about);
      formData.append('linkedIn', values.linkedIn);
      formData.append('facebook', values.facebook);
      formData.append('instagram', values.instagram);
      formData.append('file', values.file);

      setIsSubmitting(true);

      _editMember(formData, id)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Member details have been updated', 'success');

            setTimeout(() => {
              navigate('/team');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          notify(err?.message, 'error');
        })
        .finally(() => {
          setIsSubmitting(false);
          setTimeout(() => {}, 2000);
        });
    },
  });

  useEffect(() => {
    _getMember(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          formik.setValues(response?.data?.data);
          setHasFile(true);
        }
      })
      .catch((err) => {
        console.log(err);

        notify(err?.message, 'error');
      })
      .finally(() => {});
  }, []);

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Edit Member
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
                  {!hasFile ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <Button variant="contained" href={fileURL + formik.values.file} target="_blank" download>
                        View file
                      </Button>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          formik.setFieldValue('file', '');
                          setHasFile(false);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                </Grid>
                {/* <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <Button variant="contained" size="medium" type="submit" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </Grid> */}
                <Grid item container xs={12} md={12} direction="row" justifyContent="center" alignItems="center">
                  <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
                    Update
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

export default EditMember;
