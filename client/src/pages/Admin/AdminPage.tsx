import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import CandidateListPage from "./CandidateListPage";
import GetCandidatePage from "./GetProfileCandidatePage";
import AdminListPage from "./AdminListPage";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { createAdmins } from "../../app/store/feature/adminSlice";

const AdminPage = () => {
  const [editCandidate, setCandidate] = useState(false);
  const [accessAdmin, setaccessAdmin] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const [createAdmin, setCreateAdmin] = useState({
    Password: "",
    UserEmail: "",
    Role: "admin",
    AdminName: "",
    ConfirmPassword: "",
  });
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch, accessToken]);
  const hendleCreateAdmin = async () => {
    try {
      await dispatch(
        createAdmins({
          Password: createAdmin?.Password,
          UserEmail: createAdmin?.UserEmail,
          Role: createAdmin?.Role,
          AdminName: createAdmin?.AdminName,
          ConfirmPassword: createAdmin?.ConfirmPassword,
          accessToken,
        })
      );
      dispatch(refreshToken());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="admin">
      <Navbar>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <a
              className={`nav-link ${accessAdmin ? null : "active"}`}
              aria-current="page"
              href="#"
              onClick={() => setaccessAdmin(!accessAdmin)}
            >
              Candidate
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${accessAdmin ? "active" : null}`}
              href="#"
              onClick={() => setaccessAdmin(!accessAdmin)}
            >
              Admin
            </a>
          </li>
        </ul>
      </Navbar>
      <div
        className="container  container-center"
        style={{ marginTop: "100px" }}
      >
        {!accessAdmin ? (
          !editCandidate ? (
            <div className="card w-100 ">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <div className="p-2">
                    <h5>Data Pelamar</h5>
                  </div>
                  <div className="p-2"></div>
                </div>
              </div>
              <div className="card-body">
                <CandidateListPage setEditCandidate={setCandidate} />
              </div>
            </div>
          ) : (
            <GetCandidatePage setEditCandidate={setCandidate} />
          )
        ) : (
          <div className="card w-100 ">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div className="p-2">
                  <h5>Data Admin</h5>
                </div>
                <div className="p-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Tambah Admin
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Tambah Admin
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form>
                          <div className="modal-body">
                            <table className="table table-borderless table-sm">
                              <tbody>
                                <tr>
                                  <th scope="row">Nama</th>
                                  <td>
                                    <input
                                      type="email"
                                      className="form-control form-control-sm"
                                      placeholder="Nama Admin"
                                      value={createAdmin.AdminName}
                                      onChange={(e) =>
                                        setCreateAdmin({
                                          ...createAdmin,
                                          AdminName: e.target.value,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Email</th>
                                  <td>
                                    <input
                                      type="email"
                                      className="form-control form-control-sm"
                                      placeholder="Email"
                                      value={createAdmin.UserEmail}
                                      onChange={(e) =>
                                        setCreateAdmin({
                                          ...createAdmin,
                                          UserEmail: e.target.value,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Password</th>
                                  <td>
                                    <input
                                      type="password"
                                      className="form-control form-control-sm"
                                      placeholder="Password"
                                      value={createAdmin.Password}
                                      onChange={(e) =>
                                        setCreateAdmin({
                                          ...createAdmin,
                                          Password: e.target.value,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Confirm Password</th>
                                  <td>
                                    <input
                                      type="password"
                                      className="form-control form-control-sm"
                                      placeholder="Confirm Password"
                                      value={createAdmin.ConfirmPassword}
                                      onChange={(e) =>
                                        setCreateAdmin({
                                          ...createAdmin,
                                          ConfirmPassword: e.target.value,
                                        })
                                      }
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={hendleCreateAdmin}
                            >
                              Simpan
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <AdminListPage setEditCandidate={setCandidate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
