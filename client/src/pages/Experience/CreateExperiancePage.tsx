import moment from "moment";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { createExperience } from "../../app/store/feature/experienceSlice";

const CreateExperiancePage = ({ setCreateExperience }: any) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const [createExperiences, setCreateExperiences] = useState<any>({
    CompanyName: "",
    LastPosition: "",
    Salary: null,
    Year: null,
    candidateId: null,
  });
  const hendleCreateExperience = async () => {
    try {
      dispatch(refreshToken());
      await dispatch(
        createExperience({
          CompanyName: createExperiences?.CompanyName,
          LastPosition: createExperiences?.LastPosition,
          Salary: createExperiences?.Salary,
          Year: createExperiences?.Year,
          candidateId: null,
          accessToken,
        })
      );
      setCreateExperience(false);
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
          <div className="p-2">Tambah</div>
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
                    value={createExperiences.CompanyName}
                    onChange={(e) =>
                      setCreateExperiences({
                        ...createExperiences,
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
                    value={createExperiences.LastPosition}
                    onChange={(e) =>
                      setCreateExperiences({
                        ...createExperiences,
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
                    value={createExperiences.Salary}
                    onChange={(e) =>
                      setCreateExperiences({
                        ...createExperiences,
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
                    value={moment(createExperiences.Year).format("YYYY-MM-DD")}
                    onChange={(e) =>
                      setCreateExperiences({
                        ...createExperiences,
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
                onClick={() => setCreateExperience(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendleCreateExperience}
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

export default CreateExperiancePage;
