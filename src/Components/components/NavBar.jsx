import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div className="navbar-brand">Umida's Email</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
