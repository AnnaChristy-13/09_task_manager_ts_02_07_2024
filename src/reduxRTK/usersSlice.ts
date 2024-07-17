import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./storeRTK";

export interface IUser {
  id: number;
  name: string;
  company: { name: string };
  phone: string;
  email?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface IUsersState {
  users: IUser[];
  status: "loading" | "success" | "error";
  idSelectedUser: number ;
}

const initialState: IUsersState = {
  users: [],
  status: "loading",
  idSelectedUser: 1,
};

export const fetchUsers = createAsyncThunk<IUser[], void, { state: RootState }>(
  "users/fetchUsers",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    // console.log(data);
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((_, index) => index !== action.payload);
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      if (
        state.users[action.payload.id].name !== action.payload.name ||
        state.users[action.payload.id].company !== action.payload.company ||
        state.users[action.payload.id].phone !== action.payload.phone
      ) {
        state.users.map((e, index) =>
          index === action.payload.id ? action.payload : e
        );
      }
    },
    },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.users = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addUser, deleteUser, editUser, } = userSlice.actions;

export default userSlice.reducer;
