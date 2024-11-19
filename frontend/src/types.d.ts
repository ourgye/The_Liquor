export interface SearchLiqourParams {
  term: string;
  page: number;
  avail: boolean;
  alcMin?: number;
  alcMax?: number;
  class?: string;
  brand?: string;
}
export type LiqourSearchItemProps = {
  id: string;
  korean_name: string;
  english_name: string;
  alcohol: number;
  classifications: string;
  image_path: string;
};

export interface LiqourSearchItemResponse {
  page: number;
  liquor_list: LiqourSearchItemProps[];
}
