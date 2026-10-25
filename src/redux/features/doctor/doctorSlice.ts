import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  CreateDoctorError: string;
  UpdateDoctorError: string;
  DeleteDoctorError: string;
};

const initialState: TInitialState = {
  CreateDoctorError: "",
  UpdateDoctorError: "",
  DeleteDoctorError: "",
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    SetCreateDoctorError: (state, action: PayloadAction<string>) => {
      state.CreateDoctorError = action.payload;
    },
    SetUpdateDoctorError: (state, action: PayloadAction<string>) => {
      state.UpdateDoctorError = action.payload;
    },
    SetDeleteDoctorError: (state, action: PayloadAction<string>) => {
      state.DeleteDoctorError = action.payload;
    },
  },
});

export const {
  SetCreateDoctorError,
  SetUpdateDoctorError,
  SetDeleteDoctorError,
} = doctorSlice.actions;

const doctorSliceReducer = doctorSlice.reducer;
export default doctorSliceReducer;
