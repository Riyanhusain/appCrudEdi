import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { getProfile } from "../../app/store/feature/candidateSlice";
import moment from "moment";
import { updateExperience } from "../../app/store/feature/experienceSlice";

const EditExperiencePage = ({ setEditExperience, id }: any) => {
  const experienceData = useAppSelector((state) => state.candidate.candidate);
  const filterExperience = experienceData?.experiences?.filter(
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
  const [oldExperience, setOldExperience] = useState<any>({
    CompanyName: filterExperience[0]?.CompanyName,
    LastPosition: filterExperience[0]?.LastPosition,
    Salary: filterExperience[0]?.Salary,
    Year: filterExperience[0]?.Year,
    candidateId: filterExperience[0]?.candidateId,
    accessToken,
  });
  const hendleUpdateExperience = async () => {
    try {
      dispatch(refreshToken());
      await dispatch(
        updateExperience({
          CompanyName: oldExperience?.CompanyName,
          LastPosition: oldExperience?.LastPosition,
          Salary: oldExperience?.Salary,
          Year: oldExperience?.Year,
          candidateId: oldExperience?.candidateId,
          accessToken,
          id,
        })
      );
      setEditExperience(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card w-100  mt-3">
      <div className="card-header ">
        <div className="d-flex justify-content-between ">
          <div className="p-2">
            <h5>Riwayat Pekerjaan</h5>
          </div>
          <div className="p-2">Edit</div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <table className="table table-borderless table-sm">
            <tbody>
              <tr>
                <th scope="row">Nama Perusahaan</th>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama Perusahaan"
                    value={oldExperience.CompanyName}
                    onChange={(e) =>
                      setOldExperience({
                        ...oldExperience,
                        CompanyName: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Posisi Terakhir</th>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Posis Terakhir"
                    value={oldExperience.LastPosition}
                    onChange={(e) =>
                      setOldExperience({
                        ...oldExperience,
                        LastPosition: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Pendapatan Terakhir</th>
                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Pendapatan Terkhir"
                    value={oldExperience.Salary}
                    onChange={(e) =>
                      setOldExperience({
                        ...oldExperience,
                        Salary: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Tahun</th>
                <td>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Tahun "
                    value={moment(oldExperience.Year).format("YYYY-MM-DD")}
                    onChange={(e) =>
                      setOldExperience({
                        ...oldExperience,
                        Year: e.target.value,
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
                onClick={() => setEditExperience(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendleUpdateExperience}
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

export default EditExperiencePage;
