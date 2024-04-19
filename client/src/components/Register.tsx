import { useEffect, useState } from "react";
import logo from "/logoedi.png";
import "./register.scss";
import { useAppDispatch, useAppSelector } from "../app/store/hook";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";
import { registercandidate, reset } from "../app/store/feature/userSlice";

const Register = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [UserEmail, setUserEmail] = useState("");
  const [Role, setRole] = useState("candidate");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const messageError = useAppSelector((state) => state.users.message);
  const isSuccess = useAppSelector((state) => state.users.isSuccess);

  const register = async (e: any) => {
    e.preventDefault();
    await dispatch(
      registercandidate({ UserEmail, Password, ConfirmPassword, Role })
    );
  };
  useEffect(() => {
    if (messageError) {
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
  }, [messageError]);
  useEffect(() => {
    if (isSuccess) {
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
        title: "Berhasil Mendaftar, silahkan login",
      });

      navigate("/");
    }
    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const alertstyle = {
    color: "red",
    fontSize: "12px",
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

            <h4 className="card-title mt-3 mb-3">Register Page</h4>
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
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-sm item-center p-2 rounded-3 mb-2"
              onClick={register}
            >
              Daftar
            </button>
            <p className="forgot" style={fontstyle}>
              sudah punya akun?
              <a href="/">
                <span>login</span>
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
          <a href="https://www.megainovasiorganik.com"> CRUD APP</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
