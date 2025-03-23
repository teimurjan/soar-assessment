import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { EditProfileFormValues } from "@/components/settings/edit-profile-form/form-schema";

export interface User {
  name: string;
  username: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data;
});

// Mock API call
const updateUserProfile = async (
  values: EditProfileFormValues
): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call
  return {
    name: values.name,
    username: values.username,
    email: values.email,
    avatar: values.avatar ? URL.createObjectURL(values.avatar) : "",
    dateOfBirth: values.dateOfBirth,
    presentAddress: values.presentAddress,
  permanentAddress: values.permanentAddress,
    city: values.city,
    postalCode: values.postalCode,
    country: values.country,
  };
};

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (values: EditProfileFormValues) => {
    const response = await updateUserProfile(values);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        const changedFields = Object.entries(action.payload).reduce(
          (acc, [key, value]) => {
            if (value) {
              acc[key as keyof User] = value;
            }
            return acc;
          },
          {} as User
        );

        state.user = { ...state.user, ...changedFields };
      });
  },
});

export default userSlice.reducer;
