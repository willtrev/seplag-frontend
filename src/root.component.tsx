import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from "sonner";

const Home = lazy(() => import("./views/Home"));
const Details = lazy(() => import("./views/Details"));
const Report = lazy(() => import("./views/Report"));
const NotFound = lazy(() => import("./views/NotFound"));
const ErrorView = lazy(() => import("./views/ErrorView"));

const Root = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorView />,
      children: [
        {
          index: true,
          element: <Navigate to="/inicio" replace />,
        },
        {
          path: "/inicio",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/detalhes/:id",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Details />
            </Suspense>
          ),
        },
        {
          path: "/relatorio/:id",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Report />
            </Suspense>
          ),
        },
        {
          path: "/404",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <NotFound />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3000 }}
          closeButton
          richColors
        />
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default Root;
