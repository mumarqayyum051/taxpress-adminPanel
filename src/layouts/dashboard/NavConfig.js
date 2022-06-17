// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
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
    title: 'team',
    path: '/team',
    icon: getIcon('fluent:people-team-16-filled'),
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
    title: 'Ordinance Detail',
    path: '/ordinanceDetail',
    icon: getIcon('fa-brands:jedi-order'),
  },
  {
    title: 'Research & Insights',
    path: '/insights',
    icon: getIcon('ic:outline-insights'),
  },
  {
    title: 'Services',
    path: '/services',
    icon: getIcon('carbon:ibm-security-services'),
  },
  {
    title: 'Service Type',
    path: '/serviceTypes',
    icon: getIcon('carbon:types'),
  },

  {
    title: 'dictionary',
    path: '/dictionary',
    icon: getIcon('heroicons-solid:library'),
  },
  {
    title: 'appointment slots',
    path: '/appointmentSlots',
    icon: getIcon('teenyicons:appointments-outline'),
  },
  {
    title: 'appointments',
    path: '/appointments',
    icon: getIcon('teenyicons:appointments-outline'),
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
