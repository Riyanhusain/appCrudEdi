import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  isLoading: boolean;
  admin: any;
  isError: boolean;
  isSuccess: boolean;
  message: any;
};

const initialState: InitialState = {
  admin: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
};
export const getAllAdmin = createAsyncThunk(
  "candidate/getAllAdmin",
  async (accessToken, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3002/getAllAdmin", {
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
export const createAdmins = createAsyncThunk(
  "admin/createAdmin",
  async ({
    Password,
    UserEmail,
    Role,
    AdminName,
    ConfirmPassword,
    accessToken,
    thunkAPI,
  }: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/createAdmin",
        { Password, UserEmail, Role, AdminName, ConfirmPassword }, // Mengirimkan FormData sebagai payload
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
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(getAllAdmin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createAdmins.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;
