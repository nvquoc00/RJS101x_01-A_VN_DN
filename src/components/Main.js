import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import Contact from "./Contact";
import Footer from "./Footer";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/nhanvien"
          component={() => <StaffList staffs={staff.staffs} />}
        ></Route>
        <Route path="/nhanvien/:staffId" component={StaffWithId} />
        <Route
          exact
          path="/phongban"
          component={() => <Department dept={staff.departments} />}
        />
        <Route
          exact
          path="/bangluong"
          component={() => <Salary salary={staff.staffs} />}
        />
        <Route exact path="/lienhe" component={Contact} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
