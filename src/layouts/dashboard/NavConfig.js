// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'caselaws',
    path: '/dashboard/caselaws',
    icon: getIcon('ic:sharp-cases'),
  },
  {
    title: 'Notification',
    path: '/dashboard/notification',
    icon: getIcon('fa6-solid:blog'),
  },
  {
    title: 'Statute',
    path: '/dashboard/Statute',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Dictionary',
    path: '/dashboard/dictionary',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'statutes',
    path: '/dashboard/statutes',
    icon: getIcon('codicon:law'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'notifications',
    path: '/dashboard/notifications',
    icon: getIcon('ant-design:notification-filled'),
  },

  {
    title: 'dictionary',
    path: '/dashboard/dictionary',
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
