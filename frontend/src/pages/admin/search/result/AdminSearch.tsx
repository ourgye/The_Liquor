import { useState } from "react";
import { Input } from "@/components/ui/input";
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

const searchTypeKR: Record<string, string> = {
  liquor: "술",
  producer: "생산자",
  brand: "브랜드",
  cardnews: "카드뉴스",
};

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
    <>
      <div className="flex flex-row border-neutral-950 border-b-2 justify-center items-center sm:px-1">
        <div className="size-6 flex items-center justify-center self-center">
          <AiOutlineSearch className="fill-black stroke-2 size-4" />
        </div>
        <Input
          type="search"
          className="border-0 rounded-none  
            focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`검색할 ${searchTypeKR[searchType]}을(를) 입력하세요`}
        />
      </div>
      <div className="flex flex-col bg-white mt-4 py-1 rounded-xl overflow-clip">
        {searchResult?.itemList.map((result) => (
          <>
            <div
              key={result.id}
              className="p-2 flex flex-row justify-between items-center px-4"
            >
              <span className="text-base">{result.title}</span>
              <AiOutlineEdit className="stroke-1 size-4 cursor-pointer hover:fill-black" />
            </div>
            {result.id !==
              searchResult.itemList[searchResult.itemList.length - 1].id && (
              <hr className="border-t-1 mx-2" />
            )}
          </>
        ))}
      </div>
    </>
  );
}
