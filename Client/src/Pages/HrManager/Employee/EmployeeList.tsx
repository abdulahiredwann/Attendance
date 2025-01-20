import { useEffect, useState } from "preact/hooks";
import api from "../../../Services/api";
import { useNavigate } from "react-router-dom";

export interface Employees {
  id: number;
  age: number;
  bankAccountNumber: string;
  city: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  firstName: string;
  gender: string;
  idCard: string;
  lastName: string;
  middleName: string;
  monthlySalary: number;
  Payment: any[];
  phoneNumber: string;
  profilePicture: string;
  region: string;
  shifts: {
    name: string;
  };
  createdAt: string;
  Position: {
    name: string;
  };
}
function EmployeeList() {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await api.get("/hrmanager/get-edmployee");
      setEmployees(response.data.employee);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="row justify-content-start mb-4">
        <div className="col-lg-4 col-md-8 col-sm-10">
          <div className="input-group shadow-sm rounded-3 bg-white">
            <span className="input-group-text bg-transparent border-0">
              <i className="ti ti-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search employees "
              value={searchTerm}
              onChange={(e) => {
                if (e.target) {
                  setSearchTerm((e.target as HTMLInputElement).value);
                }
              }}
            />
            {searchTerm && (
              <button
                className="btn btn-link text-danger p-0 px-3"
                onClick={() => setSearchTerm("")}
              >
                <i className="ti ti-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-responsive mb-4 border rounded-1">
        <table className="table text-nowrap mb-0 align-middle">
          <thead className="text-dark fs-4">
            <tr>
              <th>
                <h6 className="fs-4 fw-semibold mb-0">Employee</h6>
              </th>
              <th>
                <h6 className="fs-4 fw-semibold mb-0">Position</h6>
              </th>
              <th>
                <h6 className="fs-4 fw-semibold mb-0">Shift</h6>
              </th>
              <th>
                <h6 className="fs-4 fw-semibold mb-0">Status</h6>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="/images/profile/user-1.jpg"
                        className="rounded-circle"
                        width={40}
                        height={40}
                      />
                      <div
                        className="ms-3"
                        data-bs-toggle="tooltip"
                        title={`${employee.email}`}
                      >
                        <h6 className="fs-4 fw-semibold mb-0">
                          <a href={`/manager/employee/${employee.id}`}>
                            {employee.firstName} {employee.middleName}{" "}
                            {employee.lastName}
                          </a>
                        </h6>
                        <span className="fw-normal">{employee.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="mb-0 fw-normal">{employee.Position.name}</p>
                  </td>
                  <td>
                    <span className="badge bg-primary-subtle text-primary">
                      {employee.shifts.name}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success">
                      active
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
                        style={{}}
                      >
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center gap-3"
                            onClick={() =>
                              navigate(`/manager/employee/${employee.id}`)
                            }
                          >
                            <i className="fs-4 ti ti-eye" />
                            See Details
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
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-3">
        <ul className="pagination mb-0">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default EmployeeList;
