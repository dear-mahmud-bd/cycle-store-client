import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Dashboard = () => {
  const currentToken = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const user = verifyToken(currentToken as string);
  const isAdmin = (user?.role === currentUser?.role) && (currentUser?.role === "admin");
  console.log(isAdmin);
  

  const addClass = (isActive: boolean) => (isActive ? "bg-gray-200" : "");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 w-full z-10 shadow">
          <Navbar />
        </header>

        {/* Drawer and main content */}
        <main className="flex flex-grow mt-[69px]">
          <div className="container max-w-7xl mx-auto">
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content p-4">
                <Outlet></Outlet>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-56 p-4 mt-[64px] lg:mt-0">
                  <div className="divider m-0 p-0"></div>
                  <li>
                    <NavLink
                      to="profile"
                      className={({ isActive }) => addClass(isActive)}
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="my-order-history"
                      className={({ isActive }) => addClass(isActive)}
                    >
                      My Order History
                    </NavLink>
                  </li>
                  {/* Admin content here */}
                  {isAdmin && (
                    <>
                      <div className="divider m-0 mt-5 p-0">As Admin</div>
                      <li>
                        <NavLink
                          to="all-users"
                          className={({ isActive }) => addClass(isActive)}
                        >
                          All Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="all-payments"
                          className={({ isActive }) => addClass(isActive)}
                        >
                          All payments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="all-orders"
                          className={({ isActive }) => addClass(isActive)}
                        >
                          All orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="add-product"
                          className={({ isActive }) => addClass(isActive)}
                        >
                          Add Product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="manage-products"
                          className={({ isActive }) => addClass(isActive)}
                        >
                          Manage Product
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-auto w-full bg-customPurple2">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
