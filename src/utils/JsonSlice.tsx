import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JsonDataState {
  data: Record<string, any>;
}

interface UpdateFieldPayload {
  field: string;
  value: any;
}

const initialState: JsonDataState = {
  data: {
    source: null,
    destination: null,
    pickupPoint: null,
    date: null,
    time:null,
    passengerno: null,
  },
};

const jsonSlice = createSlice({
  name: 'jsonData',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
  },
});

export const { updateField } = jsonSlice.actions;

export default jsonSlice.reducer;