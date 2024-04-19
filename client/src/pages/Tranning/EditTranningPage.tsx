import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { refreshToken } from "../../app/store/feature/userSlice";
import { getProfile } from "../../app/store/feature/candidateSlice";
import moment from "moment";
import { updateTranning } from "../../app/store/feature/tranningSlice";

const EditTranningPage = ({ setEditTranning, id }: any) => {
  const experienceData = useAppSelector((state) => state.candidate.candidate);
  const filterTranning = experienceData?.trannings?.filter(
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
  const [oldTranning, setoldTranning] = useState<any>({
    TranningName: filterTranning[0]?.TranningName,
    Sertification: filterTranning[0]?.Sertification,
    TranningYear: filterTranning[0]?.TranningYear,
    candidateId: filterTranning[0]?.candidateId,
    accessToken,
  });

  const hendleUpdateTranning = async () => {
    try {
      await dispatch(
        updateTranning({
          TranningName: oldTranning?.TranningName,
          Sertification: oldTranning?.Sertification,
          TranningYear: oldTranning?.TranningYear,
          candidateId: oldTranning?.candidateId,
          accessToken,
          id,
        })
      );
      dispatch(refreshToken());
      setEditTranning(false);
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
                    value={oldTranning.TranningName}
                    onChange={(e) =>
                      setoldTranning({
                        ...oldTranning,
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
                    value={oldTranning.Sertification}
                    onChange={(e) =>
                      setoldTranning({
                        ...oldTranning,
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
                    value={moment(oldTranning.TranningYear).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={(e) =>
                      setoldTranning({
                        ...oldTranning,
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
                onClick={() => setEditTranning(false)}
              >
                Batal
              </button>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                style={{ width: "100px" }}
                onClick={hendleUpdateTranning}
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

export default EditTranningPage;
