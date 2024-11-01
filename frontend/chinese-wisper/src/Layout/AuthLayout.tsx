import React from "react";
import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
