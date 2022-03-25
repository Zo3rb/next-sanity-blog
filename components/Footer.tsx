import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="text-center bg-dark text-white p-5 mt-auto">
      <Container fluid>
        <p>&copy; Snippets 2022. All Rights Reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">FAQ</a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
