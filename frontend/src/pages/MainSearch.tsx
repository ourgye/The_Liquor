import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks";
import { searchTermSelector, termChange } from "@/slices/searchSlice";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MainSearch() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useSelector(searchTermSelector);

  // mainsearch로 돌아오면 검색값 무조건 리셋
  useEffect(() => {
    dispatch(termChange(""));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[var(--maincolor)]">
      <div className="flex flex-col gap-16 h-4/5 justify-center items-center">
        <h1 className="text-3xl">Search Logo_The Liquor</h1>
        <div className="flex flex-row bg-white justify-center items-center w-8/12 border-b-2 border-transparent focus-within:border-[var(--accent)] px-2">
          <Input
            type="search"
            className="text-base h-12 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => dispatch(termChange(e.target.value))}
            onAbort={() => dispatch(termChange(""))}
          />
          <AiOutlineSearch
            className="size-8 p-1 cursor-pointer fill-[var(--accent)]"
            onClick={() => {
              navigate(`/search?term=${searchTerm}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
