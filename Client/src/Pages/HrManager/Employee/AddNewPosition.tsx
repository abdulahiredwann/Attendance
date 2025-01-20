import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiBookmarkPlus } from "react-icons/ci";
import { z } from "zod";
import api from "../../../Services/api";
import Swal from "sweetalert2";

const schema = z.object({
  name: z.string().min(2, { message: "Name required" }).max(100),
});
type AddPostionForm = z.infer<typeof schema>;
function AddNewPosition() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPostionForm>({
    resolver: zodResolver(schema),
  });
  const submit = async (data: AddPostionForm) => {
    try {
      const response = await api.post("/employee/create-position", data);
      Swal.fire({
        icon: "success",
        title: "New Position Created!",
        text: response.data.message || "Position created Succefully",
      });
      window.location.reload();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error Create Position!",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
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
              {...register("name")}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
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
      </form>
    </>
  );
}

export default AddNewPosition;
