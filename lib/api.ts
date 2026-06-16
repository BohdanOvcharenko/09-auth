import axios from "axios";
import type { Note } from "../types/note";



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
    'https://notehub-public.goit.study/api/notes',
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

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
    const response = await axios.post <Note>('https://notehub-public.goit.study/api/notes', newNote, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete <Note>(`https://notehub-public.goit.study/api/notes/${id}`, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};  

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios.get <Note>(`https://notehub-public.goit.study/api/notes/${id}`, {headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      }});
    return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`https://notehub-public.goit.study/api/notes/categories`, { headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  }});
  return response.data;
};

