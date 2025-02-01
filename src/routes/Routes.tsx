import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/signUpSignIn/SignIn";
import SignUp from "../pages/signUpSignIn/SignUp";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <h1>Not Found</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/all-cycle', element: <h1>All Cycle</h1> },
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> },
            { path: '*', element: <h1>Not Found</h1> },
        ]
    },
]);

export default router;