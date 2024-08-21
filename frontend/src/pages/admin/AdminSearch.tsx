import { useState } from "react";
import { Input } from "../../components/ui/input";
import { AiOutlineSearch, AiOutlineEdit } from "react-icons/ai";

export type AdminSearchProps = "liquor" | "producer" | "brand" | "cardnews";

interface SearchItem {
  id: number;
  title: string;
}
interface SearchResult {
  page: number;
  itemList: SearchItem[];
}

export default function AdminSearch({
  searchType,
}: {
  searchType: AdminSearchProps;
}) {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult>({
    page: 1,
    itemList: [
      { id: 1, title: "소주" },
      { id: 2, title: "맥주" },
      { id: 3, title: "와인" },
    ],
  });

  return (
    <div>
      <div className="flex flex-row border-neutral-950 border-b-2 justify-center items-center px-1">
        <div className="size-6 bg-red-50 flex items-center justify-center self-center">
          <AiOutlineSearch className="fill-black stroke-2 size-5" />
        </div>
        <Input
          type="search"
          className="border-0 rounded-none  
            focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`검색할 ${searchType}을(를) 입력하세요`}
        />
      </div>
      <div className="flex flex-col gap-[1px] bg-slate-500">
        {searchResult?.itemList.map((result) => (
          <div
            key={result.id}
            className="bg-white p-1 flex flex-row justify-between items-center"
          >
            <span className="text-base">{result.title}</span>
            <AiOutlineEdit className="fill-black stroke-1 size-4 bg-red-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
