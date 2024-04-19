import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface UsersState {
  accessToken: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any;
  isLogout: boolean;
  change: boolean;
}
const initialState: UsersState = {
  accessToken: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  isLogout: false,
  change: false,
};
axios.defaults.withCredentials = true;
export const authLogin = createAsyncThunk(
  "users/authLogin",
  async ({ UserEmail, Password }: any, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3002/loginUsers", {
        UserEmail,
        Password,
      });
      return response.data.accessToken;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ PasswordLama, Password, ConfirmPassword }: any, thunkAPI) => {
    try {
      const response = await axios.put("http://localhost:3002/changePassword", {
        PasswordLama,
        Password,
        ConfirmPassword,
      });
      const message = response.data.msg;
      return thunkAPI.fulfillWithValue(message);
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
export const refreshToken = createAsyncThunk(
  "users/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3002/refreshToken");

      return response.data.accessToken;
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.delete("http://localhost:3002/logoutUsers");
    return response.data.message;
  } catch (error: any) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
export const registercandidate = createAsyncThunk(
  "users/registerCandidate",
  async ({ UserEmail, Password, ConfirmPassword, Role }: any, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3002/registerUser", {
        UserEmail,
        Password,
        ConfirmPassword,
        Role,
      });
      return response.data.message;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    reset: (state) => (state = initialState),
    resetMessage: (state) => {
      state.message = null;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    resetAccessToken(state) {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.accessToken = action.payload;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(registercandidate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registercandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(registercandidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogout = true;
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message || "error";
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.change = true;
        // state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        // state.message = action.error.message || "error";
      });
  },
});
export default userSlice.reducer;

export const { reset, resetMessage, setAccessToken, resetAccessToken } =
  userSlice.actions;
