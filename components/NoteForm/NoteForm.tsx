'use client';

import css from './NoteForm.module.css';

import { createNote } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';

type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

type NoteFormValues = {
  title: string;
  content: string;
  tag: NoteTag;
  categoryId?: string;
};

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({ queryKey: ['notes'] });

      router.push('/notes/filter/all');
    },

    onError: (err) => {
      console.error('Create note error:', err);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: NoteFormValues = {
      title: String(formData.get('title') || ''),
      content: String(formData.get('content') || ''),
      tag: (formData.get('tag') as NoteTag) || 'Todo',
    };

    mutate({ ...payload, categoryId: payload.categoryId || '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          value={draft.title}
          className={css.input}
          onChange={(e) =>
            setDraft({ ...draft, title: e.target.value })
          }
        />
      </div>

      
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          value={draft.content}
          className={css.textarea}
          onChange={(e) =>
            setDraft({ ...draft, content: e.target.value })
          }
        />
      </div>

      
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          value={draft.tag}
          className={css.select}
          onChange={(e) =>
            setDraft({
              ...draft,
              tag: e.target.value as NoteTag,
            })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}