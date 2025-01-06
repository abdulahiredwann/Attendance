import React from "react";
import { FaBell } from "react-icons/fa";

function AdminNavBar({
  setSidebarCollapsed,
}: {
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle js-sidebar-toggle" onClick={toggleSidebar}>
          <i className="hamburger align-self-center" />
        </a>
        <form className="d-none d-sm-inline-block">
          <div className="input-group input-group-navbar">
            <input
              type="text"
              className="form-control"
              placeholder="Search…"
              aria-label="Search"
            />
            <button className="btn" type="button">
              <i className="align-middle" data-feather="search" />
            </button>
          </div>
        </form>

        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
              <a
                className="nav-icon dropdown-toggle"
                href="#"
                id="alertsDropdown"
                data-bs-toggle="dropdown"
              >
                <div className="position-relative">
                  <div className="align-middle">
                    <FaBell size={24} />
                  </div>
                  <span className="indicator">3</span>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0"
                aria-labelledby="alertsDropdown"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <div className="dropdown-menu-header">4 New Notifications</div>
                {}
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-icon pe-md-0 dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="/Images/ctech.jpg"
                  className="avatar img-fluid rounded-circle "
                  alt="Charles Hall"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#changePasswordModal"
                >
                  <i className="align-middle me-1" data-feather="user" />{" "}
                  Profile
                </a>

                <div className="dropdown-divider" />
                <button className="dropdown-item" type="button">
                  Log out
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default AdminNavBar;
