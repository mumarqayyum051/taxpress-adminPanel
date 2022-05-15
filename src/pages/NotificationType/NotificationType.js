/* eslint-disable camelcase */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import TableHead from '@mui/material/TableHead';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';

import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import Actions from './Actions';
import USERLIST from '../../_mock/user';
import StatutesService from '../../services/StatuteService';
import CaseLawService from '../../services/CaseLawService';
import NotificationService from '../../services/NotificationService';
import environment from '../../environment/env';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'page', label: 'Page', alignRight: false },
  { id: 'court', label: 'Court', alignRight: false },
  { id: 'lawyer', label: 'Lawyer', alignRight: false },
  { id: 'judge', label: 'Judge', alignRight: false },
  { id: 'case', label: 'Case', alignRight: false },
];

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

export default function NotificationType() {
  const { _getAllNotifications } = NotificationService;
  const { _getStatuteById } = StatutesService;
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  const { fileURL } = environment;
  useEffect(() => {
    getAllCases();
  }, []);

  const getAllCases = () => {
    _getAllNotifications()
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

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

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
  const getStatuteByID = (id) => {
    StatutesService._getStatuteById(id)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
          return response.data.data[0]?.law_or_statute || '???';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notification
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/dashboard/addNotification"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Notification
          </Button>
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Notification</TableCell>
                    <TableCell sx={{ width: '15%' }}>SRO NO</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Dated</TableCell>
                    <TableCell>Law/Statute</TableCell>
                    <TableCell>File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    console.log(row);
                    // eslint-disable-next-line camelcase
                    const {
                      id,

                      sroNO,
                      subject,
                      year,
                      dated,
                      notificationCategoryName,
                      law_or_statute,
                      file,
                    } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">{notificationCategoryName}</TableCell>
                        <TableCell align="left">{sroNO}</TableCell>
                        <TableCell align="left">{subject}</TableCell>
                        <TableCell align="left">{year}</TableCell>
                        <TableCell align="left">{dated}</TableCell>
                        <TableCell align="left">{law_or_statute}</TableCell>
                        <TableCell align="left">
                          <Button size="small" href={fileURL + file} target="_blank" download>
                            View File
                          </Button>
                        </TableCell>
                        {/* <TableCell align="right">
                          <Actions id={id} onDelete={getAllCases} />
                        </TableCell> */}
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
      </Container>
    </Page>
  );
}
