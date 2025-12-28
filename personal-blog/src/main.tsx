import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostPage from "./pages/post/PostPage";
import ThoughtsPage from "./pages/thoughts/ThoughtsPage";
import GalleryPage from "./pages/gallery/GalleryPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
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
]);

createRoot(document.getElementById("root")!).render(
<StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
</StrictMode>
);
