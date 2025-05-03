// src/router/index.jsx
import {createBrowserRouter} from "react-router";
import {GlobalLayout} from "../views/GlobalLayout.tsx";
import {Index} from "../views/index/Index.tsx";
import {Login} from "../views/login/Login.tsx";
import {Register} from "../views/register/Register.tsx";
import {Display} from "../views/display/Display.tsx";
import {Preview} from "../views/preview/Preview.tsx";
import {Home} from "../views/home/Home.tsx";
import {ThankYou} from "../views/thankyou/ThankYou.tsx";
import {Profile} from "../views/profile/Profile.tsx";

const router = createBrowserRouter([
    {
        path: "/", element: <GlobalLayout/>,
        children: [
            {element: <Index/>, index: true},
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
            {path: 'home', element: <Home/>},
            {path: "profile", element: <Profile/>},
        ]
    },
    {path: "/display", element: <Display/>},
    {path: "/preview", element: <Preview/>},
    {path: "/thankYou", element: <ThankYou/>},
])

export default router