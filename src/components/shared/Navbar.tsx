import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../public/logo.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  signOut,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { showToast } from "../../utils/useToast";
import { LuLayoutDashboard } from "react-icons/lu";

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  // console.log(user);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to SignOut`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33333",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(signOut());
        showToast("success", "Sign-out successfully");
      }
    });
  };

  const addClass = (isActive: boolean) => isActive ? 'font-semibold underline underline-offset-2' : 'font-semibold';
  const navLinks = (
    <>
      <li>
        <NavLink to={`/all-cycle`} className={({ isActive }) => addClass(isActive)}>
          <p>All Cycle</p>
        </NavLink>
      </li>
      <li>
        <NavLink to={`/about-us`} className={({ isActive }) => addClass(isActive)}>
          <p>About Us</p>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to={`/`} className="btn btn-ghost text-xl">
          <img
            src={Logo}
            alt="Bike Store"
            loading="lazy"
            className="w-28 shrink-0 lg:w-[140px]"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            {isDashboard && (
              <label htmlFor="my-drawer-2" className="drawer-button lg:hidden mr-2">
                <LuLayoutDashboard className="text-xl" />
              </label>
            )}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-offset-2 ring-gray-400">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://i.ibb.co.com/jD1GTj4/user.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={`/dashboard/profile`} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={`/dashboard`}>Dashboard</Link>
                </li>
                <li>
                  <p onClick={handleSignOut}>Sign Out</p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to={`/sign-in`} className="btn">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
