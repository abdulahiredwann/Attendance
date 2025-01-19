import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../Services/api";
import { CiBookmarkPlus } from "react-icons/ci";

interface Shift {
  id: number;
  name: string;
}
interface Position {
  id: number;
  name: string;
}
// Validation Schema
const employeeSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  shiftId: z.string().min(1, "Shift ID is required"),
  bankAccountNumber: z.string().min(1, "Bank Account Number is required"),
  monthlySalary: z.number().min(1, "Monthly Salary is required"),
  position: z.string().min(1, "Position is required"),
  idImg: z.any().refine((file) => file?.length > 0, "ID Image is required"),
  profileImg: z
    .any()
    .refine((file) => file?.length > 0, "Profile Image is required"),
});

type EmployeeForm = z.infer<typeof employeeSchema>;

function AddEmployee() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [posiitions, setPosition] = useState<Position[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
  });
  useEffect(() => {
    const fetch = async () => {
      const response = await api.get("/hrmanager/get-info-create");
      setPosition(response.data.position);
      setShifts(response.data.shift);
    };
    fetch();
  }, []);

  const [loading, setLoading] = useState(false);
  const [newPositionVisible, setNewPositionVisible] = useState(false);

  const onSubmit = async (data: EmployeeForm) => {
    setLoading(true);

    try {
      const formData = new FormData();

      (Object.keys(data) as (keyof EmployeeForm)[]).forEach((key) => {
        if (key === "idImg" || key === "profileImg") {
          formData.append(key, data[key][0]); // Append the first file
        } else {
          formData.append(key, data[key] as string | Blob);
        }
      });

      const response = await api.post("/employees/create-employee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Employee created successfully!");
      } else {
        alert(response.data.error || "Error creating employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100 overflow-hidden">
          <div className="card-body pb-0">
            <h4 className="fs-4 mb-1 card-title">Add Employee</h4>
            <p className="mb-0 card-subtitle">
              Fill out the information below to create a new employee.
            </p>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="row">
                {/* First Name */}
                <div className="col-md-6 mb-3 ">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter first name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <small className="text-danger">
                      {errors.firstName.message}
                    </small>
                  )}
                </div>

                {/* Middle Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    placeholder="Enter middle name"
                    {...register("middleName")}
                  />
                </div>

                {/* Last Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter last name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <small className="text-danger">
                      {errors.lastName.message}
                    </small>
                  )}
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                {/* Phone Number */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <small className="text-danger">
                      {errors.phoneNumber.message}
                    </small>
                  )}
                </div>

                {/* Password */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>

                {/* Region */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="region" className="form-label">
                    Region
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="region"
                    placeholder="Enter region"
                    {...register("region")}
                  />
                  {errors.region && (
                    <small className="text-danger">
                      {errors.region.message}
                    </small>
                  )}
                </div>

                {/* City */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter city"
                    {...register("city")}
                  />
                  {errors.city && (
                    <small className="text-danger">{errors.city.message}</small>
                  )}
                </div>

                {/* Emergency Contact Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="emergencyContactName" className="form-label">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactName"
                    placeholder="Enter emergency contact name"
                    {...register("emergencyContactName")}
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="emergencyContactPhone" className="form-label">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactPhone"
                    placeholder="Enter emergency contact phone"
                    {...register("emergencyContactPhone")}
                  />
                </div>

                {/* Shift ID */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="shiftId" className="form-label">
                    Shift
                  </label>
                  <select
                    className="form-select"
                    id="shiftId"
                    {...register("shiftId")}
                  >
                    <option value="">Select Shift</option>
                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </select>
                  {errors.shiftId && (
                    <small className="text-danger">
                      {errors.shiftId.message}
                    </small>
                  )}
                </div>

                {/* Bank Account Number */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="bankAccountNumber" className="form-label">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankAccountNumber"
                    placeholder="Enter bank account number"
                    {...register("bankAccountNumber")}
                  />
                  {errors.bankAccountNumber && (
                    <small className="text-danger">
                      {errors.bankAccountNumber.message}
                    </small>
                  )}
                </div>

                {/* Monthly Salary */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="monthlySalary" className="form-label">
                    Monthly Salary
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="monthlySalary"
                    placeholder="Enter monthly salary"
                    {...register("monthlySalary")}
                  />
                  {errors.monthlySalary && (
                    <small className="text-danger">
                      {errors.monthlySalary.message}
                    </small>
                  )}
                </div>

                {/* Position */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <select
                    className="form-select"
                    id="position"
                    {...register("position")}
                  >
                    <option value="">Select Position</option>
                    {posiitions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.name}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <small className="text-danger">
                      {errors.position.message}
                    </small>
                  )}
                </div>

                {/* ID Image */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="idImg" className="form-label">
                    ID Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="idImg"
                    {...register("idImg")}
                  />
                  {errors.idImg && (
                    <small className="text-danger">
                      {errors.idImg.message}
                    </small>
                  )}
                </div>

                {/* Profile Image */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="profileImg" className="form-label">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="profileImg"
                    {...register("profileImg")}
                  />
                  {errors.profileImg && (
                    <small className="text-danger">
                      {errors.profileImg.message}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Save Employee"}
                  </button>
                </div>
              </div>
            </form>
            <span className="sidebar-divider lg"></span>
            {/* i want here another input field to create position with name input and add nutton  */}
            <div className="col-md-12 mb-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setNewPositionVisible(!newPositionVisible)}
              >
                {newPositionVisible ? (
                  <span>&#x25B2; Close Create Position</span>
                ) : (
                  <span>&#x25BC; Create New Position</span>
                )}
              </button>
            </div>
            {newPositionVisible && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="newPosition" className="form-label">
                    New Position Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newPosition"
                    placeholder="Enter new position name"
                    //   {...register("newPosition")}
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    <span className="mr-4">
                      {" "}
                      <CiBookmarkPlus size={20} />
                    </span>

                    {loading ? "Submitting..." : "Add Position"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
