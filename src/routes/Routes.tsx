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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <h1>Not Found</h1>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-cycle", element: <AllProducts /> },
      { path: "/all-cycle/:id", element: <ProductDetails /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "*", element: <h1>Not Found</h1> },

      // This are private route...
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <h1>Profile</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminRoute role="admin">
            <h1>This is Admin...</h1>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    ),
    errorElement: <h1>Not Found</h1>,
    children: [
      { path: "", element: <UserProfile/> },
      { path: "profile", element: <UserProfile/> },
      { path: "my-order-history", element: <UserOrderHistory/> },

      // Admin Route...
      { path: 'all-users', element: <AdminRoute role="admin"> <h1>All user</h1> </AdminRoute> },
      { path: 'all-payments', element: <AdminRoute role="admin"> <h1>All payments</h1> </AdminRoute> },
      { path: 'all-orders', element: <AdminRoute role="admin"> <h1>All orders</h1> </AdminRoute> },
      { path: 'add-product', element: <AdminRoute role="admin"> <h1>Add Product</h1> </AdminRoute> },
      { path: 'manage-products', element: <AdminRoute role="admin"> <h1>Manage Product</h1> </AdminRoute> },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);

export default router;
