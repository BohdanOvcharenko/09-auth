import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
const api = axios.create({ baseURL });

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/categories');
  return response.data;
};

