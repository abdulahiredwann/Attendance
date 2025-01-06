import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../Pages/Admin/AdminNavBar";
import AdminSideBar from "../Pages/Admin/AdminSideBar";
function AdminLayout() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <>
      <Toaster />
      <div className="wrapper">
        <AdminSideBar isSidebarCollapsed={isSidebarCollapsed} />
        <div className="main" style={{ overflow: "auto", maxHeight: "100vh" }}>
          <AdminNavBar setSidebarCollapsed={setSidebarCollapsed} />
          <Outlet />
          {/* chek */}
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
