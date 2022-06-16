import React, { Component } from "react";
import Header from "./Header";
import Home from "./Home";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import Contact from "./Contact";
import Footer from "./Footer";
import {
  Switch,
  Route,
  Redirect,
  useParams,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      departments: this.props.departments,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
    console.log(newStaff);
    console.log(this.state.staffs);
  };

  StaffWithId = () => {
    const params = useParams();
    return (
      <StaffDetail
        staff={
          this.state.staffs.filter(
            (item) => item.id === parseInt(params.staffId, 10)
          )[0]
        }
      />
    );
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/nhanvien"
            component={() => (
              <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />
            )}
          ></Route>
          <Route path="/nhanvien/:staffId" component={this.StaffWithId} />
          <Route
            exact
            path="/phongban"
            component={() => <Department dept={this.state.departments} />}
          />
          <Route
            exact
            path="/bangluong"
            component={() => <Salary salary={this.state.staffs} />}
          />
          <Route exact path="/lienhe" component={Contact} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
