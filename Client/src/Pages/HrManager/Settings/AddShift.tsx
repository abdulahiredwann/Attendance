import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../../../Services/api";
import Swal from "sweetalert2";
// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, "Shift name is required"),
  description: z.string().min(1, "Description is required"),
  morningIn: z.string().min(1, "Morning in time is required"),
  morningOut: z.string().min(1, "Morning out time is required"),
  afternoonIn: z.string().min(1, "Afternoon in time is required"),
  afternoonOut: z.string().min(1, "Afternoon out time is required"),
  allowedLateMinutes: z
    .number()
    .int("Must be an integer")
    .min(0, "Allowed late minutes must be non-negative"),
  totalServedHrPerDay: z
    .number()
    .min(0, "Total served hours per day must be non-negative"),
  scanTimeout: z
    .number()
    .int("Must be an integer")
    .min(0, "Scan timeout must be non-negative"),
});

type ShiftForm = z.infer<typeof schema>;

function AddShift() {
  const [totalHours, setTotalHours] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ShiftForm>({
    resolver: zodResolver(schema),
  });

  const morningIn = watch("morningIn");
  const morningOut = watch("morningOut");
  const afternoonIn = watch("afternoonIn");
  const afternoonOut = watch("afternoonOut");

  const calculateTotalHours = () => {
    const parseTime = (time: string) => {
      if (!time) return 0;
      const [hours, minutes] = time.split(":").map(Number);
      return hours + minutes / 60;
    };

    const morningHours = parseTime(morningOut) - parseTime(morningIn);
    const afternoonHours = parseTime(afternoonOut) - parseTime(afternoonIn);

    const total =
      (morningHours > 0 ? morningHours : 0) +
      (afternoonHours > 0 ? afternoonHours : 0);
    setTotalHours(total);
  };
  React.useEffect(() => {
    calculateTotalHours();
  }, [morningIn, morningOut, afternoonIn, afternoonOut]);

  const convertToDate = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + 3, minutes, 0, 0); // Add 3 hours to the time

    // Format date as "YYYY-MM-DDTHH:mm:ss" to mimic ISO without timezone conversion
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:00`;
    return `${year}-${month}-${day}T${formattedTime}`;
  };

  const onSubmit = async (data: ShiftForm) => {
    console.log(data);
    try {
      const payload = {
        name: data.name,
        description: data.description,
        morningIn: convertToDate(data.morningIn),
        morningOut: convertToDate(data.morningOut),
        afternoonIn: convertToDate(data.afternoonIn),
        afternoonOut: convertToDate(data.afternoonOut),
        allowedLateMinutes: data.allowedLateMinutes,
        totalServerdHrPerDay: data.totalServedHrPerDay,
        scantimeOut: data.scanTimeout,
      };

      console.log("Form submitted:", payload);
      const response = await api.post("/hrmanager/create-shift", payload);
      Swal.fire({
        icon: "success",
        title: "New Shift Created!",
        text: response.data.message || "Shift created Succefully",
      });
      // reset();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error Create Shift!",
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex align-items-stretch">
          <div className="card w-100 overflow-hidden">
            <div className="card-body pb-0">
              <h4 className="fs-4 mb-1 card-title">Add Shift</h4>
              <p className="mb-0 card-subtitle">
                Set all information to create a new shift
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="shiftName" className="form-label">
                      Shift Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shiftName"
                      placeholder="Enter shift name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="Enter description"
                      {...register("description")}
                    />
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="morningIn" className="form-label">
                      Morning In
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="morningIn"
                      {...register("morningIn")}
                    />
                    {errors.morningIn && (
                      <small className="text-danger">
                        {errors.morningIn.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="morningOut" className="form-label">
                      Morning Out
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="morningOut"
                      {...register("morningOut")}
                    />
                    {errors.morningOut && (
                      <small className="text-danger">
                        {errors.morningOut.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="afternoonIn" className="form-label">
                      Afternoon In
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="afternoonIn"
                      {...register("afternoonIn")}
                    />
                    {errors.afternoonIn && (
                      <small className="text-danger">
                        {errors.afternoonIn.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="afternoonOut" className="form-label">
                      Afternoon Out
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="afternoonOut"
                      {...register("afternoonOut")}
                    />
                    {errors.afternoonOut && (
                      <small className="text-danger">
                        {errors.afternoonOut.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="allowedLateMinutes" className="form-label">
                      Allowed Late Minutes
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="allowedLateMinutes"
                      placeholder="Enter allowed late minutes"
                      {...register("allowedLateMinutes", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.allowedLateMinutes && (
                      <small className="text-danger">
                        {errors.allowedLateMinutes.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="totalServedHrPerDay" className="form-label">
                      Total Served Hours Per Day
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="totalServedHrPerDay"
                      value={totalHours.toFixed(2)}
                      readOnly
                      placeholder="Enter hours"
                      {...register("totalServedHrPerDay", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.totalServedHrPerDay && (
                      <small className="text-danger">
                        {errors.totalServedHrPerDay.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="scanTimeout" className="form-label">
                      Scan Timeout (Minutes)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="scanTimeout"
                      placeholder="Enter scan timeout"
                      {...register("scanTimeout", { valueAsNumber: true })}
                    />
                    {errors.scanTimeout && (
                      <small className="text-danger">
                        {errors.scanTimeout.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Save Shift
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddShift;
