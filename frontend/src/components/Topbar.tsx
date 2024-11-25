import { Link, useLocation, useSearchParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./ui/input";
import { useSearch } from "@/hooks/useSearch";
import React from "react";
import { topbarNavList } from "@/assets/constant";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { searchTerm, setSearchTerm, fetchSearchResult } = useSearch();

  const handleSearch = () => {
    searchParams.set("term", searchTerm);
    setSearchParams(searchParams);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row items-center px-2 border-b-[1px] border-[var(--accent)] bg-white w-1/2">
      <Input
        type="search"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onAbort={() => setSearchTerm("")}
        className="p-1 text-sm rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
        onKeyDown={handlePressEnter}
      />
      <button className="bg-transparent border-0" onClick={handleSearch}>
        <AiOutlineSearch className="fill-[var(--accent)]" size={16} />
      </button>
    </div>
  );
};

export default function Topbar() {
  const location = useLocation();

  // 만약 메인페이지라면 탑바 안보여주기
  if (location.pathname === "/") return;

  return (
    <div className="fixed flex gap-8 bg-white h-16 justify-between w-full items-center p-4 shadow-sm z-1 ">
      <div className="font-bold">LOGO</div>
      {!(
        location.pathname.match(/cardnews\\*/) ||
        location.pathname.includes("admin")
      ) && <SearchBar />}
      <div className="flex gap-4">
        {topbarNavList.map((item) => (
          <Link key={`${item.name}`} to={item.to}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
