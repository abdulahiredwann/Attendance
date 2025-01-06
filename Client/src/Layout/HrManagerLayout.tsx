import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import HrManagerNavBar from "../Pages/HrManager/HrManagerNavBar";
import HrManagerSideBar from "../Pages/HrManager/HrManagerSideBar";

function HrManagerLayout() {
  return (
    <>
      <Toaster />
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <HrManagerSideBar></HrManagerSideBar>
        <div className="body-wrapper">
          <HrManagerNavBar></HrManagerNavBar>
          <div className="body-wrapper-inner">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default HrManagerLayout;
