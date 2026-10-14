export interface Area {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface SpendRange {
  id: number;
  low_range: number;
  high_range: number;
}

export interface CustomerForm {
  name: string;
  mobile: string;
  email: string;

  area: number | null;

  categories: number[];

  subcategories: number[];

  brands: number[];

  spend_range: number | null;

  note: string;

  notify_me: boolean;
}