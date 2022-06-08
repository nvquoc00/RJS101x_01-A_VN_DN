import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggle,
  NavItem,
  Collapse,
} from "reactstrap";

function Header() {
  return (
    <div>
      <Navbar className="header">
        <div className="container">
          <NavbarBrand>
            <img
              src="assets/images/logo.png"
              width="50"
              alt="Quan Ly Nhan Vien"
            />
          </NavbarBrand>
          <Nav>
            <NavItem>
              <span className="fa fa-users fa-lg"></span>Nhân viên
            </NavItem>
            <NavItem>
              <span className="fa fa-id-card fa-lg"></span>Phòng ban
            </NavItem>
            <NavItem>
              <span className="fa fa-money fa-lg"></span>Bảng lương
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
