import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import moment from "moment";
import { refreshToken } from "../../app/store/feature/userSlice";
import { createTrannings } from "../../app/store/feature/tranningSlice";

const CreateTranningPage = ({ setCreateTranning }: any) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const [createTranning, setCreateTrannings] = useState<any>({
    TranningName: "",
    Sertification: false,
    TranningYear: null,
    candidateId: null,
  });
  const hendelCreateTranning = async () => {
    try {
      await dispatch(
        createTrannings({
          TranningName: createTranning?.TranningName,
          Sertification: createTranning?.Sertification,
          TranningYear: createTranning?.TranningYear,
          candidateId: createTranning?.candidateId,
          accessToken,
        })
      );
      dispatch(refreshToken());
      setCreateTranning(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card w-100  mt-3 mb-4">
      <div className="card-header ">
        <div className="d-flex justify-content-between ">
          <div className="p-2">
            <h5>Riwayat Pelatihan</h5>
          </div>
          <div className="p-2">Tambah</div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <table className="table table-borderless table-sm">
            <tbody>
              <tr>
                <th scope="row">Nama Sertifikat/Seminar</th>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nama Sertifikat/Seminar"
                    value={createTranning.TranningName}
                    onChange={(e) =>
                      setCreateTrannings({
                        ...createTranning,
                        TranningName: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Sertifikat (ada/tidak)</th>
                <td>
                  <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    value={createTranning.Sertification}
                    onChange={(e) =>
                      setCreateTrannings({
                        ...createTranning,
                        Sertification: e.target.value,
                      })
                    }
                  >
                    <option value={false}>Tidak Ada</option>
                    <option value={true}>Ada</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Tahun</th>
                <td>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    placeholder="Tahun "
                    value={moment(createTranning.TranningYear).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) =>
                      setCreateTrannings({
                        ...createTranning,
                        TranningYear: e.target.value,
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
                onClick={() => setCreateTranning(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendelCreateTranning}
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

export default CreateTranningPage;
