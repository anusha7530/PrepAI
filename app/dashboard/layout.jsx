import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
