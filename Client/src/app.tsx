import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./app.css";
import "./assets/css/styles.min.css";

import AdminLayout from "./Layout/AdminLayout";
import HRDashboard from "./Pages/HrManager/HRDashboard";
import HrManagerLayout from "./Layout/HrManagerLayout";
import ShiftManagement from "./Pages/HrManager/Settings/ShiftManagement";
import AddShift from "./Pages/HrManager/Settings/AddShift";
import AddUsers from "./Pages/HrManager/Settings/AddUsers";
import AddEmployee from "./Pages/HrManager/Employee/AddEmployee";
import EmployeeList from "./Pages/HrManager/Employee/EmployeeList";

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/manager" element={<HrManagerLayout></HrManagerLayout>}>
            <Route index element={<HRDashboard></HRDashboard>}></Route>
            <Route
              path="shift/management"
              element={<ShiftManagement></ShiftManagement>}
            ></Route>
            <Route path="shift/add" element={<AddShift></AddShift>}></Route>
            <Route path="add/users" element={<AddUsers></AddUsers>}></Route>
            <Route
              path="add/employee"
              element={<AddEmployee></AddEmployee>}
            ></Route>
            <Route
              path="employee/list"
              element={<EmployeeList></EmployeeList>}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
