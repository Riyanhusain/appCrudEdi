import React, { useEffect, useState } from "react";
import logo from "/logoedi.png";
import Navbar from "../../components/navbar/Navbar";
import {
  faEdit,
  faPenToSquare,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { getProfile } from "../../app/store/feature/candidateSlice";
import { refreshToken } from "../../app/store/feature/userSlice";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import RegisterCandidate from "./RegisterCandidate";
import CreateEducationPage from "../Education/CreateEducationPage";
import EditEducationPage from "../Education/EditEducationPage";
import { deleteEducation } from "../../app/store/feature/educationSlice";
import CreateExperiancePage from "../Experience/CreateExperiancePage";
import EditExperiencePage from "../Experience/EditExperiencePage";
import { deleteExperience } from "../../app/store/feature/experienceSlice";
import CreateTranningPage from "../Tranning/CreateTranningPage";
import EditTranningPage from "../Tranning/EditTranningPage";
import { deleteTranning } from "../../app/store/feature/tranningSlice";

const DataEntryProfilePage = () => {
  const [decode, setDecode] = useState<any>(null);
  const [editCandidate, setCandidate] = useState(false);
  const [createTranning, setCreateTranning] = useState(false);
  const [editTranning, setEditTranning] = useState(false);
  const [tranningId, setTranningId] = useState(null);
  const [createExperience, setCreateExperience] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [experienceId, setExperienceId] = useState(null);
  const [createEducation, setCreateEducation] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [educationId, setEducaitonId] = useState(null);
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const candidateData = useAppSelector((state) => state.candidate.candidate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    if (accessToken) {
      setDecode(jwtDecode(accessToken));
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken]);

  const birthDate = candidateData?.DateOfBirth
    ? moment(candidateData?.DateOfBirth).format("DD MMMM YYYY")
    : null;

  return (
    <div className="dataEntry">
      <Navbar />

      <div
        className="container  container-center"
        style={{ marginTop: "100px" }}
      >
        {!editCandidate ? (
          <div className="card w-100 ">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <div className="p-2">
                  <h5>Data Pribadi Pelamar</h5>
                </div>
                <div className="p-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setCandidate(true)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faPenToSquare} type="button" />{" "}
                      ubah data
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row mt-4">
                <div className="col-3">
                  <img
                    src={candidateData?.url}
                    alt=""
                    style={{ width: "150px" }}
                  />
                </div>
                <div className="col">
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <th scope="row">Posisi Yang Dilamar</th>
                        <td>{candidateData?.CandidatePosition}</td>
                      </tr>
                      <tr>
                        <th scope="row">Nama</th>
                        <td>{candidateData?.CandidteName}</td>
                      </tr>
                      <tr>
                        <th scope="row">No. KTP</th>
                        <td>{candidateData?.Nik}</td>
                      </tr>
                      <tr>
                        <th scope="row">Tempat, Tanggal Lahir</th>
                        <td>
                          {candidateData?.PlaceOfBirth}, {birthDate}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Agama</th>
                        <td>{candidateData?.Religion}</td>
                      </tr>

                      <tr>
                        <th scope="row">Jenis Kelamin</th>
                        <td>{candidateData?.Gender}</td>
                      </tr>
                      <tr>
                        <th scope="row">Golongan Darah</th>
                        <td>{candidateData?.BloodType}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>{candidateData?.CandidateStatus}</td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat KTP</th>
                        <td>{candidateData?.KtpAddress}</td>
                      </tr>
                      <tr>
                        <th scope="row">Alamat Tinggal</th>
                        <td>{candidateData?.DomicileAddress}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{decode?.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">No Telp</th>
                        <td>{candidateData?.PhoneNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Orang Terdekat</th>
                        <td>{candidateData?.Bestie}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RegisterCandidate setEditCandidate={setCandidate} />
        )}
        {/* Pendidikan */}{" "}
        {!createEducation ? (
          !editEducation ? (
            <div className="card w-100  mt-3">
              <div className="card-header ">
                <div className="d-flex justify-content-between ">
                  <div className="p-2">
                    <h5>Pendidikan Terakhir</h5>
                  </div>
                  <div className="p-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setCreateEducation(true)}
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlusSquare} type="button" />{" "}
                        tambah data
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {candidateData?.education?.map((data: any) => (
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <div className="row ">
                            <div className="col">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td>
                                      {moment(data.GraduateYear).format("YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <h6>{data.SchoolName}</h6>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {data.GradeTitle}-{data.Major}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>{data.GPA}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col">
                              <div className="d-flex flex-row-reverse">
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      setEditEducation(true),
                                        setEducaitonId(data.id);
                                    }}
                                  />
                                </div>
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      dispatch(refreshToken());

                                      dispatch(
                                        deleteEducation({
                                          id: data.id,
                                          accessToken,
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <EditEducationPage
              setEditEducation={setEditEducation}
              id={educationId}
            />
          )
        ) : (
          <CreateEducationPage setEducation={setCreateEducation} />
        )}
        {/* Pengalaman  */}
        {!createExperience ? (
          !editExperience ? (
            <div className="card w-100  mt-3">
              <div className="card-header ">
                <div className="d-flex justify-content-between ">
                  <div className="p-2">
                    <h5>Riwayat Pekerjaan</h5>
                  </div>
                  <div className="p-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setCreateExperience(true)}
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlusSquare} type="button" />{" "}
                        tambah data
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {candidateData?.experiences?.map((data: any) => (
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <div className="row ">
                            <div className="col">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td>{moment(data.Year).format("YYYY")}</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <h6>{data.CompanyName}</h6>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>{data.LastPosition}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col">
                              <div className="d-flex flex-row-reverse">
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      setEditExperience(true),
                                        setExperienceId(data.id);
                                    }}
                                  />
                                </div>
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      dispatch(refreshToken());
                                      dispatch(
                                        deleteExperience({
                                          id: data.id,
                                          accessToken,
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <EditExperiencePage
              setEditExperience={setEditExperience}
              id={experienceId}
            />
          )
        ) : (
          <CreateExperiancePage setCreateExperience={setCreateExperience} />
        )}
        {/* Pelatihan  */}
        {!createTranning ? (
          !editTranning ? (
            <div className="card w-100  mt-3 mb-4">
              <div className="card-header ">
                <div className="d-flex justify-content-between ">
                  <div className="p-2">
                    <h5>Riwayat Pelatihan</h5>
                  </div>
                  <div className="p-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setCreateTranning(true)}
                    >
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlusSquare} type="button" />{" "}
                        tambah data
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {candidateData?.trannings?.map((data: any) => (
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <div className="row ">
                            <div className="col">
                              <table className="table table-borderless table-sm">
                                <tbody>
                                  <tr>
                                    <td>
                                      {moment(data.TranningYear).format("YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <h6>{data.TranningName}</h6>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>
                                      {data.Sertification === false
                                        ? "Tidak"
                                        : "Ada"}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col">
                              <div className="d-flex flex-row-reverse">
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      setEditTranning(true);
                                      setTranningId(data.id);
                                    }}
                                  />
                                </div>
                                <div className="p-2">
                                  <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    style={{ color: "blue" }}
                                    type="button"
                                    onClick={() => {
                                      dispatch(refreshToken());
                                      dispatch(
                                        deleteTranning({
                                          id: data.id,
                                          accessToken,
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <EditTranningPage
              setEditTranning={setEditTranning}
              id={tranningId}
            />
          )
        ) : (
          <CreateTranningPage setCreateTranning={setCreateTranning} />
        )}
      </div>
    </div>
  );
};

export default DataEntryProfilePage;
