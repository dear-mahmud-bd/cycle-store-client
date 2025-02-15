import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/signUpSignIn/SignIn";
import SignUp from "../pages/signUpSignIn/SignUp";
import Home from "../pages/home/Home";
import AdminRoute from "./AdminRoute";
import AllProducts from "../pages/products/AllProducts";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "../components/Product/ProductDetails";
import Dashboard from "../components/shared/Dashboard";
import UserProfile from "../pages/Private/UserProfile";
import UserOrderHistory from "../pages/Private/UserOrderHistory";
import AllOrders from "../pages/Admin/AllOrders";
import AllUsers from "../pages/Admin/AllUsers";
import AddProduct from "../pages/Admin/AddProduct";
import ManageProduct from "../pages/Admin/ManageProduct";
import ManageSingleProduct from "../pages/Admin/ManageSingleProduct";
import NotFound from "../components/shared/NotFound";
import PaymentFailed from "../pages/Private/PaymentFailed";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFound/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-cycle", element: <AllProducts /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/all-cycle/:id", element: <ProductDetails /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "*", element: <NotFound/> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
    errorElement: <NotFound/>,
    children: [
      { path: "", element: <UserProfile/> },
      { path: "profile", element: <UserProfile/> },
      { path: "my-order-history", element: <UserOrderHistory/> },

      // Admin Route...
      { path: 'all-users', element: <AdminRoute role="admin"> <AllUsers/> </AdminRoute> },
      { path: 'all-orders', element: <AdminRoute role="admin"> <AllOrders/> </AdminRoute> },
      { path: 'add-product', element: <AdminRoute role="admin"> <AddProduct/> </AdminRoute> },
      { path: 'manage-products', element: <AdminRoute role="admin"> <ManageProduct/> </AdminRoute> },
      { path: 'manage-products/:id', element: <AdminRoute role="admin"> <ManageSingleProduct/> </AdminRoute> },

      { path: "*", element: <NotFound/> },

      { path: "payment-fail", element: <PaymentFailed/> },
    ],
  },
]);

export default router;
