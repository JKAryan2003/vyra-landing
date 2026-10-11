import type {
  Category,
  SubCategory,
  Brand,
  SpendRange,
  CustomerForm,
  Area,
} from "../types";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const getCategories = () =>
  apiRequest<Category[]>("/categories/");

export const getSubCategories = () =>
  apiRequest<SubCategory[]>("/subcategories/");

export const getBrands = () =>
  apiRequest<Brand[]>("/brands/");

export const getSpendRanges = () =>
  apiRequest<SpendRange[]>("/spend-ranges/");

export const getAreas = () =>
  apiRequest<Area[]>("/areas/");

export const createCustomer = (data: CustomerForm) =>
  apiRequest("/customers/", {
    method: "POST",
    body: JSON.stringify(data),
  });