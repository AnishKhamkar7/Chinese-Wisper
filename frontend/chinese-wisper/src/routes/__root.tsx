import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import MainLayout from "@/Layout/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import AuthLayout from "@/Layout/AuthLayout";
import Post from "@/pages/Post/Post";
import { Outlet } from "@tanstack/react-router";
import { useSelector, UseSelector } from "react-redux";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthLayout,
});

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main",
  component: MainLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/register",
  component: Register,
});

// Main layout routes
const indexRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/",
  component: Home,
});

const postRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/post/$postId",
  component: Post,
});

const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([loginRoute, registerRoute]),
  mainLayoutRoute.addChildren([indexRoute, postRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
