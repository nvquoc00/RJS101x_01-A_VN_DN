import React from "react";

function StaffList(props) {
  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id}>
        <div className="col-12  m-1">
          <img src={staff.image} width="150" alt={staff.name} />
          <p className="text-center">{staff.name}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{staffList}</div>
    </div>
  );
}

export default StaffList;
