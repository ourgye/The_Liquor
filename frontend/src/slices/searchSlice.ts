import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { LiqourSearchItemResponse, SearchLiqourParams } from "@/types";
import { searchLiquor } from "@/services/liquor";

interface SearchState {
  params: SearchLiqourParams;
  loading: boolean;
  result: LiqourSearchItemResponse;
}

const initialState: SearchState = {
  params: {
    term: "",
    page: 1,
    avail: true,
  },
  loading: false,
  result: [],
};

const searchAsyncAction = createAsyncThunk(
  "search/fetchliquor",
  async (params: SearchLiqourParams) => {
    const response = await searchLiquor(params);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "searchTerm",
  initialState: initialState,
  reducers: {
    setParamTerm: (state, action: PayloadAction<string>) => {
      state.params.term = action.payload;
    },
    setParamPage: (state, action: PayloadAction<number>) => {
      state.params.page = action.payload;
    },
    setParamMinAlc: (state, action: PayloadAction<number>) => {
      state.params.alcMin = action.payload;
    },
    setParamMaxAlc: (state, action: PayloadAction<number>) => {
      state.params.alcMax = action.payload;
    },
    setBrandChange: (state, action: PayloadAction<string>) => {
      state.params.brand = action.payload;
    },
    setClassChange: (state, action: PayloadAction<string>) => {
      state.params.class = action.payload;
    },
    setAvailChange: (state, action: PayloadAction<boolean>) => {
      state.params.avail = action.payload;
    },
    resetAll: (state) => {
      state = initialState;
    },
  },
  selectors: {
    paramsSelector: (state) => state.params,
    termSelector: (state) => state.params.term,
    pageSelector: (state) => state.params.page,
    minAlcSelector: (state) => state.params.alcMin,
    maxAlcSelector: (state) => state.params.alcMax,
    brandSelector: (state) => state.params.brand,
    classSelector: (state) => state.params.class,
    availSelector: (state) => state.params.avail,
  },
});

export const searchSelector = searchSlice.selectors;
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
