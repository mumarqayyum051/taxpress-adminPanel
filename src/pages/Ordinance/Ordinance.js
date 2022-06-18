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
import OrdinanceService from '../../services/OrdinanceService';
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
  console.log({ array });
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

const Ordinance = () => {
  const { _getAllOrdinance } = OrdinanceService;
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
    getAllOrdinance();
  }, []);

  const getAllOrdinance = () => {
    _getAllOrdinance()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
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
    console.log(statutes);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - statutes.length) : 0;

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
            Add Act, Ordinance, Rule
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/addOrdinance"
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
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left" sx={{ width: '50%' }}>
                      Hightlights
                    </TableCell>

                    <TableCell align="center">File</TableCell>
                    {/* <TableCell align="right">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ id, file, type, highlights }, i) => (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">{highlights[0].name}</TableCell>

                        <TableCell align="center">
                          <Button variant="contained" href={fileURL + file} target="_blank" download>
                            View
                          </Button>
                        </TableCell>
                        {/* <TableCell align="right">
                        <Actions
                            id={id}
                            onDelete={() => {
                              getAllOrdinance();
                              setAlert({
                                open: true,
                                message: 'Deleted Successfully',
                                severity: 'success',
                              });
                            }}
                          /> 
                        </TableCell> */}
                      </TableRow>
                    ))}
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
            count={statutes ? statutes.length : 0}
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
