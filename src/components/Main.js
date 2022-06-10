import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import Contact from "./Contact";
import Footer from "./Footer";
import { Routes, Route, useParams } from "react-router-dom";
import { DEPARTMENTS, STAFFS } from "../data/staffs";

function Main() {
  const [staff, setStaff] = useState({
    staffs: STAFFS,
    departments: DEPARTMENTS,
  });

  const StaffWithId = () => {
    const params = useParams();
    return (
      <StaffDetail
        staff={
          staff.staffs.filter(
            (item) => item.id === parseInt(params.staffId, 10)
          )[0]
        }
      />
    );
  };
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nhanvien"
          element={<StaffList staffs={staff.staffs} />}
        ></Route>
        <Route path="/nhanvien/:staffId" element={<StaffWithId />} />
        <Route
          path="phongban"
          element={<Department dept={staff.departments} />}
        />
        <Route path="bangluong" element={<Salary salary={staff.staffs} />} />
        <Route path="lienhe" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
