import axios from "axios";
import type { Note } from "../../types/note";
import { User } from "@/types/user";



export interface NotesResponseProps {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  page: number;
  search: string;
  tag?: string;
}

export const fetchNotes = async ({page, search, tag,}: FetchNotesProps): Promise<NotesResponseProps> => {
  const response = await axios.get<NotesResponseProps>(
    'https://notehub-api.goit.study/api/notes',
    {
      params: {
        page,
        search,
        ...(tag && tag !== 'all' ? { tag } : {}),
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }
    }   
    );
     return response.data;
}


export type CreateNoteProps = {
  title: string;
  content: string;
  categoryId: string;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios.get <Note>(`https://notehub-api.goit.study/api/notes/${id}`, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
    const response = await axios.post <Note>('https://notehub-api.goit.study/api/notes', newNote, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete <Note>(`https://notehub-api.goit.study/api/notes/${id}`, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};  

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`https://notehub-api.goit.study/api/notes/categories`, { headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  }});
  return response.data;
};

export const register = async (email: string, password: string): Promise<void> => {
  await axios.post('https://notehub-api.goit.study/api/auth/register', { email, password });
};

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post<{ token: string }>('https://notehub-api.goit.study/api/auth/login', { email, password });
  return response.data.token;
};

export const checkSession = async (token: string): Promise<boolean> => {
  try {
    await axios.get('https://notehub-api.goit.study/api/auth/check', { headers: { Authorization: `Bearer ${token}` } });
    return true;
  } catch {
    return false;
  }
};

export const logout = async (token: string): Promise<void> => {
  await axios.post('https://notehub-api.goit.study/api/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
};

export const getMe = async (token: string): Promise<User> => {
  const response = await axios.get<User>('https://notehub-api.goit.study/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateMe = async (token: string, email: string, username: string): Promise<User> => {
  const response = await axios.put<User>('https://notehub-api.goit.study/api/auth/me', { email, username }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
