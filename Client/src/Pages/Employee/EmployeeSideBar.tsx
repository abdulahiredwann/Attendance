import { FiSliders } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

interface EmployeeSideBarProps {
  isSidebarCollapsed: boolean;
}
function EmployeeSideBar({ isSidebarCollapsed }: EmployeeSideBarProps) {
  return (
    <>
      <nav
        id="sidebar"
        className={`sidebar js-sidebar ${
          isSidebarCollapsed ? "collapsed" : ""
        }`}
        style={{ overflow: "auto" }}
      >
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="#">
            <span className="sidebar-brand-text align-middle">
              C
              <sup>
                <small className="badge bg-primary mx-1 text-uppercase">
                  Technology
                </small>
              </sup>
            </span>
            <svg
              className="sidebar-brand-icon align-middle"
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              style={{ marginLeft: "-3px" }}
            >
              <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z" />
              <path d="M20 12L12 16L4 12" />
              <path d="M20 16L12 20L4 16" />
            </svg>
          </a>
          <div className="sidebar-user">
            <div className="d-flex justify-content-center">
              <div className="flex-shrink-0">
                <img
                  src="/Images/ctech.jpg"
                  className="avatar img-fluid rounded-circle me-1"
                  alt="c tech"
                />
              </div>
              <div className="flex-grow-1 ps-2">
                <a className="sidebar-user-title" href="">
                  {/* {user?.firstName + " " + user?.middleName} */}Abdulahi
                  Redwan
                </a>

                <div className="sidebar-user-subtitle">Employee</div>
              </div>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>
            <li className="sidebar-item active">
              <a
                data-bs-target="#dashboards"
                data-bs-toggle="collapse"
                className="sidebar-link"
              >
                <FiSliders size={15}></FiSliders>
                <span className="align-middle">Dashboards</span>
              </a>
              <ul
                id="dashboards"
                className="sidebar-dropdown list-unstyled collapse show"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to={"/admin"} className="sidebar-link">
                    Main Dashboard
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"report"} className="sidebar-link">
                    Report
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                data-bs-target="#RawItems"
                data-bs-toggle="collapse"
                className="sidebar-link collapsed"
              >
                <MdAddShoppingCart size={24}></MdAddShoppingCart>
                <span className="align-middle">Purchase Management </span>
              </a>
              <ul
                id="RawItems"
                className="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to={"purchase/rawmaterial"} className="sidebar-link">
                    Purchase Raw Material
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"raw/stock"} className="sidebar-link">
                    Available Stock Summary
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"raw/history"} className="sidebar-link">
                    Purchased Stock History
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"raw/transaction"} className="sidebar-link">
                    Stock Transaction
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"raw/credits"} className="sidebar-link">
                    Credit Purchases
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to={"raw/credit/repay"} className="sidebar-link">
                    Repay Credit
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default EmployeeSideBar;
