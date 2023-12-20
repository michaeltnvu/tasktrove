import { Container, Nav, Navbar } from "react-bootstrap";

const Header = ({ activeProject }) => {
  return (
    <Navbar expand="xl" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/tasktrove">Task Trove</Navbar.Brand>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Projects
        </button>
        <p className="ms-3 mt-3">
          Current project: {activeProject ? activeProject.title : null}
        </p>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/tasktrove">Dashboard</Nav.Link>
            <Nav.Link href="/tasktrove/about">About</Nav.Link>
            <Nav.Link href="/tasktrove/store">Store</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
