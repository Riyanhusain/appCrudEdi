import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../app/store/feature/userSlice";
import { useAppDispatch } from "../../app/store/hook";
import logo from "/logoedi.png";
const Navbar = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUsers = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const styleLogo = {
    width: "40px",
  };
  return (
    <div className="heading">
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" style={styleLogo} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            {children}
          </div>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={logoutUsers}
                >
                  LogOut
                </button>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
