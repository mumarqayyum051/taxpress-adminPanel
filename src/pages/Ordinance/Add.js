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
import { ORDINANCE } from '../../constants/constants';
import OrdinanceService from '../../services/OrdinanceService';

const Add = () => {
  const { _addOrdinance } = OrdinanceService;
  const navigate = useNavigate();

  const uploader = useRef();
  const allowedFormates = ['pdf'];
  const [setFile, setFileError] = useState('');
  const [highlights, setHighlights] = useState(['']);
  const [alert, setAlert] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const formik = useFormik({
    initialValues: {
      type: '',
      file: '',
    },
    validationSchema: yup.object({
      type: yup.string().required('Type is required'),
      file: yup.string().required('File is required'),
    }),
    onSubmit: (values) => {
      setFileError('');

      console.log(values);
      if (!values.file) {
        setFileError('Please select a file');
        return;
      }

      if (!values.file.includes('pdf')) {
        setFileError('Please attach a pdf file');
        return;
      }
      _addOrdinance({ highlights, ...formik.values })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setAlert({
              open: true,
              message: 'Aded successfully',
            });

            setTimeout(() => {
              setAlert({
                open: false,
                message: '',
              });
              navigate('/dashboard/ordinance');
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
            Add Act, Ordinance, Rule{' '}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="type"
                    select
                    label="Type"
                    color="secondary"
                    key="type"
                    value={formik.values.type}
                    onChange={(event) => {
                      console.log(event);
                      formik.setFieldValue('type', event.target.value);
                      console.log(formik.values.type);
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
                {highlights.map((highlight, index) =>
                  // eslint-disable-next-line react/jsx-key
                  [
                    // eslint-disable-next-line react/jsx-key
                    <Grid item xs={12} md={12}>
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
                        }}
                        fullWidth
                      />

                      {formik.errors.chapter && formik.touched.chapter ? (
                        <p style={{ color: 'red', fontSize: 12 }}>{formik.errors.chapter}</p>
                      ) : null}
                    </Grid>,
                    // <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey' }}>
                    //   <IconButton
                    //     aria-label="Add"
                    //     onClick={() => {
                    //       setHighlights([...highlights, '']);
                    //     }}
                    //   >
                    //     <AddIcon />
                    //   </IconButton>
                    // </Grid>,
                    // <>
                    //   {index !== 0 ? (
                    //     <Grid item xs={1} md={1} sx={{ display: 'flex', alignItems: 'center' }}>
                    //       <IconButton
                    //         aria-label="delete"
                    //         onClick={() => {
                    //           setHighlights(highlights.filter((item, i) => i !== index));
                    //         }}
                    //       >
                    //         <DeleteIcon />
                    //       </IconButton>
                    //     </Grid>
                    // ) : (
                    //   ''
                    // )}
                    // </>,
                  ]
                )}

                <Grid item xs={12} md={12}>
                  <FileBase64
                    onDone={(event) => {
                      console.log(event);
                      if (event.name.includes('pdf')) {
                        formik.setFieldValue('file', event.base64);
                        setFileError('');
                      } else {
                        formik.setFieldValue('file', '');

                        setFileError('Please upload a pdf file');
                        setAlert({
                          open: true,
                          message: 'Please attach a pdf file',
                          severity: 'info',
                        });
                      }
                    }}
                    ref={uploader}
                  />
                  {setFile ? <p style={{ color: 'red', fontSize: 12 }}>{setFile}</p> : null}
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
      {alert
        ? [
            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              TransitionComponent="SlideTransition"
              onClose={() => {
                setAlert({
                  open: false,
                  message: '',
                });
              }}
              key="Snackbar"
            >
              <Alert
                onClose={() => {
                  setAlert({
                    open: false,
                    message: '',
                  });
                }}
                severity={alert.severity}
                sx={{ width: '100%' }}
                key="alert"
              >
                {alert.message}
              </Alert>
            </Snackbar>,
          ]
        : null}
    </Container>
  );
};

export default Add;
