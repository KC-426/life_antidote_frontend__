// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  // {
  //   title: 'orders',
  //   path: '/dashboard/orders',
  //   icon: getIcon('bxs:box'),
  // },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'vendors',
  //   path: '/dashboard/vendor',
  //   icon: getIcon('entypo:shop'),
  // },
 
  {
    title: 'Categories',
    path: '/dashboard/categories',
    icon: getIcon('material-symbols:category-rounded'),
  },
{
title: "Brands",
path: '/dashboard/brands',
icon: getIcon('eva:image-fill')
},

  {
    title: 'Products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'banners',
    path: '/dashboard/banners',
    icon: getIcon('eva:image-fill'),
  },
  {
    title: 'mobile banners',
    path: '/dashboard/mobilebanners',
    icon: getIcon('eva:image-fill'),
  },
  {
    title: 'Enquiries',
    path: '/dashboard/enquiries',
    icon: getIcon('mdi:message-bookmark'),
  },
  // {
  //   title: ' Wholesale Enquiries',
  //   path: '/dashboard/wholesale-enquiries',
  //   icon: getIcon('fa-solid:boxes'),
  // },


  
  {
    title: 'blog categories',
    path: '/dashboard/blogs_categories',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'blogs',
    path: '/dashboard/blogs',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'faqs',
    path: '/dashboard/faqs',
    icon: getIcon('eva:file-text-fill'),
  },

];

export default navConfig;
