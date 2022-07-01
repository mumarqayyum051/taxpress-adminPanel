/*   -disable no-nested-ternary */
/*   -disable camelcase */
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
  Chip,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  Switch,
  InputLabel,
} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { filter } from 'lodash';
import { format, compareAsc } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import Modal from '@mui/material/Modal';

import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import environment from '../../environment/env';
import CaseLawService from '../../services/CaseLawService';
import AppointmentsService from '../../services/AppointmentsService';
import RoleService from '../../services/RoleService';
import USERLIST from '../../_mock/user';
import useAuth from '../../hooks/useAuth';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

function InfoModal(props) {
  const [open, setOpen] = useState(props.showModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log('Modal Rendered');
  useEffect(() => {
    console.log(props.showModal);
    if (props.showModal) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.showModal, open]);
  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => {
          props.onClose();
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default function Appointments() {
  const { _getAllAppointments, _assignment } = AppointmentsService;
  const { _getRoles } = RoleService;
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [isCaseNotFound, setisCaseNotFound] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
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

  useEffect(() => {
    getAllAppointments();
    getRoles();
  }, []);

  const getAllAppointments = () => {
    _getAllAppointments()
      .then((res) => {
        if (res.status === 200) {
          setCases(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);

        notify(err?.response?.data?.message, 'error');
      });
  };
  const getRoles = () => {
    _getRoles()
      .then((res) => {
        if (res.status === 200) {
          setRoles(res.data.data);
        }
      })
      .catch((err) => {
        err?.response?.data?.message ? notify(err?.response?.data?.message, 'error') : notify(err?.message, 'error');
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
  const handleAssignment = (assignedTo, appointment) => {
    const data = {
      assignedTo,
      assignedBy: user.id,
    };
    _assignment(data, appointment.id)
      .then((res) => {
        if (res.status === 200) {
          notify(
            `Appointment has been assigned to ${roles.find((admin) => admin.id === assignedTo).username}`,
            'success'
          );
          getAllAppointments();
        }
      })
      .catch((err) => {
        err?.response?.data?.message ? notify(err?.response?.data?.message, 'error') : notify(err?.message, 'error');
      });
  };
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Appointments Controller
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/appointmentSlots/addSlot"
              startIcon={<Iconify icon="eva:plus-fill" />}
              sx={{ marginLeft: 2 }}
            >
              Create Slot
            </Button>
          </Box>
        </Stack>
        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">End Time</TableCell>
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Name</TableCell>
                    {/* <TableCell align="left">Email</TableCell> */}
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left" sx={{ width: '15%' }}>
                      Assign to
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    console.log(row);
                    const {
                      appointmentType,

                      client_email,
                      client_name,
                      client_phone,
                      date,
                      startTime,
                      endTime,
                      id,
                      status,
                      assignedTo,
                    } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">
                          {new Date(`1994/01/01 ${startTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {new Date(`1994/01/01 ${endTime}`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {appointmentType === 'physical_appointment'
                            ? 'Physical'
                            : appointmentType === 'call_appointment'
                            ? 'Call'
                            : null}
                        </TableCell>
                        <TableCell align="left">{client_name}</TableCell>
                        {/* <TableCell align="left">{client_email}</TableCell> */}
                        <TableCell align="left">{moment(date).format('DD-MMM-YYYY')}</TableCell>
                        <TableCell align="left">
                          <Chip
                            label={status}
                            color={
                              status === 'Completed'
                                ? 'success'
                                : status === 'Canceled'
                                ? 'error'
                                : status === 'Pending'
                                ? 'primary'
                                : 'primary'
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ width: '15%' }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-autowidth-label">Admin</InputLabel>

                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              label="Admin"
                              value={assignedTo || ''}
                              onChange={(e) => {
                                handleAssignment(e.target.value, row);
                              }}
                            >
                              {roles.map((role) => (
                                <MenuItem value={role.id}>{role.username}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <Actions
                            id={id}
                            refresh={() => {
                              getAllAppointments();
                            }}
                            onStatusChange={() => {
                              getAllAppointments();
                              notify('Appointment status has been updated successfully', 'success');
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
            count={cases.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <ToastContainer />
        <InfoModal
          showModal={showModal}
          onClose={() => {
            console.log('onclose');
            setShowModal(false);
          }}
        />
      </Container>
    </Page>
  );
}
