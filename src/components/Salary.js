import React, { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const luongCb = 3000000;
const luongGio = 200000 / 8;

function RenderSalary({ salary, colorSalary }) {
  return (
    <Card>
      <CardTitle className="p-3 bg-white rounded m-2">{salary.name}</CardTitle>
      <CardBody>
        <CardText>Mã nhân viên: {salary.id}</CardText>
        <CardText>Hệ số lương: {salary.salaryScale}</CardText>
        <CardText>Số giờ làm thêm: {salary.overTime}</CardText>
        <CardText className="bg-light p-2 shadow">
          Lương:{" "}
          <NumberFormat
            value={(
              salary.salaryScale * luongCb +
              salary.overTime * luongGio
            ).toFixed(0)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"VNĐ "}
          />
        </CardText>
      </CardBody>
    </Card>
  );
}

function Salary(props) {
  const [sortSalary, setSortSalary] = useState(false);

  const salaryOfStaff = props.salary
    .sort((a, b) =>
      sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale
    )
    .map((salary) => {
      return (
        <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={salary.id}>
          <RenderSalary salary={salary} />
        </div>
      );
    });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <button
        className="btn btn-danger"
        onClick={() => setSortSalary(!sortSalary)}
      >
        Sắp xếp theo Hệ số lương
      </button>
      <div className="row shadow mb-3">{salaryOfStaff}</div>
    </div>
  );
}

export default Salary;
