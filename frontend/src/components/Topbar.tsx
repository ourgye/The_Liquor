import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "./ui/input";
import { termChange } from "@/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const SearchBar = () => {
    const searchTerm = useAppSelector((state) => state.search.term);
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState(searchTerm);

    const handleSearch = () => {
      dispatch(termChange(searchValue));
      // dispatch(term)
      navigate({
        pathname: "search",
        search: `?${createSearchParams({
          term: searchValue,
        }).toString()}`,
      });
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div className="flex flex-row items-center px-2 border-b-2 border-[var(--accent)] bg-white w-1/2">
        <Input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onAbort={() => setSearchValue("")}
          className="text-sm rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
          onKeyDown={handlePressEnter}
        />
        <button className="bg-transparent border-0" onClick={handleSearch}>
          <AiOutlineSearch className="fill-[var(--accent)]" size={16} />
        </button>
      </div>
    );
  };

  // 만약 메인페이지라면 탑바 안보여주기
  if (location.pathname === "/") return;

  return (
    <div className="fixed flex gap-8 bg-[var(--maincolor)] h-16 justify-between w-full items-center p-4 shadow-sm z-1 ">
      <div>Logo</div>
      {!location.pathname.match(/cardnews\\*/) && <SearchBar />}
      <div className="flex gap-4">
        <Link className="hover:text-[var(--accent)]" to="/">
          Home
        </Link>
        <Link className="hover:text-[var(--accent)]" to="/cardnews">
          Guide
        </Link>
        <Link className="hover:text-[var(--accent)]" to="/admin">
          Admin
        </Link>
      </div>
    </div>
  );
}
