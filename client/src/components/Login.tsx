import { useEffect, useState } from "react";
import "./login.scss";
import logo from "/logoedi.png";
import { useAppDispatch, useAppSelector } from "../app/store/hook";
import { authLogin, reset } from "../app/store/feature/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { jwtDecode } from "jwt-decode";
import { logins } from "../app/store/feature/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
  const [UserEmail, setEmail] = useState("");
  const [Password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk melacak apakah sandi sedang ditampilkan
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.users.accessToken);
  const isSuccess = useAppSelector((state) => state.users.isSuccess);
  const isError = useAppSelector((state) => state.users.isError);
  const usersData = useAppSelector((state) => state.users.accessToken);
  const messageError = useAppSelector((state) => state.users.message);
  const login = async (e: any) => {
    e.preventDefault();
    await dispatch(authLogin({ UserEmail, Password }));
  };

  useEffect(() => {
    if (messageError && isError) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: messageError,
      });
    }
    dispatch(reset());
  }, [messageError, isError]);
  useEffect(() => {
    if (usersData && isSuccess) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Berhasil Login",
      });

      const decode = jwtDecode(token);
      dispatch(logins({ role: decode.role }));
      if (decode.role === "candidate") {
        navigate("/registerCandidate");
      } else {
        navigate("/admin");
      }
    }
  }, [usersData, isSuccess, navigate, dispatch]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fontstyle = {
    color: "black",
    fontSize: "12px",
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle ">
      <div className="card shadow">
        <div className="card-body">
          <div className="heading text-center ">
            <div>
              <img src={logo} alt="" className="logo" />
            </div>

            <h4 className="card-title mt-3 mb-3">Login Page</h4>
          </div>
          <form>
            <div className="mb-3 mt-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={UserEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group position-relative">
                <input
                  type={showPassword ? "text" : "password"} // Tampilkan teks atau password berdasarkan state showPassword
                  className="form-control"
                  id="exampleInputPassword1"
                  value={Password}
                  onChange={(e) => setPass(e.target.value)}
                />
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="position-absolute fixed"
                    type="button"
                    style={{ left: "330px", top: "10px", color: "grey" }}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="position-absolute"
                    type="button"
                    style={{ left: "330px", top: "10px", color: "grey" }}
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <a>
              <p className="forgot" style={fontstyle}>
                Forgot Password ?
              </p>
            </a>
            <button
              type="submit"
              className="btn btn-primary btn-sm item-center p-2 rounded-3 mb-2"
              onClick={login}
            >
              Login
            </button>

            <p className="forgot" style={fontstyle}>
              tidak punya akun?
              <a href="/register">
                <span>buat akun</span>
              </a>
            </p>
          </form>
        </div>
        <div
          id="emailHelp"
          className="form-text p-2 text-center"
          style={{ fontSize: "13px" }}
        >
          ©2022 All Rights Reserved.
          <a> CRUD APP</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
