import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  Col,
  Form,
  Input,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

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
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      nameF: "",
      isModalOpen: false,
    };

    this.timNhanVien = this.timNhanVien.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };

    this.props.onAdd(newStaff);
  };

  validate(
    name,
    department,
    salaryScale,
    doB,
    startDate,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: "",
      department: "",
      salaryScale: "",
      doB: "",
      startDate: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.name && name.length < 3)
      errors.name = "Name should be >= 3 characters";
    else if (this.state.touched.name && name.length > 20)
      errors.name = "Name should be <= 20 characters";
    if (this.state.touched.department && department.length < 1)
      errors.department = "Yêu cầu nhập";
    if (this.state.touched.salaryScale && salaryScale.length < 1)
      errors.salaryScale = "Yêu cầu nhập";
    if (this.state.touched.annualLeave && annualLeave.length < 1)
      errors.annualLeave = "Yêu cầu nhập";
    if (this.state.touched.overTime && overTime.length < 1)
      errors.overTime = "Yêu cầu nhập";
    if (this.state.touched.doB && doB.length < 1) errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Yêu cầu nhập";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.department,
      this.state.doB,
      this.state.startDate,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );

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
            <Form onSubmit={this.handleSubmit}>
              <Row className="control-group">
                <Label htmlFor="name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="department"
                    name="department"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onBlur={this.handleBlur("department")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={this.handleBlur("salaryScale")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghĩ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={this.handleBlur("annualLeave")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={this.handleBlur("overTime")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
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
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StaffList;
