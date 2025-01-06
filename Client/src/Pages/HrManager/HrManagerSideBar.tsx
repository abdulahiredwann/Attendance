import { Icon } from "@iconify/react";
import { useState } from "preact/hooks";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosQrScanner } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";

type DropdownState = {
  [key: string]: boolean;
};
function HrManagerSideBar() {
  const [dropdownState, setDropdownState] = useState<DropdownState>({});

  const toggleDropdown = (key: string) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the specific dropdown
    }));
  };
  return (
    <aside className="left-sidebar">
      {/* Sidebar scroll*/}
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <a href="" className="text-nowrap logo-img">
            <img
              src="../assets/images/logos/ctech.png"
              alt=""
              style={{ height: "50px" }}
            />
          </a>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8" />
          </div>
        </div>
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar>
          <ul id="sidebarnav">
            <li>
              <span className="sidebar-divider lg" />
            </li>
            <li className="nav-small-cap">
              <span className="hide-menu">Home</span>
            </li>
            <li>
              <span className="sidebar-divider lg" />
            </li>
            <li className="sidebar-item">
              <NavLink
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                to="/manager"
                aria-expanded="false"
              >
                <Icon icon="solar:widget-add-line-duotone" />
                <span className="hide-menu">Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                to="/"
                aria-expanded="false"
              >
                <IoIosQrScanner size={20} />
                <span className="hide-menu">Scan</span>
              </NavLink>
            </li>

            <li className="sidebar-item">
              <a
                className={`sidebar-link has-arrow ${
                  dropdownState["report"] ? "open" : ""
                }`}
                href="javascript:void(0)"
                aria-expanded={dropdownState["report"] || false}
                onClick={() => toggleDropdown("report")}
              >
                <TbReportSearch size={20} />
                <span className="hide-menu">Report</span>
              </a>
              <ul
                className={`collapse first-level ${
                  dropdownState["report"] ? "show" : ""
                }`}
                aria-expanded={dropdownState["report"] || false}
              >
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-landingpage.html"
                  >
                    <FaArrowRightLong />
                    Attendance
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-aboutpage.html"
                  >
                    <FaArrowRightLong />
                    Payement
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link text-danger "
                    href="../main/frontend-aboutpage.html"
                  >
                    <FaArrowRightLong />
                    Warning Employee
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className={`sidebar-link has-arrow ${
                  dropdownState["employee"] ? "open" : ""
                }`}
                href="javascript:void(0)"
                aria-expanded={dropdownState["employee"] || false}
                onClick={() => toggleDropdown("employee")}
              >
                <FaUserFriends size={20} />
                <span className="hide-menu">Employee</span>
              </a>
              <ul
                className={`collapse first-level ${
                  dropdownState["employee"] ? "show" : ""
                }`}
                aria-expanded={dropdownState["employee"] || false}
              >
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-landingpage.html"
                  >
                    <FaArrowRightLong />
                    Employees List
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-aboutpage.html"
                  >
                    <FaArrowRightLong />
                    Add Employee
                  </a>
                </li>
              </ul>
            </li>

            <li className="sidebar-item">
              <a
                className={`sidebar-link has-arrow ${
                  dropdownState["payment"] ? "open" : ""
                }`}
                href="javascript:void(0)"
                aria-expanded={dropdownState["payment"] || false}
                onClick={() => toggleDropdown("payment")}
              >
                <GiMoneyStack size={20} />
                <span className="hide-menu">Payemnt</span>
              </a>
              <ul
                className={`collapse first-level ${
                  dropdownState["payment"] ? "show" : ""
                }`}
                aria-expanded={dropdownState["payment"] || false}
              >
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-landingpage.html"
                  >
                    <FaArrowRightLong />
                    Payment Report
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-aboutpage.html"
                  >
                    <FaArrowRightLong />
                    Employee Payment
                  </a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className={`sidebar-link has-arrow ${
                  dropdownState["Setting"] ? "open" : ""
                }`}
                href="javascript:void(0)"
                aria-expanded={dropdownState["Setting"] || false}
                onClick={() => toggleDropdown("Setting")}
              >
                <IoSettingsOutline size={20} />
                <span className="hide-menu">Settings</span>
              </a>
              <ul
                className={`collapse first-level ${
                  dropdownState["Setting"] ? "show" : ""
                }`}
                aria-expanded={dropdownState["Setting"] || false}
              >
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-landingpage.html"
                  >
                    <FaArrowRightLong />
                    Add Users
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link"
                    href="../main/frontend-aboutpage.html"
                  >
                    <FaArrowRightLong />
                    Shift Management
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <span className="sidebar-divider lg" />
            </li>
          </ul>
          <div className="unlimited-access d-flex align-items-center hide-menu bg-primary-subtle position-relative mb-7 mt-4 p-3 rounded">
            <div className="me-2 flex-shrink-0">
              <h6 className="fw-semibold fs-4 mb-6 text-dark w-75">
                Time Management
              </h6>
            </div>
            <div className="unlimited-access-img">
              <img
                src="../assets/images/backgrounds/manage.svg"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </nav>
        {/* End Sidebar navigation */}
      </div>
      {/* End Sidebar scroll*/}
    </aside>
  );
}

export default HrManagerSideBar;
