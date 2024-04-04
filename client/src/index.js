import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SocialKakao from "./routes/SocialKakao";
import HomeToRoute from "./components/HomeToRoute";
import TweetForm from "./routes/TweetForm";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <HomeToRoute>
            <Login />
          </HomeToRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <HomeToRoute>
            <SignUp />
          </HomeToRoute>
        ),
      },
      {
        path: "tweet-write",
        element: <TweetForm />,
      },
      {
        path: "users/socials/kakao",
        element: <SocialKakao />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
