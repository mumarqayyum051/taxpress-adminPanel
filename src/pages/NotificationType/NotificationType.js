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

const TABLE_HEAD = [{ id: 'category', label: 'category', alignRight: false }];

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
  const { _getAllNotificationTypes } = NotificationService;
  const [data, setData] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  useEffect(() => {
    getNotificationTypes();
  }, []);

  const getNotificationTypes = () => {
    _getAllNotificationTypes()
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(data);
    const arr = applySortFilter(data, getComparator('asc', 'name'), filterName);
    console.log(arr);
    if (arr.length === 0) {
      setisCaseNotFound(true);
      setFilteredCases([]);
    } else {
      setisCaseNotFound(false);

      setFilteredCases(arr);
    }
  }, [data]);

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
            Notification Types
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/addNotificationType"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Notification Type
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
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    console.log(row);
                    // eslint-disable-next-line camelcase
                    const { id, notificationCategoryName } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left" sx={{ width: '50%' }}>
                          {notificationCategoryName}
                        </TableCell>

                        <TableCell align="right">
                          <Actions id={id} onDelete={getNotificationTypes} />
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
            count={data.length}
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
