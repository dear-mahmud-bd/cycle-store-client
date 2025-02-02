import { jwtDecode } from 'jwt-decode';
import { TUser } from '../redux/features/auth/authSlice';

export const verifyToken = (token: string): TUser | null => {
  try {
    const decoded: TUser = jwtDecode(token);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      console.warn("Token has expired");
      return null; // Invalid token
    }

    return decoded; // Valid token
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Invalid token
  }
};