import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  tranning: any;
  isError: boolean;
  isSuccess: boolean;
  message: any;
};

const initialState: InitialState = {
  tranning: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};
export const createTrannings = createAsyncThunk(
  "tranning/createTranning",
  async ({
    TranningName,
    Sertification,
    TranningYear,
    candidateId,
    accessToken,
  }: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/createTranning",
        { TranningName, Sertification, TranningYear, candidateId },
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
export const updateTranning = createAsyncThunk(
  "tranning/updateTranning",
  async ({
    TranningName,
    Sertification,
    TranningYear,
    candidateId,
    accessToken,
    id,
  }: any) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/updateTranning/${id}`,
        { TranningName, Sertification, TranningYear, candidateId },
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
export const deleteTranning = createAsyncThunk(
  "tranning/deleteTranning",
  async ({ id, accessToken }: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/deleteTranning/${id}`,
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
const tranningSlice = createSlice({
  name: "tranning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrannings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrannings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createTrannings.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateTranning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTranning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateTranning.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteTranning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTranning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteTranning.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default tranningSlice.reducer;
