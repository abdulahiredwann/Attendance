import { Icon } from "@iconify/react/dist/iconify.js";

function HRDashboard() {
  return (
    <>
      <div className="container-fluid">
      <div className="row">
  <div className="col-lg-8 d-flex align-items-strech">
    <div className="card w-100">
      <div className="card-body">
        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
          <div className="mb-3 mb-sm-0">
            <h5 className="card-title fw-semibold">Sales Profit</h5>
          </div>
          <div>
            <select className="form-select">
              <option value={1}>March 2024</option>
              <option value={2}>April 2024</option>
              <option value={3}>May 2024</option>
              <option value={4}>June 2024</option>
            </select>
          </div>
        </div>
        <div id="sales-profit" />
      </div>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="row">
      <div className="col-lg-12">
        <div className="card bg-danger-subtle shadow-none w-100">
          <div className="card-body">
            <div className="d-flex mb-10 pb-1 justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-6">
                <div className="rounded-circle-shape bg-danger px-3 py-2 rounded-pill d-inline-flex align-items-center justify-content-center">
                  <Icon
                    icon="solar:users-group-rounded-bold-duotone"
                    className="fs-7 text-white"
                  />
                </div>
                <h6 className="mb-0 fs-4 fw-medium text-muted">
                  Total followers
                </h6>
              </div>
              <div className="dropdown dropstart">
                <a
                  href="javascript:void(0)"
                  className="text-muted"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ti ti-dots-vertical fs-6" />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-plus" />
                      Add
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-edit" />
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-trash" />
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row align-items-end justify-content-between">
              <div className="col-5">
                <h2 className="mb-6 fs-8">4,562</h2>
                <span className="badge rounded-pill border border-muted fw-bold text-muted fs-2 py-1">
                  +23% last month
                </span>
              </div>
              <div className="col-5">
                <div id="total-followers" className="rounded-bars" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card bg-secondary-subtle shadow-none w-100">
          <div className="card-body">
            <div className="d-flex mb-10 pb-1 justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-6">
                <div className="rounded-circle-shape bg-secondary px-3 py-2 rounded-pill d-inline-flex align-items-center justify-content-center">
                  <Icon
                    icon="solar:wallet-2-line-duotone"
                    className="fs-7 text-white"
                  />
                </div>
                <h6 className="mb-0 fs-4 fw-medium text-muted">Total Income</h6>
              </div>
              <div className="dropdown dropstart">
                <a
                  href="javascript:void(0)"
                  className="text-muted"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="ti ti-dots-vertical fs-6" />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-plus" />
                      Add
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-edit" />
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-3"
                      href="javascript:void(0)"
                    >
                      <i className="fs-4 ti ti-trash" />
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row align-items-center justify-content-between pt-4">
              <div className="col-5">
                <h2 className="mb-6 fs-8 text-nowrap">$6,280</h2>
                <span className="badge rounded-pill border border-muted fw-bold text-muted fs-2 py-1">
                  +18% last month
                </span>
              </div>
              <div className="col-5">
                <div id="total-income" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col-lg-8 d-flex align-items-stretch">
    <div className="card w-100 overflow-hidden">
      <div className="card-body pb-0">
        <h4 className="fs-4 mb-1 card-title">Popular Products</h4>
        <p className="mb-0 card-subtitle">Total 9k Visitors</p>
      </div>
      <div data-simplebar="" className="position-relative">
        <div className="table-responsive products-tabel" data-simplebar="">
          <table className="table text-nowrap mb-0 align-middle table-hover">
            <thead className="fs-4">
              <tr>
                <th className="fs-3 px-4">Products</th>
                <th className="fs-3">Payment</th>
                <th className="fs-3">Status</th>
                <th className="fs-3" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center product">
                    <img
                      src="../assets/images/products/s1.jpg"
                      className="img-fluid flex-shrink-0 rounded"
                      width={60}
                      height={60}
                    />
                    <div className="ms-3 product-title">
                      <h6 className="fs-3 mb-0 text-truncate-2">
                        iPhone 13 pro max-Pacific Blue-128GB storage
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <h5 className="mb-0 fs-4">
                    $180 <span className="text-muted">/499</span>
                  </h5>
                  <p className="text-muted mb-2">Partially paid</p>
                  <div
                    className="progress bg-light w-100"
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      aria-label="Example 4px high"
                      style={{ width: "40%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </td>
                <td>
                  <span className="badge rounded-pill fs-2 fw-medium bg-secondary-subtle text-secondary">
                    Confirmed
                  </span>
                </td>
                <td>
                  <div className="dropdown dropstart">
                    <a
                      href="javascript:void(0)"
                      className="text-muted"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical fs-6" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-plus" />
                          Add
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-edit" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-trash" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center product">
                    <img
                      src="../assets/images/products/s2.jpg"
                      className="img-fluid flex-shrink-0 rounded"
                      width={60}
                      height={60}
                    />
                    <div className="ms-3 product-title">
                      <h6 className="fs-3 mb-0 text-truncate-2">
                        Apple MacBook Pro 13 inch-M1-8/256GB-space
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <h5 className="mb-0 fs-4">
                    $120 <span className="text-muted">/499</span>
                  </h5>
                  <p className="text-muted mb-2">Full paid</p>
                  <div
                    className="progress bg-light w-100"
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      aria-label="Example 4px high"
                      style={{ width: "100%" }}
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </td>
                <td>
                  <span className="badge rounded-pill fs-2 fw-medium bg-success-subtle text-success">
                    Confirmed
                  </span>
                </td>
                <td>
                  <div className="dropdown dropstart">
                    <a
                      href="javascript:void(0)"
                      className="text-muted"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical fs-6" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-plus" />
                          Add
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-edit" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-trash" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center product">
                    <img
                      src="../assets/images/products/s3.jpg"
                      className="img-fluid flex-shrink-0 rounded"
                      width={60}
                      height={60}
                    />
                    <div className="ms-3 product-title">
                      <h6 className="fs-3 mb-0 text-truncate-2">
                        PlayStation 5 DualSense Wireless Controller
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <h5 className="mb-0 fs-4">
                    $120 <span className="text-muted">/499</span>
                  </h5>
                  <p className="text-muted mb-2">Cancelled</p>
                  <div
                    className="progress bg-light w-100"
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      aria-label="Example 4px high"
                      style={{ width: "100%" }}
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </td>
                <td>
                  <span className="badge rounded-pill fs-2 fw-medium bg-danger-subtle text-danger">
                    Cancelled
                  </span>
                </td>
                <td>
                  <div className="dropdown dropstart">
                    <a
                      href="javascript:void(0)"
                      className="text-muted"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical fs-6" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-plus" />
                          Add
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-edit" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-trash" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center product">
                    <img
                      src="../assets/images/products/s5.jpg"
                      className="img-fluid flex-shrink-0 rounded"
                      width={60}
                      height={60}
                    />
                    <div className="ms-3 product-title">
                      <h6 className="fs-3 mb-0 text-truncate-2">
                        Amazon Basics Mesh, Mid-Back, Swivel Office De...
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <h5 className="mb-0 fs-4">
                    $120 <span className="text-muted">/499</span>
                  </h5>
                  <p className="text-muted mb-2">Partially paid</p>
                  <div
                    className="progress bg-light w-100"
                    style={{ height: 4 }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      aria-label="Example 4px high"
                      style={{ width: "40%" }}
                      aria-valuenow={40}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </td>
                <td>
                  <span className="badge rounded-pill fs-2 fw-medium bg-secondary-subtle text-secondary">
                    Confirmed
                  </span>
                </td>
                <td>
                  <div className="dropdown dropstart">
                    <a
                      href="javascript:void(0)"
                      className="text-muted"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical fs-6" />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-plus" />
                          Add
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-edit" />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-3"
                          href="javascript:void(0)"
                        >
                          <i className="fs-4 ti ti-trash" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 d-flex align-items-stretch">
    <div className="card w-100">
      <div className="card-body">
        <div className="d-flex mb-3 justify-content-between align-items-center">
          <h4 className="mb-0 card-title">Earning Reports</h4>
          <div className="dropdown">
            <button
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className="rounded-circle btn-transparent rounded-circle btn-sm px-1 btn shadow-none"
            >
              <i className="ti ti-dots-vertical fs-6" />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="javascript:void(0)">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
            <div className="d-flex align-items-center">
              <div className="rounded-circle-shape bg-primary-subtle me-3 rounded-pill d-inline-flex align-items-center justify-content-center">
                <Icon
                  icon="solar:card-line-duotone"
                  className="fs-7 text-primary"
                />
              </div>
              <div>
                <h6 className="mb-1 fs-3">Bank Transfer</h6>
                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                  and +1 more
                  <i className="ti ti-info-circle" />
                </p>
              </div>
            </div>
            <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
              <i className="ti ti-caret-up" />
              16.3%
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
            <div className="d-flex align-items-center">
              <div className="rounded-circle-shape bg-danger-subtle me-3 rounded-pill d-inline-flex align-items-center justify-content-center">
                <Icon
                  icon="solar:wallet-2-line-duotone"
                  className="fs-7 text-danger"
                />
              </div>
              <div>
                <h6 className="mb-1 fs-3">Net Profit</h6>
                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                  and +4 more
                  <i className="ti ti-info-circle" />
                </p>
              </div>
            </div>
            <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
              <i className="ti ti-caret-up" />
              12.55%
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
            <div className="d-flex align-items-center">
              <div className="rounded-circle-shape bg-secondary-subtle me-3 rounded-pill d-inline-flex align-items-center justify-content-center">
                <Icon
                  icon="solar:course-up-line-duotone"
                  className="fs-7 text-secondary"
                />
              </div>
              <div>
                <h6 className="mb-1 fs-3">Total Income</h6>
                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                  and +4 more
                  <i className="ti ti-info-circle" />
                </p>
              </div>
            </div>
            <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
              <i className="ti ti-caret-up" />
              12.55%
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
            <div className="d-flex align-items-center">
              <div className="rounded-circle-shape bg-light me-3 rounded-pill d-inline-flex align-items-center justify-content-center">
                <Icon
                  icon="solar:waterdrops-line-duotone"
                  className="fs-7 text-body-color"
                />
              </div>
              <div>
                <h6 className="mb-1 fs-3">Total Expenses</h6>
                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                  and +2 more
                  <i className="ti ti-info-circle" />
                </p>
              </div>
            </div>
            <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
              <i className="ti ti-caret-up" />
              8.28%
            </span>
          </li>
          <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
            <div className="d-flex align-items-center">
              <div className="rounded-circle-shape bg-warning-subtle me-3 rounded-pill d-inline-flex align-items-center justify-content-center">
                <Icon
                  icon="solar:waterdrops-line-duotone"
                  className="fs-7 text-warning"
                />
              </div>
              <div>
                <h6 className="mb-1 fs-3">Marketing</h6>
                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                  and +3 more
                  <i className="ti ti-info-circle" />
                </p>
              </div>
            </div>
            <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
              <i className="ti ti-caret-up" />
              9.25%
            </span>
          </li>
          <a
            href="javascript:void(0)"
            className="fs-4 mt-7 text-center d-block"
          >
            View more markets
          </a>
        </ul>
      </div>
    </div>
  </div>
</div>


      </div>
    </>
  )
}

export default HRDashboard;
