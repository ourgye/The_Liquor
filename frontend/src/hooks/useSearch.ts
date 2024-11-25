import {
  searchAsyncAction,
  searchSelector,
  searchAction,
} from "@/slices/searchSlice";
import { useAppDispatch, useAppSelector } from ".";
import { useCallback } from "react";
import { SearchLiqourParams } from "@/types";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchParams = useAppSelector(searchSelector.paramsSelector);

  const [
    searchTerm,
    searchClass,
    searchPage,
    searchAvail,
    searchAlcMax,
    searchAlcMin,
    searchBrand,
  ] = [
    useAppSelector(searchSelector.termSelector),
    useAppSelector(searchSelector.classSelector),
    useAppSelector(searchSelector.pageSelector),
    useAppSelector(searchSelector.availSelector),
    useAppSelector(searchSelector.maxAlcSelector),
    useAppSelector(searchSelector.minAlcSelector),
    useAppSelector(searchSelector.brandSelector),
  ];

  const [searchResultData, searchResultPage] = [
    useAppSelector(searchSelector.searchResultDataSelector),
    useAppSelector(searchSelector.searchResultPageSelector),
  ];

  const setSearchTerm = useCallback(
    (term: string) => {
      dispatch(searchAction.setParamTerm(term));
    },
    [dispatch]
  );

  const setSearchPage = useCallback(
    (page: number) => {
      dispatch(searchAction.setParamPage(page));
    },
    [dispatch]
  );

  const setSearchAvail = useCallback(
    (avail: boolean) => {
      dispatch(searchAction.setAvailChange(avail));
    },
    [dispatch]
  );

  const setSearchAlcRange = useCallback(
    (alcMin: number, alcMax: number) => {
      dispatch(searchAction.setParamAlcRange([alcMin, alcMax]));
    },
    [dispatch]
  );

  const setSearchClass = useCallback(
    (classifications: string) => {
      dispatch(searchAction.setClassChange(classifications));
    },
    [dispatch]
  );

  const setSearchBrand = useCallback(
    (brand: string) => {
      dispatch(searchAction.setBrandChange(brand));
    },
    [dispatch]
  );

  const resetAll = useCallback(() => {
    dispatch(searchAction.resetAll());
  }, [dispatch]);

  const fetchSearchResult = useCallback(async (params: SearchLiqourParams) => {
    try {
      dispatch(searchAsyncAction.fetchSearchResult(params));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    // variables
    searchParams,
    searchTerm,
    searchClass,
    searchPage,
    searchAvail,
    searchAlcMax,
    searchAlcMin,
    searchBrand,
    searchResultData,
    searchResultPage,

    // actions
    setSearchTerm,
    setSearchAvail,
    setSearchAlcRange,
    setSearchBrand,
    setSearchClass,
    setSearchPage,
    resetAll,
    fetchSearchResult,
  };
};

export { useSearch };
