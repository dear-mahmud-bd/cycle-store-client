import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut, useCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

type TAdminRoute = {
  children: ReactNode;
  role: string | undefined;
};

const AdminRoute = ({ children, role }: TAdminRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    dispatch(signOut());
    return <Navigate to="/sign-in" replace={true} />;
  }

  // Decode and check token validity
  const user = verifyToken(token);

  if (!user) {
    console.warn("Invalid or expired token");
    dispatch(signOut());
    return <Navigate to="/sign-in" replace={true} />;
  }

  // Check if user has the required role
  if (role !== undefined && role !== user.role) {
    dispatch(signOut());
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
};

export default AdminRoute;
