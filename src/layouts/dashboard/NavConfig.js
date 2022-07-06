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
    title: 'Case library',
    icon: getIcon('codicon:law'),
    children: [
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
        title: 'dictionary',
        path: '/dictionary',
        icon: getIcon('heroicons-solid:library'),
      },
    ],
  },

  {
    title: 'Act /Ordinance/Rules',
    path: '',
    icon: getIcon('fa-brands:jedi-order'),
    children: [
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
    ],
  },

  {
    title: 'About Us',
    path: '/team',
    icon: getIcon('fluent:people-team-16-filled'),
    children: [
      {
        title: 'team',
        path: '/team',
        icon: getIcon('fluent:people-team-16-filled'),
      },
      {
        title: 'Video',
        path: '/aboutus',
        icon: getIcon('akar-icons:info'),
      },
    ],
  },
  {
    title: 'Service & Overseas chapter',
    icon: getIcon('carbon:ibm-security-services'),
    children: [
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
    ],
  },

  {
    title: 'blogs',
    icon: getIcon('eva:file-text-fill'),
    children: [
      {
        title: 'blog',
        path: '/blog',
        icon: getIcon('eva:file-text-fill'),
      },
      {
        title: 'Research & Insights',
        path: '/insights',
        icon: getIcon('ic:outline-insights'),
      },
    ],
  },

  {
    title: 'appointments',
    path: '/appointments',
    icon: getIcon('teenyicons:appointments-outline'),
    children: [
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
      {
        title: 'Assign Appointment',
        path: '/appointmentsController/assign',
        icon: getIcon('teenyicons:appointments-outline'),
      },
    ],
  },
  {
    title: 'backgrounds',
    path: '/background',
    icon: getIcon('icon-park-outline:background-color'),
  },
  {
    title: 'hero section',
    path: '/herosection',
    icon: getIcon('fa:header'),
  },

  {
    title: 'clients',
    path: '/clients',
    icon: getIcon('raphael:customer'),
  },

  {
    title: 'Admins',
    path: '/admins',
    icon: getIcon('eva:lock-fill'),
  },
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
