import { cookies } from 'next/headers';

import { api } from './api';

import { Note } from '@/types/note';
import { User } from '@/types/user';

async function getCookieHeader() {
  const cookieStore = await cookies();

  return cookieStore.toString();
}

export async function fetchNotes(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}) {
  const cookie = await getCookieHeader();

  const response = await api.get('/notes', {
    params,
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const cookie = await getCookieHeader();

  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}

export async function checkSession() {
  const cookie = await getCookieHeader();

  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookie,
    },
  });

  return response;
}

export async function getMe(): Promise<User> {
  const cookie = await getCookieHeader();

  const response = await api.get('/users/me', {
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}