import { useRef, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Menu, MenuItem, IconButton, Container, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import CaseLawService from '../../services/CaseLawService';
// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { _deleteCase } = CaseLawService;
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
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              console.log('delete');
              _deleteCase(props.id)
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
          />
        </MenuItem>

        <MenuItem to={('/dashboard/editCase', { state: { modalMode: 1 } })} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              navigate('/dashboard/editCase', { state: { id: props.id } });
            }}
          />
        </MenuItem>
      </Menu>
    </Container>
  );
}
