import { Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// component
import Iconify from '../../components/Iconify';
import ClientService from '../../services/ClientService';
import AppointmentsService from '../../services/AppointmentsService';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { _deleteClient } = ClientService;
  const { _deleteAppointmentSlot } = AppointmentsService;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <Container>
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
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            _deleteClient(props.id)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  props.onDelete();

                  setIsOpen(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </Container>
  );
}
