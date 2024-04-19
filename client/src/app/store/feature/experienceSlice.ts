import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  experience: any;
  isError: boolean;
  isSuccess: boolean;
  message: any;
};

const initialState: InitialState = {
  experience: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};
export const createExperience = createAsyncThunk(
  "experience/createExperience",
  async ({
    CompanyName,
    LastPosition,
    Salary,
    Year,
    candidateId,
    accessToken,
  }: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/createExperience",
        { CompanyName, LastPosition, Salary, Year, candidateId },
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
export const updateExperience = createAsyncThunk(
  "experience/updateExperience",
  async ({
    CompanyName,
    LastPosition,
    Salary,
    Year,
    candidateId,
    accessToken,
    id,
  }: any) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/updateExperience/${id}`,
        { CompanyName, LastPosition, Salary, Year, candidateId },
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
export const deleteExperience = createAsyncThunk(
  "experience/deleteExperience",
  async ({ id, accessToken }: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteExperience/${id}`,
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
const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default experienceSlice.reducer;
