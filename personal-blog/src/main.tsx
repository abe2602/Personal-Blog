import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from "./pages/post/PostPage";
import ThoughtsPage from "./pages/thoughts/ThoughtsPage";
import GalleryPage from "./pages/gallery/GalleryPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/post/:id",
    element: <PostPage />,
  },
    {
    path: "/favorites",
    element: <FavoritesPage />,
  },
    {
    path: "/gallery",
    element: <GalleryPage />,
  },
    {
    path: "/thoughts",
    element: <ThoughtsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
