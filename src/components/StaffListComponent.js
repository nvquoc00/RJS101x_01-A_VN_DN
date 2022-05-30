import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardGroup,
  CardTitle,
  Button,
} from "reactstrap";
import dateFormat from "dateformat";

const classChange = {
  col1: "col-12 col-md-12 col-lg-12 mt-1",
  col2: "col-6 col-md-6 col-lg-6 mt-1",
  col3: "col-4 col-md-4 col-lg-4 mt-1",
  col4: "col-3 col-md-3 col-lg-3 mt-1",
  col6: "col-2 col-md-2 col-lg-2 mt-1",
};

let { col1, col2, col3, col4, col6 } = classChange;

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelectedStaff: null,
      classDefault: "col-12 col-md-6 col-lg-4 mt-3",
    };
  }

  onStaffSelect(staff) {
    this.setState({
      onSelectedStaff: staff,
    });
  }

  onColumnSelect(col) {
    this.setState({
      classDefault: col,
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
        <div className={this.state.classDefault}>
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
        <div className="row m-3">
          <div className="col-2 ml-2">
            <Button
              outline
              onClick={() => this.onColumnSelect(col6)}
              color="primary"
            >
              6 cột
            </Button>
          </div>
          <div className="col-2 ml-2">
            <Button
              outline
              onClick={() => this.onColumnSelect(col4)}
              color="secondary"
            >
              4 cột
            </Button>
          </div>
          <div className="col-2 ml-2">
            <Button
              outline
              onClick={() => this.onColumnSelect(col3)}
              color="success"
            >
              3 cột
            </Button>
          </div>

          <div className="col-2 ml-2">
            <Button
              outline
              onClick={() => this.onColumnSelect(col2)}
              color="info"
            >
              2 cột
            </Button>
          </div>

          <div className="col-2 ml-2">
            <Button
              outline
              onClick={() => this.onColumnSelect(col1)}
              color="warning"
            >
              1 cột
            </Button>
          </div>
        </div>
        <div className="row">{staffList}</div>
        <div className="row mt-5">
          {this.renderStaff(this.state.onSelectedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
