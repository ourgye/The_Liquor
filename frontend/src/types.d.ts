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

export type ClassificationType = {
  id: number;
  name: string;
  parent_id?: number | null;
  children?: classficationType[];
};

export interface LiquorDetailResponse {
  id: string;
  producer: string;
  brand: string;
  classifications: string;
  korean_name: string;
  english_name: string;
  count: string;
  alcohol: number;
  aged: string;
  price: number;
  ibu: number;
  is_domestic_sale: boolean;
  description: string;
  updated_at: string;
  adv: string;
  image_path: string;
}
export interface LiquorDetailBrandResponse {
  id: string;
  classification_name: string;
  image_path: string;
  name: string;
}
