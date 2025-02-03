import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut, useCurrentToken, selectCurrentUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  // If token or user is missing, log out and redirect
  if (!token || !user) {
    dispatch(signOut());
    return <Navigate to="/sign-in" replace={true} />;
  }

  // Verify token
  const verifiedUser = verifyToken(token);

  if (!verifiedUser) {
    console.warn("Invalid or expired token");
    dispatch(signOut());
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
