import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import FinalScore from "./routes/FinalScore";
import UpcomingMatch from "./routes/UpcomingMatch";
import Index from "./routes/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/final-score",
        element: <FinalScore />,
      },
      {
        path: "/upcoming-match",
        element: <UpcomingMatch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
