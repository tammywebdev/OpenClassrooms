import BootstrapNavbar from 'react-bootstrap/Navbar';
import logo from './logo_90.png';
import './Navbar.css';

function Navbar() {
  return (
    <BootstrapNavbar >
      <BootstrapNavbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="90"
          height="90"
          className="d-inline-block align-top"
        />
        {' '}
        Restaurant Review Site
      </BootstrapNavbar.Brand>
    </BootstrapNavbar>
  );
}

export default Navbar;