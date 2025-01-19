import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import api from "../../../Services/api";

// Define the Role enum and Zod schema
const roles = ["ADMIN", "HR_MANAGER"] as const;

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().min(1, "Middle name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone must be at least 10 digits"),
  role: z.enum(roles, { errorMap: () => ({ message: "Invalid role" }) }),
});

type FormData = z.infer<typeof schema>;

function AddUsers() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would send the data to your API
      const response = await api.post("/hrmanager/create-user", data);
      Swal.fire({
        icon: "success",
        title: "User Added!",
        text: response.data.message || "The user has been successfully added.",
      });
      reset();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "An error occurred while adding the user.",
      });
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100 overflow-hidden">
          <div className="card-body pb-0">
            <h4 className="fs-4 mb-1 card-title">Add New User</h4>
            <p className="mb-0 card-subtitle">
              Set all information to create a new user
            </p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* First Name */}
                <div className="col-md-6 mb-3">
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
                  {errors.middleName && (
                    <small className="text-danger">
                      {errors.middleName.message}
                    </small>
                  )}
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
                  {errors.emergencyContactName && (
                    <small className="text-danger">
                      {errors.emergencyContactName.message}
                    </small>
                  )}
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
                  {errors.emergencyContactPhone && (
                    <small className="text-danger">
                      {errors.emergencyContactPhone.message}
                    </small>
                  )}
                </div>

                {/* Role */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    {...register("role")}
                  >
                    <option key="" value="">
                      Select Role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <small className="text-danger">{errors.role.message}</small>
                  )}
                </div>
              </div>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUsers;
