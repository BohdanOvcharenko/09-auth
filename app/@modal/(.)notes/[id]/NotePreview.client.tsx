'use client'

import { useParams, useRouter } from "next/navigation";
import css from './NotePreview.module.css';
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

type NotePreviewClientProps = {
  id?: string;
};

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const noteId = id ?? params.id;

  const { data, isLoading, error } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: Boolean(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  const formattedData = data.updatedAt
    ? `Updated at: ${data.updatedAt}`
    : `Created at: ${data.createdAt}`;

  const handleClosePreview = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClosePreview}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>

          
          <p className={css.tag}>Tag: {data.tag}</p>

          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{formattedData}</p>
        </div>

        <button
          type="button"
          className={css.button}
          onClick={handleClosePreview}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;