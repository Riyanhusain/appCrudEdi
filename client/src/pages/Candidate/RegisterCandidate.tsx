import { useEffect, useState } from "react";
import logo from "/logoedi.png";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { jwtDecode } from "jwt-decode";
import {
  getProfile,
  updateCandidate,
  updateCandidateAdmin,
} from "../../app/store/feature/candidateSlice";
import moment from "moment";
const RegisterCandidate = ({ setEditCandidate, id }: any) => {
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const candidateData = useAppSelector((state) => state.candidate.candidate);
  const [decode, setDecode] = useState(null);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>("");
  const [preview, setPreview] = useState(candidateData?.url);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const [oldCandidate, setOldCandidate] = useState<any>({
    Bestie: candidateData?.Bestie,
    BloodType: candidateData?.BloodType,
    CandidatePosition: candidateData?.CandidatePosition,
    CandidateStatus: candidateData?.CandidateStatus,
    CandidteName: candidateData?.CandidteName,
    DateOfBirth: candidateData?.DateOfBirth,
    DomicileAddress: candidateData?.DomicileAddress,
    Gender: candidateData?.Gender,
    KtpAddress: candidateData?.KtpAddress,
    Nik: candidateData?.Nik,
    PhoneNumber: candidateData?.PhoneNumber,
    PlaceOfBirth: candidateData?.PlaceOfBirth,
    Religion: candidateData?.Religion,
    url: candidateData?.url,
    image,
  });

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken]);
  const hendleUpdateCandidate = async () => {
    dispatch(refreshToken());
    try {
      console.log("ini adalah id nya " + id);
      if (!id) {
        console.log("id candidate" + id);
        await dispatch(
          updateCandidate({
            Bestie: oldCandidate?.Bestie,
            BloodType: oldCandidate?.BloodType,
            CandidatePosition: oldCandidate?.CandidatePosition,
            CandidateStatus: oldCandidate?.CandidateStatus,
            CandidteName: oldCandidate?.CandidteName,
            DateOfBirth: oldCandidate?.DateOfBirth,
            DomicileAddress: oldCandidate?.DomicileAddress,
            Gender: oldCandidate?.Gender,
            KtpAddress: oldCandidate?.KtpAddress,
            Nik: oldCandidate?.Nik,
            PhoneNumber: oldCandidate?.PhoneNumber,
            PlaceOfBirth: oldCandidate?.PlaceOfBirth,
            Religion: oldCandidate?.Religion,
            image,
            accessToken,
          })
        );
      } else {
        await dispatch(
          updateCandidateAdmin({
            Bestie: oldCandidate?.Bestie,
            BloodType: oldCandidate?.BloodType,
            CandidatePosition: oldCandidate?.CandidatePosition,
            CandidateStatus: oldCandidate?.CandidateStatus,
            CandidteName: oldCandidate?.CandidteName,
            DateOfBirth: oldCandidate?.DateOfBirth,
            DomicileAddress: oldCandidate?.DomicileAddress,
            Gender: oldCandidate?.Gender,
            KtpAddress: oldCandidate?.KtpAddress,
            Nik: oldCandidate?.Nik,
            PhoneNumber: oldCandidate?.PhoneNumber,
            PlaceOfBirth: oldCandidate?.PlaceOfBirth,
            Religion: oldCandidate?.Religion,
            image,
            accessToken,
            id,
          })
        );
      }
      setEditCandidate(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="card w-100 ">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <div className="p-2">
              <h5>Data Pribadi Pelamar</h5>
            </div>
            <div className="p-2"></div>
          </div>
        </div>
        <div className="card-body">
          <div className="row mt-4">
            <div className="col-3">
              {!preview ? null : (
                <figure className="image">
                  <img
                    src={preview}
                    style={{ width: "150px" }}
                    alt="Preview Image"
                  />
                </figure>
              )}
              <input
                type="file"
                className="form-control p-1"
                value={oldCandidate?.image}
                onChange={handleFileChange}
              />
            </div>
            <div className="col">
              <form>
                <table className="table table-borderless table-sm">
                  <tbody>
                    <tr>
                      <th scope="row">Posisi Yang Dilamar</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Posisi Yang dilamar"
                          value={oldCandidate.CandidatePosition}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              CandidatePosition: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Nama</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Nama Pelamar"
                          value={oldCandidate.CandidteName}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              CandidteName: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">No. KTP</th>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          placeholder="No KTP"
                          value={oldCandidate.Nik}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              Nik: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tempat, Tanggal Lahir</th>
                      <td>
                        <div className="row">
                          <div className="col-8">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Tempat Lahir"
                              value={oldCandidate.PlaceOfBirth}
                              onChange={(e) =>
                                setOldCandidate({
                                  ...oldCandidate,
                                  PlaceOfBirth: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col">
                            <input
                              type="date"
                              className="form-control form-control-sm"
                              placeholder="Tanggal Lahir"
                              value={moment(oldCandidate.DateOfBirth).format(
                                "YYYY-MM-DD"
                              )}
                              onChange={(e) =>
                                setOldCandidate({
                                  ...oldCandidate,
                                  DateOfBirth: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Agama</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Agama"
                          value={oldCandidate.Religion}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              Religion: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Jenis Kelamin</th>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          value={oldCandidate.Gender}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              Gender: e.target.value,
                            })
                          }
                        >
                          <option>Jenis Kelamin</option>
                          <option value="Laki-Laki">Laki-Laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Golongan Darah</th>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          aria-label="Small select example"
                          value={oldCandidate.BloodType}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              BloodType: e.target.value,
                            })
                          }
                        >
                          <option>Golongan Darah</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Status</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Status Pelamar"
                          value={oldCandidate.CandidateStatus}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              CandidateStatus: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Alamat KTP</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Alamat KTP"
                          value={oldCandidate.KtpAddress}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              KtpAddress: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Alamat Tinggal</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Alamat Tinggal"
                          value={oldCandidate.DomicileAddress}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              DomicileAddress: e.target.value,
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
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Email"
                          disabled
                          value={decode?.email}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">No Telp</th>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="No Tlp"
                          value={oldCandidate.PhoneNumber}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              PhoneNumber: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Orang Terdekat</th>
                      <td>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Orang Terdekat"
                          value={oldCandidate.Bestie}
                          onChange={(e) =>
                            setOldCandidate({
                              ...oldCandidate,
                              Bestie: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex flex-row-reverse">
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      style={{ width: "100px" }}
                      onClick={() => setEditCandidate(false)}
                    >
                      Batal
                    </button>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      style={{ width: "100px" }}
                      onClick={hendleUpdateCandidate}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCandidate;
