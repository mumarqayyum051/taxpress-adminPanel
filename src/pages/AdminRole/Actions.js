// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// component
import Iconify from '../../components/Iconify';
import RoleService from '../../services/RoleService';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const { _deleteRole } = RoleService;
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
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              console.log('delete');
              _deleteRole(props.id)
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
      </Menu>
    </>
  );
}
