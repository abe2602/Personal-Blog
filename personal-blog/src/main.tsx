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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

window.history.scrollRestoration = 'manual'

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false, 
      refetchOnMount: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, 
    },
  },
});

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
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
</StrictMode>
);
