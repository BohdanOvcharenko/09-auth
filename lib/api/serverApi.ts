import { Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
const api = axios.create({ baseURL });

export const fetchServerNotes = async (): Promise<Note[]> => {
  const response = await api.get<Note[]>('/notes');
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const checkSession = async (): Promise<{ isAuthenticated: boolean; user?: any }> => {
  try {
    const response = await api.get('/auth/check-session', { withCredentials: true });
    return { isAuthenticated: response.data.isAuthenticated, user: response.data.user };
  } catch (error) {
    return { isAuthenticated: false };
  } 
};

export const register = async (email: string, password: string): Promise<void> => {
  await api.post('/auth/register', { email, password }, { withCredentials: true });
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/auth/me', { withCredentials: true });
  return response.data;
};

export const login = async (email: string, password: string): Promise<void> => {
  await api.post('/auth/login', { email, password }, { withCredentials: true });
};