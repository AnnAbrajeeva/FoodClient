import { AxiosResponse } from 'axios';
import { api } from 'config/api/api';

export type ApiResponse<T> = {
  isError: boolean;
  data: T;
};

export async function fetchApi<T>(url: string): Promise<{ isError: boolean; data: T | null }> {
  try {
    const response: AxiosResponse<T> = await api.get<T>(url);
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
}
