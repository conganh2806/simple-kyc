import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ExtendedUserProfile,
  UserPlatziUpdatePayload,
} from "../models/user";
import { userApi } from "../services/userServices";

interface UpdateUserParams {
  userId: number;
  platziPayload: UserPlatziUpdatePayload;
  extendedPayload: Partial<ExtendedUserProfile>;
}

interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { userId, platziPayload, extendedPayload }: UpdateUserParams,
    { rejectWithValue },
  ) => {
    try {
      const response = await userApi.updateProfile(userId, platziPayload);

      const mergedUser = {
        ...extendedPayload,
        ...response.data,
      };

      const currentUserStr = localStorage.getItem("user");
      const currentUser = currentUserStr ? JSON.parse(currentUserStr) : "";

      const finalUser = { ...currentUser, ...mergedUser };
      localStorage.setItem("user", JSON.stringify(finalUser));

      return finalUser;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update user failed",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserStatus } = userSlice.actions;
export default userSlice.reducer;
