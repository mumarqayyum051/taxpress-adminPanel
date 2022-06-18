/* eslint-disable import/no-duplicates */
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
// eslint-disable-next-line import/no-duplicates

import TableHead from '@mui/material/TableHead';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader2 from '../../components/Loader2';
import Iconify from '../../components/Iconify';

import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import environment from '../../environment/env';
import ClientService from '../../services/ClientService';
import USERLIST from '../../_mock/user';
// mock
import Actions from './Actions';
import MemberAvatar from './ClientAvatar';

import Loader from '../../components/Loader';

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

export default function Clients() {
  const { _getAllClients } = ClientService;
  const { fileURL } = environment;
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

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

  const getClients = () => {
    setIsLoading(true);
    setLoading(true);
    _getAllClients()
      .then((res) => {
        if (res.status === 200) {
          setResult(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(setIsLoading(false));
  };
  useEffect(() => {
    const arr = applySortFilter(result, getComparator('asc', 'name'), filterName);
    console.log(arr);
    if (arr.length === 0) {
      setisCaseNotFound(true);
      setFilteredCases([]);
    } else {
      setisCaseNotFound(false);

      setFilteredCases(arr);
    }
  }, [result]);

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

  return (
    <Page title="User">
      <Container>
        {' '}
        {loading ? (
          <>
            <Loader2 />
          </>
        ) : null}
        {loading ? (
          <>
            <Loader2 />
          </>
        ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clients
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/clients/addClient"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Client
          </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Profile Picture</TableCell>
                    <TableCell>Client Name</TableCell>
                    <TableCell>Client Designation</TableCell>
                    <TableCell>Review</TableCell>
                    <TableCell sx={{ width: '20%' }}>Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    // eslint-disable-next-line camelcase
                    const { id, comment, review, clientDesignation, clientName, file, reviewTitle } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <MemberAvatar profilePicture={fileURL + file} clientName={clientName} />
                        </TableCell>
                        <TableCell>{clientName}</TableCell>
                        <TableCell>{clientDesignation}</TableCell>
                        <TableCell>{review}</TableCell>
                        <TableCell sx={{ width: '20%' }}>
                          {comment && comment?.length > 50 ? `${comment.slice(0, 80)}...` : comment}
                        </TableCell>

                        <TableCell align="right">
                          <Actions
                            id={id}
                            onDelete={() => {
                              getClients();

                              notify('Client has been deleted successfully', 'success');
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
            count={result.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <ToastContainer />
      </Container>
    </Page>
  );
}
