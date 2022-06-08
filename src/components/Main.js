import React, { useState } from "react";
import Header from "./Header";
import StaffList from "./StaffList";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../data/staffs";
function Main() {
  const [staff, setStaff] = useState({
    staffs: STAFFS,
    departments: DEPARTMENTS,
  });
  return (
    <div>
      <Header />
      <Route
        exact
        path="/nhanvien"
        component={() => <StaffList staffs={staff.staffs} />}
      />
      <Footer />
    </div>
  );
}

export default Main;
