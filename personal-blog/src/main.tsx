import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./presentation/pages/home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from "./presentation/pages/post/PostPage";
import ThoughtsPage from "./presentation/pages/thoughts/ThoughtsPage";
import GalleryPage from "./presentation/pages/gallery/GalleryPage";
import FavoritesPage from "./presentation/pages/favorites/FavoritesPage";
import SearchListPage from "./presentation/pages/search_list/SearchListPage";

window.history.scrollRestoration = 'manual'

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
  {
    path: "/search",
    element: <SearchListPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
<StrictMode>
  <RouterProvider router={router}/>
</StrictMode>
);
