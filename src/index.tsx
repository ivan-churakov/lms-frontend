import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './Components/App/App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {MainPage} from "./Components/MainPage/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div className="flex w-full h-full items-center justify-center">Ooops</div>,
    },
    {
        path: "dashboard",
        element: <MainPage />,
    },
    {
        path: "help",
        element: <MainPage />,
    },
    {
        path: "account",
        element: <MainPage />,
    },
    {
        path: "settings",
        element: <MainPage />,
    },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
