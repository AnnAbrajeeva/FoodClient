import { AxiosResponse } from 'axios';
import { api, apiBase } from 'config/api/api';

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

export async function PostApi<T>(url: string, data?: any): Promise<{ isError: boolean; data: T | null }> {
  try {
    const response: AxiosResponse<T> = await api.post<T>(url, data);
    console.log(response)
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
}

export async function DeleteApi<T>(url: string): Promise<{ isError: boolean; data: T | null }> {
  try {
    const response: AxiosResponse<T> = await api.delete<T>(url);
    console.log(response)
    return { isError: false, data: response.data };
  } catch (error) {
    return { isError: true, data: null };
  }
}

