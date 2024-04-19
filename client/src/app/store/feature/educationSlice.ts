import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  education: any;
  isError: boolean;
  isSuccess: boolean;
  message: any;
};

const initialState: InitialState = {
  education: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};
export const getOneEducation = createAsyncThunk(
  "candidate/getProfile",
  async ({ accessToken, thunkAPI, id }: any) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/getOneEducation/${id}`,
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
export const createEducations = createAsyncThunk(
  "education/createEducation",
  async ({
    GradeTitle,
    SchoolName,
    Major,
    GraduateYear,
    GPA,

    accessToken,
  }: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/createEducation",
        { GradeTitle, SchoolName, Major, GraduateYear, GPA }, // Mengirimkan FormData sebagai payload
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Atur Content-Type menjadi multipart/form-data untuk FormData
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
export const updateEducations = createAsyncThunk(
  "education/updateEducation",
  async ({
    GradeTitle,
    SchoolName,
    Major,
    GraduateYear,
    GPA,
    accessToken,
    id,
  }: any) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/updateEducation/${id}`,
        { GradeTitle, SchoolName, Major, GraduateYear, GPA }, // Mengirimkan FormData sebagai payload
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Atur Content-Type menjadi multipart/form-data untuk FormData
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
export const deleteEducation = createAsyncThunk(
  "education/deleteEducation",
  async ({ id, accessToken }: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteEducation/${id}`,
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
const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEducations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEducations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createEducations.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateEducations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEducations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateEducations.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteEducation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default educationSlice.reducer;
