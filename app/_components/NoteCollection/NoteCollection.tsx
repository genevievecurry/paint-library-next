import prisma from "@/lib/prisma";
import { limitedUserSelect } from "@/lib/user";
import { NoteItem } from "@/components/client";
import type { NoteItemProps } from "@/components/client";

async function getNoteCollection<T extends { [key: string]: Promise<any> }>({
  paintId,
  authorUuid,
}: {
  paintId?: number;
  authorUuid?: string;
}): Promise<UnPromisifiedObject<T>> {
  const noteCollection = await prisma.note.findMany({
    where: {
      paintId: paintId,
      authorUuid: authorUuid,
    },
    select: {
      id: true,
      author: { select: limitedUserSelect },
      paint: {
        select: {
          uuid: true,
          slug: true,
          name: true,
        },
      },
      approved: true,
      content: true,
      createdAt: true,
    },
  });

  return noteCollection as UnPromisifiedObject<T>;
}

function showNote(note: NoteItemProps) {
  // TODO: if (note.approved || $session.user.role === 'ADMIN' || $session.user.uuid === note.author.uuid)
  if (note.approved) {
    return true;
  }
  return false;
}

export async function NoteCollection({
  paintId,
  authorUuid,
}: {
  paintId?: number;
  authorUuid?: string;
}) {
  const noteCollection = (await getNoteCollection({
    paintId,
    authorUuid,
  })) as NoteItemProps[];

  if (noteCollection.length === 0)
    return (
      <span className="block my-4 text-gray-400 font-light">
        No artist notes have been added yet.
      </span>
    );

  return (
    <>
      {noteCollection.map((note, index) => (
        <>{showNote(note) && <NoteItem key={index} note={note} />}</>
      ))}
    </>
  );
}
