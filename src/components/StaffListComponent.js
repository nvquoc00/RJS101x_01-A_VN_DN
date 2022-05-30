import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardGroup,
  CardTitle,
} from "reactstrap";
import dateFormat from "dateformat";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelectedStaff: null,
    };
  }
  onStaffSelect(staff) {
    this.setState({
      onSelectedStaff: staff,
    });
  }
  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="col-12">
          <CardGroup>
            <div className="col-4">
              <Card>
                <CardImg
                  width="100%"
                  height="260px"
                  src={staff.image}
                  alt={staff.name}
                />
              </Card>
            </div>
            <div className="col-8">
              <Card>
                <CardBody>
                  <CardTitle>Họ và tên: {staff.name}</CardTitle>
                  <CardText>
                    Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                  </CardText>
                  <CardText>
                    Ngày vào công ty:{" "}
                    {dateFormat(staff.startDate, "dd/mm/yyyy")}
                  </CardText>
                  <CardText>Phòng ban: {staff.department.name}</CardText>
                  <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                  <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </CardBody>
              </Card>
            </div>
          </CardGroup>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-md-12 mt-1">
          <Card key={staff.id} onClick={() => this.onStaffSelect(staff)}>
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{staffList}</div>
        <div className="row mt-5">
          {this.renderStaff(this.state.onSelectedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
