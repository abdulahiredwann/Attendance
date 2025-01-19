import { z } from "zod";
import { useForm } from "react-hook-form";
import { MdModeEdit } from "react-icons/md";
import { Shift } from "./ShiftManagement";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "preact/hooks";
import React from "preact/compat";
import api from "../../../Services/api";
import Swal from "sweetalert2";

// Define schema using zod
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

type FormData = z.infer<typeof schema>;

interface Props {
  shift: Shift;
  onCancel: () => void;
}

function UpdateShiftSetting({ shift, onCancel }: Props) {
  const [totalHours, setTotalHours] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: shift.name,
      description: shift.description,

      allowedLateMinutes: shift.allowedLateMinutes,
      scanTimeout: shift.scantimeOut,
      totalServedHrPerDay: shift.totalServerdHrPerDay,
    },
  });
  const morningIn = watch("morningIn");
  const morningOut = watch("morningOut");
  const afternoonIn = watch("afternoonIn");
  const afternoonOut = watch("afternoonOut");

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
  const onSubmit = async (data: FormData) => {
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

      const response = await api.put(
        `/hrmanager/update-shift/${shift.id}`,
        payload
      );
      Swal.fire({
        icon: "success",
        title: "Update  Shift!",
        text: response.data.message || "Shift Update Succefully",
      });
      onCancel();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Error Update Shift!",
      });
    }
  };

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
    setValue("totalServedHrPerDay", total);
  };
  React.useEffect(() => {
    calculateTotalHours();
  }, [morningIn, morningOut, afternoonIn, afternoonOut]);

  useEffect(() => {
    reset({
      name: shift.name,
      description: shift.description,

      allowedLateMinutes: shift.allowedLateMinutes || 0,
      totalServedHrPerDay: shift.totalServerdHrPerDay || 0,
      scanTimeout: shift.scantimeOut || 0,
    });
  }, [shift, reset]);

  console.log(errors);
  return (
    <>
      <div className="col-lg-8 d-flex align-items-stretch">
        <div className="card w-100 overflow-hidden">
          <div className="card-body pb-0">
            <h4 className="fs-4 mb-1 card-title">Update {shift.name}</h4>
            <p className="mb-0 card-subtitle">
              Edit shift details below and the Employee will get SMS about
              update!
            </p>
          </div>
          <div data-simplebar="" className="position-relative">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
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
                      placeholder="Enter hours"
                      readOnly
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
                      Scan Timeout
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
                <div className="row mt-3">
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center"
                    >
                      <MdModeEdit size={24} />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={onCancel}
                      className="btn btn-danger"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateShiftSetting;
