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
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { parseURLtoParams, searchLiquor } from "@/services/liquor";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { orderList } from "@/assets/constant";

export default function SearchResult() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = useAppSelector((state) => state.search.term);
  const params = parseURLtoParams(window.location.href);

  const [checked, setChecked] = useState(true);
  const [response, setResponse] = useState();

  // const handleCheckChange = (checked: boolean) => {
  //   navigate({
  //     pathname: "/search",
  //     search: createSearchParams({
  //       ...params,
  //       avail: checked ? "true" : "false",
  //     }).toString(),
  //   }),
  //     setChecked(checked);
  // };

  // useEffect(() => {
  //   searchLiquor({ params }).then((value) => {
  //     setResponse(value.data);
  //   });
  // }, [checked, searchTerm]);

  return (
    <div className="pt-24 px-10">
      <div className="flex flex-row w-full gap-4">
        {/* ========================= 분류 선택 ========================= */}
        <SearchFilter searchTerm={params.term} />
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full justify-between">
            {/* ========================= 국내 판매 여부 토글 ========================= */}
            <div className="flex flex-row gap-2 justify-center items-center">
              <Switch
                id="domestic"
                // onCheckedChange={handleCheckChange}
                checked={checked}
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
            {response?.liquor_list?.length
              ? response.liquor_list.map((item: any) => (
                  <LiqourSearchItem key={item.id} data={item} />
                ))
              : "검색 결과가 없습니다."}
          </div>
          <div id="target" className="h-1 bg-red-50" />
        </div>
      </div>
    </div>
  );
}
