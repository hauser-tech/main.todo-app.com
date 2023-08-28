import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  user: any;
};

const initialState = {
  value: {
    isAuth: false,
    user: {},
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      // return initialState;
      return {
        value: {
          isAuth: false,
          user: {},
        },
      };
    },
    logIn: (state, action: PayloadAction<any>) => {
      return {
        value: {
          isAuth: true,
          user: action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
