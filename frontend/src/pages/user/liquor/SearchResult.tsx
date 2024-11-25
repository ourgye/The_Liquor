import LiqourSearchItem from "@/components/LiquorSearchItem";
import SearchFilter from "@/components/SearchFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router-dom";
import { orderList } from "@/assets/constant";
import { useSearch } from "@/hooks/useSearch";

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    searchTerm,
    searchAvail,
    setSearchAvail,
    searchResultData,
    searchParams: searchParams_s,
  } = useSearch();

  const handleDomesticAvailChange = (checked: boolean) => {
    setSearchAvail(checked);
    searchParams.set("avail", checked ? "true" : "false");
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-24 px-10">
      <div className="flex flex-row w-full gap-4">
        {/* ========================= 분류 선택 ========================= */}
        <SearchFilter searchTerm={searchTerm} />
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full justify-between">
            {/* ========================= 국내 판매 여부 토글 ========================= */}
            <div className="flex flex-row gap-2 justify-center items-center">
              <Switch
                id="domestic"
                onCheckedChange={handleDomesticAvailChange}
                checked={searchAvail}
              />
              <Label htmlFor="domestic" className="font-normal">
                국내 판매
              </Label>
            </div>
            {/* ============================= 정렬 순서 ============================= */}
            <Select defaultValue={orderList[0]}>
              <SelectTrigger className="w-[180px] bg-white rounded-xl border-gray-300 focus:ring-offset-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-0 rounded-xl bg-white">
                <SelectGroup>
                  <SelectLabel>정렬</SelectLabel>
                  {orderList.map((item) => (
                    <SelectItem value={item} textValue={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* ============================= 검색 결과 ============================= */}
          <div className="flex flex-row flex-wrap gap-2">
            {searchResultData && searchResultData.length > 0
              ? searchResultData.map((item) => (
                  <LiqourSearchItem key={item.id} data={item} />
                ))
              : "검색 결과가 없습니다."}
          </div>
          {/* ============================= 확인용 ============================= */}
          <div id="target" className="h-1 bg-red-50" />
        </div>
      </div>
    </div>
  );
}
