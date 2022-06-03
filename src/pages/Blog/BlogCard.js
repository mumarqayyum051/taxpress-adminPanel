import { Card, CardContent, Grid, Alert, Snackbar, Box, Link, Avatar } from '@mui/material';
// material
import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import environment from '../../environment/env';
import BlogService from '../../services/BlogService';
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 16,
  height: 16,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
  borderRadius: '0%',
  fontSize: '8px !important',
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard(props) {
  const { post, index } = props;
  const { id, date, file, title } = post;
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const navigate = useNavigate();
  const { _deleteBlog } = BlogService;
  const { fileURL } = environment;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card
        sx={{ position: 'relative' }}
        onMouseEnter={() => {
          setShowDeleteIcon(true);
        }}
        onMouseLeave={() => {
          setShowDeleteIcon(false);
        }}
      >
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {showDeleteIcon ? (
            <AvatarStyle
              alt={'Delete Blog'}
              src="static/icons/trash-solid.svg"
              sx={{
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 20,
                  height: 20,
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }),
              }}
              onClick={() => {
                _deleteBlog(id).then((response) => {
                  if (response.status === 200) {
                    setAlert({
                      open: true,
                      message: 'Blog deleted successfully',
                      severity: 'success',
                    });
                    props.onDelete();
                    setTimeout(() => {
                      setAlert({
                        open: false,
                        message: '',
                        severity: 'success',
                      });
                    }, 15000);
                  }
                });
              }}
            />
          ) : null}
          <CoverImgStyle alt={title} src={fileURL + file} />
        </CardMediaStyle>
        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography
            color="inherit"
            variant="subtitle2"
            onClick={() => {
              navigate('/blog/editBlog', { state: { id } });
            }}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
                cursor: 'pointer',
                '&:hover': {
                  color: '#ffffff',
                  textDecoration: 'underline #ffffff',
                },
              }),
            }}
          >
            {title}
          </Typography>
          <span style={{ fontSize: 12, color: 'white' }}>{format(new Date(date), 'MMM dd, yyyy')}</span>
        </CardContent>
      </Card>
      {alert
        ? [
            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              TransitionComponent="SlideTransition"
              onClose={() => {
                setAlert({
                  open: false,
                  message: '',
                });
              }}
              key="Snackbar"
            >
              <Alert
                onClose={() => {
                  setAlert({
                    open: false,
                    message: '',
                  });
                }}
                severity={alert.severity}
                sx={{ width: '100%' }}
                key="alert"
              >
                {alert.message}
              </Alert>
            </Snackbar>,
          ]
        : null}
    </Grid>
  );
}
