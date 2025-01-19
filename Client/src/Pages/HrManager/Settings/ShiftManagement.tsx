import { useEffect, useState } from "preact/hooks";
import { MdModeEdit } from "react-icons/md";
import api from "../../../Services/api";
import UpdateShiftSetting from "./UpdateShiftSetting";

export interface Shift {
  id: number;
  name: string;
  description: string;
  morningIn: string;
  morningOut: string;
  afternoonIn: string;
  afternoonOut: string;
  allowedLateMinutes: number;
  totalServerdHrPerDay: number;
  scantimeOut: number;
  Employee: [Employee];
}

interface Employee {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  Position: {
    name: string;
  };
}
function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await api.get("/hrmanager/get-shift");
      const formatTime = (timeString: string) => {
        const date = new Date(timeString);
        date.setHours(date.getHours() - 3);
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Ensures AM/PM format
        });
      };
      const formattedShifts = response.data.shift.map((shift: Shift) => ({
        ...shift,
        morningIn: formatTime(shift.morningIn),
        morningOut: formatTime(shift.morningOut),
        afternoonIn: formatTime(shift.afternoonIn),
        afternoonOut: formatTime(shift.afternoonOut),
      }));

      setShifts(formattedShifts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateClick = (shift: Shift) => {
    setSelectedShift(shift);
  };

  const handleCancelUpdate = () => {
    setSelectedShift(null);
    fetch();
  };

  return (
    <>
      <div className="row">
        {shifts.map((shift) => (
          <>
            {selectedShift ? (
              <UpdateShiftSetting
                shift={selectedShift}
                onCancel={handleCancelUpdate}
              />
            ) : (
              <>
                <div className="col-lg-8 d-flex align-items-stretch">
                  <div className="card w-100 overflow-hidden">
                    <div className="card-body pb-0">
                      <h4 className="fs-4 mb-1 card-title">{shift.name}</h4>
                      <p className="mb-0 card-subtitle">Setting </p>
                    </div>
                    <div data-simplebar="" className="position-relative">
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <h6 className="">Name</h6>
                            <p className="fw-bold">{shift.name}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="">Description</h6>
                            <p className="fw-bold">{shift.description}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="">Morning In</h6>
                            <p className="fw-bold">{shift.morningIn}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="">Morning Out</h6>
                            <p className="fw-bold">{shift.morningOut}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <h6 className="">Afternoon In</h6>
                            <p className="fw-bold">{shift.afternoonIn}</p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="">Afternoon Out</h6>
                            <p className="fw-bold">{shift.afternoonOut}</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <h6 className="">Allowed Late Minutes</h6>
                            <p className="fw-bold">
                              {shift.allowedLateMinutes}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <h6 className="">Total Served Hours</h6>
                            <p className="fw-bold">
                              {shift.totalServerdHrPerDay}
                            </p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className=" col-md-6 ">
                            <h6 className="text-danger">Scan Timeout</h6>
                            <p className="fw-bold">{shift.scantimeOut}</p>
                          </div>
                          <div className="col-md-6">
                            <button
                              onClick={() => handleUpdateClick(shift)}
                              className="btn btn-primary m-1 d-flex align-items-center"
                            >
                              <MdModeEdit size={24} />
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="card w-100">
                <div className="card-body">
                  <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h4 className="mb-0 card-title">Employee List</h4>
                  </div>
                  <ul className="list-unstyled mb-0">
                    {shift.Employee.slice(0, 4).map((employee) => (
                      <>
                        <li className="d-flex align-items-center justify-content-between py-10 border-bottom">
                          <div className="d-flex align-items-center">
                            <div className=" me-3 d-inline-flex align-items-center justify-content-center">
                              <img
                                src="/images/profile/user-1.jpg"
                                alt=""
                                width={35}
                                height={35}
                                className="rounded-circle"
                              />
                            </div>
                            <div>
                              <h6 className="mb-1 fs-3">
                                {employee.firstName +
                                  " " +
                                  employee.middleName +
                                  " " +
                                  employee.lastName}{" "}
                              </h6>
                              <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                                {employee.Position.name}
                                <i className="ti ti-info-circle" />
                              </p>
                            </div>
                          </div>
                        </li>
                      </>
                    ))}

                    <a
                      href="javascript:void(0)"
                      className="fs-4 mt-7 text-center d-block"
                    >
                      View more Employee
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ShiftManagement;
