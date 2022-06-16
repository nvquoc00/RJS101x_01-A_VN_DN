import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  Col,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

function RenderStaffItem({ staff }) {
  return (
    <Card>
      <Link to={`/nhanvien/${staff.id}`}>
        <Card>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardBody>
            <CardTitle>{staff.name}</CardTitle>
          </CardBody>
        </Card>
      </Link>
    </Card>
  );
}

class StaffList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameF: "",
      isModalOpen: false,
    };

    this.timNhanVien = this.timNhanVien.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  timNhanVien(event) {
    event.preventDefault();
    const nameS = event.target.nameS.value;
    this.setState({ nameF: nameS });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit = (value) => {
    const newStaff = {
      name: value.name,
      doB: value.doB,
      startDate: value.startDate,
      department: value.department,
      salaryScale: value.salaryScale,
      annualLeave: value.annualLeave,
      overTime: value.overTime,
      image: "/assets/images/alberto.png",
    };

    this.props.onAdd(newStaff);
  };

  render() {
    const staffList = this.props.staffs
      .filter((staff) => {
        if (this.state.nameF === "") return staff;
        else if (
          staff.name.toLowerCase().includes(this.state.nameF.toLowerCase())
        )
          return staff;
        return 0;
      })
      .map((staff) => {
        return (
          <div className="col-6 col-md-4 col-lg-2 mt-2 mb-2" key={staff.id}>
            <RenderStaffItem staff={staff} />
          </div>
        );
      });
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mt-3">
              <div className="row">
                <div className="col-10 col-md-10">
                  <h3>Nhân viên</h3>
                </div>
              </div>
            </div>
            <div className="p-2 bg-white rounded m-2">
              <div className="col-2 col-auto">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
            </div>
            <form
              onSubmit={this.timNhanVien}
              className="form-group row p-2 bg-white rounded"
            >
              <div className="col-8 col-md-7 m-2">
                <input
                  type="text"
                  name="nameS"
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên ..."
                />
              </div>
              <div className="col-2 col-md-4 p-2 bg-white rounded">
                <button className="btn btn-primary" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
          <div className="row">{staffList}</div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="control-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id=".name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    model=".name"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu  ",
                      minLength: "nhập nhiều hơn 3 ký tự",
                      maxLength: "Yêu cầu nhập ít hơn 30 ký tự",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor=".doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Control.text
                    type="date"
                    model=".doB"
                    className="form-control"
                    id=".doB"
                    name="doB"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    model=".doB"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor=".startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control.text
                    type="date"
                    model=".startDate"
                    className="form-control"
                    id=".startDate"
                    name="startDate"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    model=".startDate"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    id="department"
                    defaultValue="Sale"
                    className="form-control"
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    id=".salaryScale"
                    name="salaryScale"
                    placeholder="1.0 -> 3.0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    defaultValue="1"
                    className="form-control"
                  />
                  <Errors
                    model=".salaryScale"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    id=".annualLeave"
                    name="annualLeave"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".annualLeave"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    id=".overTime"
                    name="overTime"
                    defaultValue="0"
                    validators={{
                      required,
                      isNumber,
                    }}
                    className="form-control"
                  />
                  <Errors
                    model=".overTime"
                    className="text-danger"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      isNumber: "Phải là chữ số",
                    }}
                  />
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="submit" md={9}></Label>
                <Col md={3}>
                  <Button type="submit" value="submit" color="primary">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StaffList;
