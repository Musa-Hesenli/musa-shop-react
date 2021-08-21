import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearCookies, getCookie } from "../../store/reducers/authSlice";



export default class MenuExampleSecondary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_authenticated : getCookie('is_authenticated'),
    }
  }

  logOut = () => {
    clearCookies();
    window.location.reload();
  }
  

  render() {

    const authConditionalRender = this.state.is_authenticated ? (
        <React.Fragment>
          <NavDropdown title={getCookie('username')} id="basic-nav-dropdown">
              <Link to='/account' exact className='dropdown-item'>
                  Account
              </Link>
              <Link to='/account/cart' className='dropdown-item'>
                  Cart
              </Link>
              <Link to='/account/favorites' className='dropdown-item'>
                  Favorites
              </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
          </NavDropdown>
          <span style={{ cursor : 'pointer' }} onClick={this.logOut} className='nav-link'>
            Log out
          </span>
        </React.Fragment>
    ) : (
      <React.Fragment>
        <Link to='/login' className='nav-link'>
                  Login
                </Link>
              <Link to='/create-account' className='nav-link'>Create Account</Link>
      </React.Fragment>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" className='p-3' variant="light">
          <Link to='/' style={{ textDecoration : 'none' }}>
            <Navbar.Brand>
                Musa Shop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
                {authConditionalRender}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}
