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

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/manager" element={<HrManagerLayout></HrManagerLayout>}>
            <Route index element={<HRDashboard></HRDashboard>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
