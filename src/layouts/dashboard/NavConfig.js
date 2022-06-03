// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'caselaws',
    path: '/caselaws',
    icon: getIcon('ic:sharp-cases'),
  },
  {
    title: 'statutes',
    path: '/statutes',
    icon: getIcon('codicon:law'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'notifications',
    path: '/notifications',
    icon: getIcon('ant-design:notification-filled'),
  },
  {
    title: 'notifications type',
    path: '/notificationsType',
    icon: getIcon('ic:baseline-notification-add'),
  },
  {
    title: 'Ordinance',
    path: '/ordinance',
    icon: getIcon('fa-brands:jedi-order'),
  },
  {
    title: 'Service Type',
    path: '/serviceTypes',
    icon: getIcon('carbon:ibm-security-services'),
  },
  {
    title: 'dictionary',
    path: '/dictionary',
    icon: getIcon('heroicons-solid:library'),
  },

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
