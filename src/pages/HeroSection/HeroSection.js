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
import { ToastContainer, toast } from 'react-toastify';

import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeroSectionService from '../../services/HeroSectionService';
import USERLIST from '../../_mock/user';
import environment from '../../environment/env';

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

export default function Dictionary() {
  const { _getHeroSection } = HeroSectionService;
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  const { fileURL } = environment;

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
  const [alert, setAlert] = useState({
    open: false,
    message: '',
  });
  useEffect(() => {
    getHeroSection();
  }, []);

  const getHeroSection = () => {
    _getHeroSection()
      .then((res) => {
        if (res.status === 200) {
          setCases(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(cases);
    const arr = applySortFilter(cases, getComparator('asc', 'name'), filterName);
    console.log(arr);
    if (arr.length === 0) {
      setisCaseNotFound(true);
      setFilteredCases([]);
    } else {
      setisCaseNotFound(false);

      setFilteredCases(arr);
    }
  }, [cases]);

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Hero Section
          </Typography>
          {filteredCases.length === 0 ? (
            <Button
              variant="contained"
              component={RouterLink}
              to="/heroSection/addHeroSection"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Update Hero Section
            </Button>
          ) : null}
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Label</TableCell>
                    <TableCell align="left">Link</TableCell>
                    {/* <TableCell align="left">Methods</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    console.log(row);
                    const { id, btnLink, btnText } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="left">{btnText}</TableCell>
                        <TableCell align="left">{btnLink}</TableCell>
                        <TableCell align="right">
                          <Actions
                            id={id}
                            onDelete={() => {
                              getHeroSection();
                              notify('Deleted Successfully', 'success');
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

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cases.length}
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
      <ToastContainer />
    </Page>
  );
}
