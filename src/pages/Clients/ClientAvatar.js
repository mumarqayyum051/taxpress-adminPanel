import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function MemberAvatar(props) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={props.clientName} src={props.profilePicture} />
    </Stack>
  );
}
