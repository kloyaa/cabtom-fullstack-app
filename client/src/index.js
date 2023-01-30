import React, { StrictMode } from "react";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./page/notfound.page";
import Main from "./page";
import About from "./page/about";
import ClientMain from "./page/user/cllient.main";

import "./index.css";
import OrderSuccess from "./page/order-success.page";
import ClientProfile from "./page/user/client-profile.page";
import News from "./page/news";
import ClientRegister from "./page/user/authentication/client/register.auth.client";
import ClientLogin from "./page/user/authentication/client/login.auth.client";
import StaffLogin from "./page/user/authentication/staff/login.auth.staff";
import OwnerLogin from "./page/user/authentication/owner/login.auth.owner";
import FarmerLogin from "./page/user/authentication/farmer/login.auth.farmer";
import DriverLogin from "./page/user/authentication/driver/login.auth.driver";
import MainOwner from "./page/owner/main.owner";
import OwnerSMSNotification from "./page/owner/sms-notification.owner";

const loginRoutes = [
  {
    path: "/user/client/login",
    element: <ClientLogin />,
  },
  {
    path: "/user/staff/login",
    element: <StaffLogin />,
  },
  {
    path: "/user/owner/login",
    element: <OwnerLogin />,
  },
  {
    path: "/user/farmer/login",
    element: <FarmerLogin />,
  },
  {
    path: "/user/driver/login",
    element: <DriverLogin />,
  },
];

const registrationRoutes = [
  {
    path: "/user/client/register",
    element: <ClientRegister />,
  },
];

const profileRoutes = [
  {
    path: "/user/client/profile",
    element: <ClientProfile />,
  },
];

const others = [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/news",
    element: <News />
  }
];

const clientRoutes = [
  {
    path: "/dashboard",
    element: <ClientMain />,
  },
  {
    path: "/order/successfull",
    element: <OrderSuccess />
  },
];

const ownerRoutes = [
  {
    path: "/dashboard/owner",
    element: <MainOwner />,
  },
  {
    path: "/owner/sms-notifications",
    element: <OwnerSMSNotification />,
  },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
  },
  ...loginRoutes,
  ...profileRoutes,
  ...others,
  ...registrationRoutes,
  ...clientRoutes,
  ...ownerRoutes,
]);

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
         // define the part you're going to style
        overlay: {
          bg: 'blackAlpha.200', //change the background
          backdropFilter: 'blur(2px) hue-rotate(10deg)'
        },
        dialog: {
          // borderRadius: 'md',
          // bg: `purple.100`,
        },
      })
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript />
    <RouterProvider router={router} />
  </ChakraProvider>
  // </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
