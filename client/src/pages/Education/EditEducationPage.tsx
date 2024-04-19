import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { jwtDecode } from "jwt-decode";
import {
  getOneEducation,
  updateEducations,
} from "../../app/store/feature/educationSlice";
import moment from "moment";
import { refreshToken } from "../../app/store/feature/userSlice";
import { getProfile } from "../../app/store/feature/candidateSlice";

const EditEducationPage = ({ setEditEducation, id }: any) => {
  const educationData = useAppSelector((state) => state.candidate.candidate);
  const filterEducation = educationData?.education?.filter(
    (data: any) => data.id === id
  );
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.users.accessToken);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfile(accessToken));
    }
  }, [dispatch, accessToken]);

  const [oldEducation, setOldEducation] = useState<any>({
    GradeTitle: filterEducation[0]?.GradeTitle,
    SchoolName: filterEducation[0]?.SchoolName,
    Major: filterEducation[0]?.Major,
    GraduateYear: filterEducation[0]?.GraduateYear,
    GPA: filterEducation[0]?.GPA,
    candidateId: filterEducation[0]?.candidateId,
    accessToken,
  });
  const hendelUpdateEducation = async () => {
    try {
      await dispatch(
        updateEducations({
          GradeTitle: oldEducation?.GradeTitle,
          SchoolName: oldEducation?.SchoolName,
          Major: oldEducation?.Major,
          GraduateYear: oldEducation?.GraduateYear,
          GPA: oldEducation?.GPA,
          candidateId: oldEducation?.candidateId,
          id,
          accessToken,
        })
      );
      dispatch(refreshToken());
      setEditEducation(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card w-100  mt-3">
      {/* <h1>{filterEducation[0]?.Major}</h1> */}
      <div className="card-header ">
        <div className="d-flex justify-content-between ">
          <div className="p-2">
            <h5>Pendidikan Terakhir</h5>
          </div>
          <div className="p-2">Edit</div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <table className="table table-borderless table-sm">
            <tbody>
              <tr>
                <th scope="row">Pendidikan Terakhir</th>
                <td>
                  <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    value={oldEducation.GradeTitle}
                    onChange={(e) =>
                      setOldEducation({
                        ...oldEducation,
                        GradeTitle: e.target.value,
                      })
                    }
                  >
                    <option>{oldEducation.GradeTitle}</option>
                    <option value="S2">S2</option>
                    <option value="S1/D4">S1/D4</option>
                    <option value="D3">D3</option>
                    <option value="SMA">SMA</option>
                    <option value="SMP">SMP</option>
                    <option value="SD">SD</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Nama Institusi</th>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama Institusi"
                    value={oldEducation.SchoolName}
                    onChange={(e) =>
                      setOldEducation({
                        ...oldEducation,
                        SchoolName: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Jurusan</th>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Jurusan"
                    value={oldEducation.Major}
                    onChange={(e) =>
                      setOldEducation({
                        ...oldEducation,
                        Major: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Tahun Lulus</th>
                <td>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Tahun Lulus"
                    value={moment(oldEducation.GraduateYear).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) =>
                      setOldEducation({
                        ...oldEducation,
                        GraduateYear: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">IPK</th>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="IPK"
                    value={oldEducation.GPA}
                    onChange={(e) =>
                      setOldEducation({
                        ...oldEducation,
                        GPA: e.target.value,
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
                onClick={() => setEditEducation(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendelUpdateEducation}
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEducationPage;
