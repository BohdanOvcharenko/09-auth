import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

interface AuthData {
  email: string;
  password: string;
}

export async function register(data: AuthData): Promise<User> {
  const response = await api.post('/auth/register', data);

  return response.data;
}

export async function login(data: AuthData): Promise<User> {
  const response = await api.post('/auth/login', data);

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession() {
  const response = await api.get('/auth/session');

  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get('/users/me');

  return response.data;
}

export async function updateMe(
  data: Partial<User>
): Promise<User> {
  const response = await api.patch('/users/me', data);

  return response.data;
}

export async function fetchNotes(params: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) {
  const response = await api.get('/notes', {
    params,
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get(`/notes/${id}`);

  return response.data;
}

export async function createNote(noteData: {
  title: string;
  content: string;
  tag: string;
}) {
  const response = await api.post('/notes', noteData);

  return response.data;
}

export async function deleteNote(id: string) {
  const response = await api.delete(`/notes/${id}`);

  return response.data;
}