import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const tagName = slug[0] === "all" ? undefined : slug[0]
    return {
        title: tagName ? `Notes tagged with "${tagName}"` : 'All Notes',
        description: tagName ? `A collection of notes tagged with "${tagName}".` : 'A collection of all notes.',
        openGraph: {
            title: tagName ? `Notes tagged with "${tagName}"` : 'All Notes',
            description: tagName ? `A collection of notes tagged with "${tagName}".` : 'A collection of all notes.',
            url: `https://notehub.com/notes/filter/${slug.join('/')}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: tagName ? `Notes tagged with "${tagName}"` : 'All Notes',
                },
            ],
        },
    }
}



const NotesByTag = async ({ params }: Props) => {
    const { slug } = await params;
    const queryClient = new QueryClient()
    const currentPage = 1;
    


    const tagName = slug[0] === "all" ? undefined : slug[0]

    await queryClient.prefetchQuery({
        queryKey: ['notes', currentPage, tagName],
        queryFn: () => fetchNotes({ tag: tagName, page: currentPage, search: '' })
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tagName} />

        </HydrationBoundary>

    )
}

export default NotesByTag