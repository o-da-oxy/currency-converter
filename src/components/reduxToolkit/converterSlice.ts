import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActionType = {
  inputValue: number;
  fromCode: string;
  fromValue: number;
  toCode: string;
  toValue: number;
};

type ConverterStateItem = {
  fromCode: string;
  fromValue: number;
  toCode: string;
  toValue: number;
  inputValue: number;
  resultValue: number;
  date: string;
};

type ConverterState = {
  list: ConverterStateItem[];
};

const convertInitialState: ConverterState = {
  list: [],
};

const converterSlice = createSlice({
  name: 'converter',
  initialState: convertInitialState,
  reducers: {
    convert(state, action: PayloadAction<ActionType>) {
      state.list.push({
        fromCode: action.payload.fromCode,
        fromValue: action.payload.fromValue,
        toCode: action.payload.toCode,
        toValue: action.payload.toValue,
        inputValue: action.payload.inputValue,
        resultValue:
          (action.payload.fromValue / action.payload.toValue) *
          action.payload.inputValue,
        date: new Date().toLocaleString(),
      });
    },
  },
});

export const { convert } = converterSlice.actions;

export default converterSlice.reducer;
