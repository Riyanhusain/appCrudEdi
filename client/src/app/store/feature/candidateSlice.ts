import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export type Candidates = {
  CandidatePosition: string;
  CandidteName: string;
  Nik: bigint;
  PlaceOfBirth: string;
  DateOfBirth: Date;
  Gender: string;
  Religion: string;
  BloodType: string;
  CandidateStatus: string;
  KtpAddress: string;
  DomicileAddress: string;
  PhoneNumber: number;
  Bestie: string;
};
interface UsersState {
  candidate: Candidates[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
  isLogout: boolean;
  change: boolean;
}
const initialState: UsersState = {
  candidate: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  isLogout: false,
  change: false,
};
axios.defaults.withCredentials = true;
export const getProfile = createAsyncThunk(
  "candidate/getProfile",
  async (accessToken, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3002/getProfile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
export const getOneCandidate = createAsyncThunk(
  "candidate/getOneCandidate",
  async ({ accessToken, id, thunkAPI }: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/getOneCandidate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
export const getAllCandidate = createAsyncThunk(
  "candidate/getAllCandidate",
  async (accessToken, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3002/getAllCandidate",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteCandidate = createAsyncThunk(
  "education/deleteCandidate",
  async ({ id, accessToken }: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteCandidate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Atur Content-Type menjadi multipart/form-data untuk FormData
          },
        }
      );
      return response.data.message;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message;
        return message;
      }
      throw error;
    }
  }
);
export const updateCandidate = createAsyncThunk(
  "candidate/updateCandidate",
  async ({
    Bestie,
    BloodType,
    CandidatePosition,
    CandidateStatus,
    CandidteName,
    DateOfBirth,
    DomicileAddress,
    Gender,
    KtpAddress,
    Nik,
    PhoneNumber,
    PlaceOfBirth,
    Religion,
    image,
    accessToken,
  }: Candidates & { image: File }) => {
    try {
      const formData = new FormData(); // Membuat objek FormData
      formData.append("Bestie", Bestie);
      formData.append("BloodType", BloodType);
      formData.append("CandidatePosition", CandidatePosition);
      formData.append("CandidateStatus", CandidateStatus);
      formData.append("CandidteName", CandidteName);
      formData.append("DateOfBirth", DateOfBirth);
      formData.append("DomicileAddress", DomicileAddress);
      formData.append("Gender", Gender);
      formData.append("KtpAddress", KtpAddress);
      formData.append("Nik", Nik);
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("PlaceOfBirth", PlaceOfBirth);
      formData.append("Religion", Religion);
      formData.append("image", image); // Menambahkan data gambar ke FormData

      const response = await axios.put(
        "http://localhost:3002/updateCandidate",
        formData, // Mengirimkan FormData sebagai payload
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Atur Content-Type menjadi multipart/form-data untuk FormData
          },
        }
      );

      return response.data.message;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message;
        return message;
      }
      throw error;
    }
  }
);
export const updateCandidateAdmin = createAsyncThunk(
  "candidate/updateCandidateAdmin",
  async ({
    Bestie,
    BloodType,
    CandidatePosition,
    CandidateStatus,
    CandidteName,
    DateOfBirth,
    DomicileAddress,
    Gender,
    KtpAddress,
    Nik,
    PhoneNumber,
    PlaceOfBirth,
    Religion,
    image,
    accessToken,
    id,
  }: Candidates & { image: File }) => {
    try {
      const formData = new FormData(); // Membuat objek FormData
      formData.append("Bestie", Bestie);
      formData.append("BloodType", BloodType);
      formData.append("CandidatePosition", CandidatePosition);
      formData.append("CandidateStatus", CandidateStatus);
      formData.append("CandidteName", CandidteName);
      formData.append("DateOfBirth", DateOfBirth);
      formData.append("DomicileAddress", DomicileAddress);
      formData.append("Gender", Gender);
      formData.append("KtpAddress", KtpAddress);
      formData.append("Nik", Nik);
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("PlaceOfBirth", PlaceOfBirth);
      formData.append("Religion", Religion);
      formData.append("image", image); // Menambahkan data gambar ke FormData

      const response = await axios.put(
        `http://localhost:3002/updateCandidateAdmin/${id}`,
        formData, // Mengirimkan FormData sebagai payload
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Atur Content-Type menjadi multipart/form-data untuk FormData
          },
        }
      );

      return response.data.message;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message;
        return message;
      }
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.candidate = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getOneCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.candidate = action.payload;
      })
      .addCase(getOneCandidate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getAllCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.candidate = action.payload;
      })
      .addCase(getAllCandidate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateCandidate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateCandidateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCandidateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateCandidateAdmin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteCandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});
export default userSlice.reducer;
export const { reset, resetMessage } = userSlice.actions;
