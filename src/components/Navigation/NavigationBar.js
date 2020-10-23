import React from 'react';
import { Nav, Navbar, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`

.navbar { 
       
}

.color-nav {
    background-color: rgb(95, 174, 31)
}
.navbar-nav{
    display:"flex";
    flexDirection:"row";
}
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

const NavigationBar = () => (

<Styles>

  <Navbar className="color-nav" expand="lg" bg="dark" variant="dark">
  { /*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */ }
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto" >
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/blog">Blog</Nav.Link>
      <Nav.Link href="/about">Hooks</Nav.Link>
      <NavDropdown title="Gallery" id="basic-nav-dropdown">
        <NavDropdown.Item href="/ananya">Ananya</NavDropdown.Item>
        <NavDropdown.Item href="/anvika">Anvika</NavDropdown.Item>
        <NavDropdown.Item href="/garden">Garden</NavDropdown.Item>
        <NavDropdown.Item href="/general">General</NavDropdown.Item>
        <NavDropdown.Item href="/graphics">Random</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Divider</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>


</Styles>


)

export default NavigationBar