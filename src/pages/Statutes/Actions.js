import { useRef, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { toast, ToastContainer } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import CaseLawService from '../../services/CaseLawService';
import StatuteService from '../../services/StatuteService';
// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
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

  const ref = useRef(null);
  const { _deleteStatute } = StatuteService;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            console.log('delete');
            _deleteStatute(props.id)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  props.onDelete();
                  setIsOpen(false);
                }
              })
              .catch((err) => {
                notify(err?.response?.data?.message, 'error');
              });
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              console.log('sdadasda', props.id);
              navigate('/editStatute', { state: { id: props.id } });
            }}
          />
        </MenuItem>
        <ToastContainer />
      </Menu>
    </>
  );
}
