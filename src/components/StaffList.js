import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaffItem({ staff, onClick }) {
  return (
    <Card>
      <Link to={`/nhanvien/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardTitle className="p-2 bg-white rounded m-2">{staff.name}</CardTitle>
      </Link>
    </Card>
  );
}

function StaffList(props) {
  const staffList = props.staffs.map((staff) => {
    return (
      <div className="col-6 col-md-4 col-lg-2 mt-2 mb-2" key={staff.id}>
        <RenderStaffItem staff={staff} onClick={props.onClick} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{staffList}</div>
    </div>
  );
}

export default StaffList;
