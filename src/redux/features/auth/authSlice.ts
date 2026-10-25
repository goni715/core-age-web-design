import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    ForgotError: string,
    VerifyOtpError: string,
    ResetPasswordError: string,
    LoginError: string,
    RegisterError: string,
    VerifyAccountError: string,
    ChangePasswordError: string,
    ProfileError: string
}

const initialState: TInitialState = {
    ForgotError: "",
    VerifyOtpError: "",
    ResetPasswordError: "",
    LoginError: "",
    RegisterError: "",
    VerifyAccountError: "",
    ChangePasswordError: "",
    ProfileError: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetForgotError: (state, action: PayloadAction<string>) => {
            state.ForgotError = action.payload;
        },
        SetVerifyOtpError: (state, action: PayloadAction<string>) => {
            state.VerifyOtpError = action.payload;
        },
        SetResetPasswordError: (state, action: PayloadAction<string>) => {
            state.ResetPasswordError = action.payload;
        },
        SetLoginError: (state, action: PayloadAction<string>) => {
            state.LoginError = action.payload;
        },
        SetRegisterError: (state, action: PayloadAction<string>) => {
            state.RegisterError = action.payload;
        },
        SetVerifyAccountError: (state, action: PayloadAction<string>) => {
            state.VerifyAccountError = action.payload;
        },
        SetChangePasswordError: (state, action: PayloadAction<string>) => {
            state.ChangePasswordError = action.payload;
        },
        SetProfileError: (state, action: PayloadAction<string>) => {
            state.ProfileError = action.payload;
        }
    }
})

export const {
    SetForgotError,
    SetVerifyOtpError,
    SetResetPasswordError,
    SetLoginError,
    SetRegisterError,
    SetVerifyAccountError,
    SetChangePasswordError,
    SetProfileError
} = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;