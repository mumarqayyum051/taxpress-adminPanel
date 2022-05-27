import React, { useEffect, useState } from 'react';
/* eslint-disable camelcase */
// material
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// components
import TableHead from '@mui/material/TableHead';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import OrdinanceService from '../../services/OrdinanceService';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import environment from '../../environment/env';

// mock
import Actions from './Actions';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const Ordinance = () => {
  const { _getAllOrdinance } = OrdinanceService;

  const [result, setResult] = React.useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { fileURL } = environment;
  useEffect(() => {
    _getAllOrdinance().then((res) => {
      if (res.status === 200) {
        console.log(res);
        setResult(res.data.data);
      }
    });
  }, []);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result.length) : 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Act, Ordinance, Rule
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addOrdinance"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left" sx={{ width: '50%' }}>
                      Law/Statute
                    </TableCell>
                    <TableCell align="left">Chapter</TableCell>
                    <TableCell align="left">Section</TableCell>
                    <TableCell align="left">File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    // eslint-disable-next-line camelcase
                    const { id, law_or_statute, chapter, section, file } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>

                        <TableCell align="left" sx={{ width: '50%' }}>
                          {law_or_statute}
                        </TableCell>
                        <TableCell align="left">{chapter}</TableCell>
                        <TableCell align="left">{section}</TableCell>
                        <TableCell align="left">
                          <Button variant="contained" href={fileURL + file} target="_blank" download>
                            View
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Actions id={id} onDelete={() => {}} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={result.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
    </Page>
  );
};

export default Ordinance;
