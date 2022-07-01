/*  */
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
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import environment from '../../environment/env';
import OrdinanceService from '../../services/OrdinanceService';
import USERLIST from '../../_mock/user';
import InsightsService from '../../services/InsightsService';

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

const Insights = () => {
  const { _getAllInsights } = InsightsService;
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);

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
  const { fileURL } = environment;
  const [result, setResult] = useState([]);

  useEffect(() => {
    getAllInsights();
  }, []);

  const getAllInsights = () => {
    _getAllInsights()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setResult(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);

        notify(err?.message, 'error');
      });
  };
  useEffect(() => {
    console.log(result);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - result.length) : 0;

  return (
    <Page title="User">
      <Container>
        {' '}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Research & Insights
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/insights/addInsight"
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
                    <TableCell align="left" sx={{ width: '20%' }}>
                      Title
                    </TableCell>
                    <TableCell align="left" sx={{ width: '30%' }}>
                      Short Paragraph
                    </TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">File</TableCell>

                    {/* <TableCell align="right">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ id, title, file, date, shortParagraph }, i) => (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left" sx={{ width: '20%' }}>
                          {title}
                        </TableCell>

                        <TableCell align="left" sx={{ width: '30%' }}>
                          {shortParagraph}
                        </TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">
                          <Button size="small" variant="contained" href={fileURL + file} target="_blank" download>
                            <span>View File</span>
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Actions
                            id={id}
                            onDelete={() => {
                              getAllInsights();
                              notify('Deleted Successfully', 'success');
                            }}
                          />
                        </TableCell>
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
            count={result ? result.length : 0}
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
};

export default Insights;
