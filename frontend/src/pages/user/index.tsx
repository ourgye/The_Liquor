import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useSearch";
import { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function MainSearch() {
  const navigate = useNavigate();
  const { resetAll, setSearchTerm, searchTerm } = useSearch();

  // mainsearch로 돌아오면 검색값 무조건 리셋
  useEffect(() => {
    resetAll();
  }, []);

  const handleSearch = () => {
    navigate({
      pathname: "search",
      search: `${createSearchParams({ term: searchTerm }).toString()}`,
    });
  };

  return (
    <>
      <div
        id="main-logo"
        className="flex flex-col min-h-60 mb-12 max-h-96 flex-shrink-0 items-center justify-end"
      >
        <h1 className="text-3xl font-bold">Search Logo_The Liquor</h1>
      </div>
      <div
        id="search-box"
        className="mx-auto min-w-md max-w-xl self-center flex flex-row bg-white justify-center items-center border-b-2 border-transparent focus-within:border-[var(--accent)] px-2"
      >
        <Input
          type="search"
          className="text-sm h-9 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none "
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onAbort={() => setSearchTerm("")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <AiOutlineSearch
          className="size-6 p-1 cursor-pointer fill-[var(--accent)]"
          onClick={handleSearch}
        />
      </div>
    </>
  );
}
