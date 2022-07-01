// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppointmentsService from '../../services/AppointmentsService';

export default function UserMoreMenu(props) {
  const { _changeAppointmentStatus } = AppointmentsService;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemText
            primary="Pending"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              _changeAppointmentStatus({ status: 'Pending' }, props.id)
                .then((res) => {
                  console.log(res);
                  props.onStatusChange();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemText
            primary="Completed"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              _changeAppointmentStatus({ status: 'Completed' }, props.id)
                .then((res) => {
                  console.log(res);
                  props.onStatusChange();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemText
            primary="Canceled"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              _changeAppointmentStatus({ status: 'Canceled' }, props.id)
                .then((res) => {
                  console.log(res);
                  props.onStatusChange();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
