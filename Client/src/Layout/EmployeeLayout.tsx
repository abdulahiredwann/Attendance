import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import HrManagerNavBar from "../Pages/HrManager/HrManagerNavBar";
import HrManagerSideBar from "../Pages/HrManager/HrManagerSideBar";

function EmployeeLayout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  return <h1>dsd</h1>;
}

export default EmployeeLayout;
