import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@/App";
import DetailMovies from "./detailMovies";
import Favorites from "./Favorites";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/detail/:id",
      element: <DetailMovies />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
