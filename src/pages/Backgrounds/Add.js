import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { ToastContainer, toast } from 'react-toastify';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { COURTS, MONTHS, APPOINTMENT_TYPES } from '../../constants/constants';
import CaseLawService from '../../services/CaseLawService';
import StatuteService from '../../services/StatuteService';
import BackgroundService from '../../services/BackgroundService';

const AddBackground = () => {
  const { _uploadBg } = BackgroundService;
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const uploader = useRef();
  const [backgrounds, setBackgrounds] = useState([]);
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
  const date = new Date();

  const formik = useFormik({
    initialValues: {
      path: '',
      file: '',
    },

    validationSchema: yup.object({
      path: yup.string().required('Path is required'),
    }),

    onSubmit: (values) => {
      if (backgrounds.length === 0) {
        notify('Please upload a background', 'error');
        return;
      }
      console.log(values);
      setIsSubmitting(true);
      const formData = new FormData();
      backgrounds.forEach((bg) => {
        formData.append('file', bg.file);
      });
      formData.append('path', values.path);
      _uploadBg(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            notify('Background has been added and will reflect in a while', 'success');
            setIsSubmitting(false);
            setTimeout(() => {
              navigate('/backgrounds');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsSubmitting(false);
          notify(err?.response?.data?.message, 'error');
        });
    },
  });

  const handleImageDelete = (e) => {
    console.log(e);
    let temp = [...backgrounds];
    temp.splice(e, 1);
    console.log(temp);
    setBackgrounds(temp);
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" gutterBottom>
            Add Background
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Path"
                    color="secondary"
                    id="path"
                    type="text"
                    key="path"
                    value={formik.values.path}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.path && formik.touched.path ? (
                    <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.path}</p>
                  ) : null}
                </Grid>
                {backgrounds.length > 0 ? (
                  <Grid item xs={12} md={12}>
                    <Stack direction="row" spacing={1}>
                      {backgrounds.map((background, index) => (
                        <Chip
                          label={background.name}
                          key={index}
                          onDelete={() => {
                            handleImageDelete(index);
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          deleteIcon={<DeleteIcon />}
                        />
                      ))}
                    </Stack>
                  </Grid>
                ) : null}
                <Grid item xs={12} md={12}>
                  <input
                    type="file"
                    onChange={(e) => {
                      // allow png, jpg, jpeg
                      const fileType = e.target.files[0].type;
                      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg') {
                        formik.setFieldValue('file', e.target.files[0]);
                        // const backgrounds = [...formik.values.backgrounds];
                        setBackgrounds([...backgrounds, { name: e.target.files[0].name, file: e.target.files[0] }]);
                        console.log(backgrounds);
                        uploader.current.value = '';
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

export default AddBackground;
