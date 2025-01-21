import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../../Components/NotFound";
import api, { nPoint } from "../../../Services/api";
import { Employees } from "./EmployeeList";
import Swal from "sweetalert2";

function SeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployees] = useState<Employees | null>(null);
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await api.get(`/hrmanager/get-employe/${id}`);
      setEmployees(response.data.employee);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await api.delete(`/employee/delete/${id}`);
        Swal.fire({
          icon: "success",
          title: "Employee Deleted",
          text: response.data.message || "Employee deleted successfully!",
        });
        window.history.back();
      }
    } catch (error: any) {
      console.error("Error deleting Employee:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error deleting Employee!",
      });
    }
  };
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  if (employee === null) {
    return (
      <>
        <NotFound></NotFound>
      </>
    );
  }
  return (
    <div className="container mt-4">
      <div
        className="card shadow-lg border-0 rounded-4 hover-zoom"
        style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
      >
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={nPoint + employee.profilePicture}
                alt="Profile"
                className="rounded-circle border mb-3 shadow-sm"
                width="150"
                height="150"
              />
              <h5 className="mt-3 mb-1 fw-bold">{`${employee.firstName} ${employee.middleName} ${employee.lastName}`}</h5>
              <p className="text-muted mb-2">{employee.Position.name}</p>
              <span className="badge bg-primary-subtle text-primary px-3 py-2">
                {employee.shifts.name}
              </span>
            </div>

            <div className="col-md-9">
              <div className="row mb-3">
                <div className="col-sm-6 mb-1 ">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:email"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Email</h6>
                  </div>
                  <p
                    className="fw-semibold mb-0 text-truncate"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="tooltip"
                    title={isEmailHovered ? employee.email : ""}
                  >
                    {employee.email}
                  </p>
                </div>

                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:phone"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Phone Number</h6>
                  </div>
                  <p
                    className="fw-semibold mb-0 text-truncate"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="tooltip"
                    title={isPhoneHovered ? employee.phoneNumber : ""}
                  >
                    {employee.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:city"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">City</h6>
                  </div>
                  <p className="fw-semibold mb-0">{employee.city}</p>
                </div>
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:earth"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Region</h6>
                  </div>
                  <p className="fw-semibold mb-0">{employee.region}</p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:bank"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Bank Account</h6>
                  </div>
                  <p className="fw-semibold mb-0">
                    {employee.bankAccountNumber}
                  </p>
                </div>
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:calendar"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Age</h6>
                  </div>
                  <p className="fw-semibold mb-0">{employee.age} years</p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:account-heart"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Emergency Contact</h6>
                  </div>
                  <p className="fw-semibold mb-0">
                    {employee.emergencyContactName}
                  </p>
                  <p className="text-muted small">
                    {employee.emergencyContactPhone}
                  </p>
                </div>
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:currency-usd"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Monthly Salary</h6>
                  </div>
                  <p className="fw-semibold mb-0">{employee.monthlySalary}</p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:gender-male-female"
                      className="text-info me-3" // Changed color to primary
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">Gender</h6>
                  </div>
                  <p className="fw-semibold mb-0">{employee.gender}</p>
                </div>
                <div className="col-sm-6 mb-1">
                  <div className="d-flex align-items-center">
                    <Icon
                      icon="mdi:id-card"
                      className="text-info me-3"
                      width={20}
                      height={20}
                    />
                    <h6 className="text-muted mb-0">ID Card</h6>
                  </div>
                  <button
                    className="btn btn-outline-primary mt-2 px-4 py-2 rounded-3 d-flex align-items-center"
                    style={{
                      height: "35px",
                      transition: "background-color 0.3s, transform 0.3s",
                    }}
                    onClick={() => alert("Downloading ID Card...")} // Add your download logic here
                  >
                    <Icon
                      icon="mdi:download"
                      className="text-info me-3"
                      height={16}
                    />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Buttons section for editing/deleting */}
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-primary px-4 me-2"
                  onClick={() =>
                    navigate(`/manager/employee/edit/${employee.id}`)
                  }
                >
                  Edit
                </button>
                <button className="btn btn-danger px-4" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeDetails;
