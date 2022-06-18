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
import Loader2 from '../../components/Loader2';

// components
import TableHead from '@mui/material/TableHead';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import environment from '../../environment/env';
import StatusesService from '../../services/StatuteService';
import USERLIST from '../../_mock/user';
// mock
import Actions from './Actions';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log(array);
  if (!array.length) {
    return [];
  }
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Statutes() {
  const { _getAllStatutes } = StatusesService;
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { fileURL } = environment;
  const [statutes, setStatutes] = useState([]);

  useEffect(() => {
    getAllStatutes();
  }, []);

  const getAllStatutes = () => {
    _getAllStatutes()
      .then((res) => {
        if (res.status === 200) {
          setStatutes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        notify(err?.message, 'error');
      });
  };
  useEffect(() => {
    console.log(cases);
    const arr = applySortFilter(statutes, getComparator('asc', 'name'), filterName);
    console.log(arr);
    if (arr.length === 0) {
      setisCaseNotFound(true);
      setFilteredCases([]);
    } else {
      setisCaseNotFound(false);

      setFilteredCases(arr);
    }
  }, [statutes]);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const isUserNotFound = filteredCases.length === 0;

  return (
    <Page title="User">
      <Container>
        {' '}
        {loading ? (
          <>
            <Loader2 />
          </>
        ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Statutes
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/addStatute"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Statute
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
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
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
                          <Actions
                            id={id}
                            onDelete={() => {
                              getAllStatutes();
                              setAlert({
                                open: true,
                                message: 'Case Deleted Successfully',
                                severity: 'success',
                              });
                            }}
                          />
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
            count={statutes.length}
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
}
