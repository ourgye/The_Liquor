import { SearchLiqourParams } from "@/types";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

// 검색 시 사용
// liquor/search?term=&class=&alc-min=&alc-max=&avail=&brand=&page=
export async function searchLiquor(params: SearchLiqourParams) {
  return axios.get(`${url}/liquor/search`, { params });
}

// id 값으로 상세 정보 가져오기
export async function getLiquor(id: string) {
  return axios.get(`${url}/liquor/${id}`);
}
