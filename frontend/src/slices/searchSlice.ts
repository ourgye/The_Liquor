import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiqourSearchItemResponse, SearchLiqourParams } from "@/types";
import { searchLiquor } from "@/services/liquor";
import { RootState } from "@/store";

interface SearchState {
  params: SearchLiqourParams;
  loading: boolean;
  result: LiqourSearchItemResponse | undefined;
}

const initialState: SearchState = {
  params: {
    term: "",
    page: 1,
    avail: true,
  },
  loading: false,
  result: undefined,
};

const fetchSearchResult = createAsyncThunk(
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
    setParamAlcRange: (state, action: PayloadAction<number[]>) => {
      if (action.payload.length !== 2) return;
      state.params.alcMin = action.payload[0];
      state.params.alcMax = action.payload[1];
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
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearchResult.fulfilled,
        (state, action: PayloadAction<LiqourSearchItemResponse>) => {
          state.loading = false;
          state.result = action.payload;
        }
      )
      .addCase(fetchSearchResult.rejected, (state) => {
        state.loading = false;
      });
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
    searchResultDataSelector: (state) => state.result?.liquor_list || [],
    searchResultPageSelector: (state) => state.result?.page || undefined,
  },
});

export const searchAsyncAction = { fetchSearchResult };
export const searchSelector = searchSlice.getSelectors(
  (state: RootState) => state.search
);
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
