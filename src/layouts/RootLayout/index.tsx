import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="bg-gray-100 w-screen h-full overflow-y-scroll px-12 min-h-screen pb-8">
      <Outlet />
    </div>
  );
};

export default RootLayout;
