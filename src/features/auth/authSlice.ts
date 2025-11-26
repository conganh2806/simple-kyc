import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfile,
} from "../../models/auth";
import { authApi } from "../../services/authServices";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const storedToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      console.log("loginUser thunk");
      const response = await authApi.login(data);

      console.log(response);

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      const profileResponse = await authApi.getProfile();
      localStorage.setItem("user", JSON.stringify(profileResponse.data));

      return {
        token: response.data.access_token,
        user: profileResponse.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      await authApi.register(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isSuccess = false;
      localStorage.clear();
    },
    resetAuthStatus: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
    updateProfile: (state, action: PayloadAction<any>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, resetAuthStatus, updateProfile } = authSlice.actions;
export default authSlice.reducer;
