import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentRouter = router.pathname;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Link href="/">
            <Navbar.Brand style={{ cursor: "pointer" }}>Snippets</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/about">
                <a
                  className={`nav-link ${
                    currentRouter === "/about" && "active"
                  }`}
                >
                  About
                </a>
              </Link>
              <Link href="/contact">
                <a
                  className={`nav-link ${
                    currentRouter === "/contact" && "active"
                  }`}
                >
                  Contact
                </a>
              </Link>
              <Link href="/follow">
                <a
                  className={`nav-link rounded-pill px-4 bg-success ${
                    currentRouter === "/follow" && "active"
                  }`}
                >
                  Follow
                </a>
              </Link>
            </Nav>
            <Nav>
              <Link href="/about">
                <a
                  className={`nav-link ${
                    currentRouter === "/sign-in" && "active"
                  }`}
                >
                  Sign In
                </a>
              </Link>
              <Link href="/contact">
                <a
                  className={`nav-link ${
                    currentRouter === "/get-started" && "active"
                  }`}
                >
                  Get Started
                </a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
