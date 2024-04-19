import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import moment from "moment";
import { createEducations } from "../../app/store/feature/educationSlice";

const CreateEducationPage = ({ setEducation }: any) => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.users.accessToken);
  const [createEducation, setCreateEducation] = useState<any>({
    GradeTitle: "",
    SchoolName: "",
    Major: "",
    GraduateYear: null,
    GPA: null,
    candidateId: null,
    accessToken: null,
  });

  const hendleCreateEducation = async () => {
    try {
      await dispatch(
        createEducations({
          GradeTitle: createEducation?.GradeTitle,
          SchoolName: createEducation?.SchoolName,
          Major: createEducation?.Major,
          GraduateYear: createEducation?.GraduateYear,
          GPA: createEducation?.GPA,
          accessToken,
        })
      );
      dispatch(refreshToken());
      setEducation(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card w-100  mt-3">
      <div className="card-header ">
        <div className="d-flex justify-content-between ">
          <div className="p-2">
            <h5>Pendidikan Terakhir</h5>
          </div>
          <div className="p-2">Tambah</div>
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
                    value={createEducation.GradeTitle}
                    onChange={(e) =>
                      setCreateEducation({
                        ...createEducation,
                        GradeTitle: e.target.value,
                      })
                    }
                  >
                    <option>Pendidikan Terakhir</option>
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
                    value={createEducation.SchoolName}
                    onChange={(e) =>
                      setCreateEducation({
                        ...createEducation,
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
                    value={createEducation.Major}
                    onChange={(e) =>
                      setCreateEducation({
                        ...createEducation,
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
                    value={moment(createEducation.GraduateYear).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) =>
                      setCreateEducation({
                        ...createEducation,
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
                    value={createEducation.GPA}
                    onChange={(e) =>
                      setCreateEducation({
                        ...createEducation,
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
                onClick={() => setEducation(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendleCreateEducation}
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

export default CreateEducationPage;
