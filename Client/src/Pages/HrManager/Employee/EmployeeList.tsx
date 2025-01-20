import { useEffect, useState } from "preact/hooks";
import api from "../../../Services/api";

interface Employees {
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
  return (
    <>
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
            {employees.map((employee) => (
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
                      <div className="ms-3">
                        <h6 className="fs-4 fw-semibold mb-0">
                          {employee.firstName}
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
                    <span className="badge bg-primary-subtle text-primary">
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
    </>
  );
}

export default EmployeeList;
