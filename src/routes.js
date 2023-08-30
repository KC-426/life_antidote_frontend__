import { Navigate, useRoutes,BrowserRouter,Route,Routes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import { UseContextState } from './global/GlobalContext/GlobalContext';

import User from './pages/User';
import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Category from './pages/Category';
import Brands from './pages/Brands';
import ProtectedRoute from './utils/ProtectedRoute';
import Banners from './pages/Banners';
import AvailableDoctors from './pages/AvailableDoctors';
import Enquiry from "./pages/Enquiry"
import WholesaleEnquiry from "./pages/WholesaleEnquiry"


// ----------------------------------------------------------------------

export default function Router() {
  const {authState} = UseContextState()

  console.log("AUTHSTATE",authState)
  const userState = authState.isAuthenticated
     return (
     <Routes>
     <Route element={<ProtectedRoute/>} >
     <Route exact path="/"  element={ <Navigate to='/dashboard/products' />    }  />    
     <Route path="/dashboard/users" element={ <DashboardLayout Component={<User/>} />} />
     <Route path="/dashboard/products" element={ <DashboardLayout Component={<Products/>} />} />
     {/* <Route path="/dashboard/blog" element={ <DashboardLayout Component={<Blog/>} />} /> */}
     <Route path="/dashboard/orders" element={ <DashboardLayout Component={<Orders/>} />} />
     {/* <Route path="/dashboard/available-doctors" element={ <DashboardLayout Component={<AvailableDoctors/>} />} /> */}
     <Route path="/dashboard/enquiries" element={ <DashboardLayout Component={<Enquiry />} />} />
     {/* <Route path="/dashboard/wholesale-enquiries" element={ <DashboardLayout Component={<WholesaleEnquiry />} />} /> */}
     {/* <Route path="/dashboard/vendor" element={ <DashboardLayout Component={<Vendor/>} />}/> */}
     <Route path="/dashboard/categories" element={ <DashboardLayout Component={<Category/>} />} />
     <Route path="/dashboard/brands" element={ <DashboardLayout Component={<Brands/>} />} />
     <Route path="/dashboard/banners" element={ <DashboardLayout Component={<Banners/>} />} />
   
      </Route>
       <Route exact path="/login" element={<LogoOnlyLayout Component={<Login/>} />   } />
       <Route exact path="*" element={<Navigate to="/login" />   } />
       

  
     
     {/* <Route exact path="/"  element={ <DashboardLayout Component={<DashboardApp />} />   }  />
     <Route exact path="/dashboard/app" element={ <DashboardLayout Component={<DashboardApp/>} /> } />
    
     <Route path="/dashboard/users" element={ <DashboardLayout Component={<User/>} />} />
     <Route path="/dashboard/products" element={ <DashboardLayout Component={<Products/>} />} />
     <Route path="/dashboard/blog" element={ <DashboardLayout Component={<Blog/>} />} />
     <Route path="/dashboard/orders" element={ <DashboardLayout Component={<Orders/>} />} />
     <Route path="/dashboard/vendor" element={ <DashboardLayout Component={<Vendor/>} />}/>
     <Route path="/dashboard/category" element={ <DashboardLayout Component={<Category/>} />} />
     <Route path="/dashboard/payments-vendor" element={ <DashboardLayout Component={<PaymentForVendors/>} />} />
     <Route path="/dashboard/products/add_product/:product_id" element={ <DashboardLayout Component={<AddProduct/>} />}/> */}
    
      {/* <Route path="/404" element={ <LogoOnlyLayout Component={<NotFound/>} />}/> */}

     {/* <Route path="*" element={<Navigate to={userState ? "/dashboard/app":"/login"} />} />    */}
 
   </Routes>

    )
  //  }
  // if(!authState.isAuthenticated){
  //   return (
 
  //    <Routes>
  //    <Route exact path="/" element={<LogoOnlyLayout Component={<Login/>} />}/>
  //    <Route exact path="/login" element={<LogoOnlyLayout Component={<Login/>} />}/>
  //    {/* <Route path="/register" element={<LogoOnlyLayout Component={Register} />}/> */}
  //    {/* <Route path="/404" element={<LogoOnlyLayout Component={NotFound} />}/> */}
  //    <Route path="*" element={<Navigate to="/login" />} />
 
  //  </Routes>
  
  //  )
  // }
}
