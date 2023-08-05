import type { Note, User } from "@prisma/client";
import { timeAgo, formattedDate } from "@/lib/date-time";
import Link from "next/link";

export type NoteItemProps = Omit<Note, "authorId"> & {
  author: User;
};

export function NoteItem({ note }: { note: NoteItemProps }) {
  const { createdAt, author, approved, content } = note;

  return (
    <>
      <div
        className={`my-4 border ${
          approved ? "border-gray-400" : "border-orange-600 bg-orange-100"
        }`}
      >
        <div className="flex justify-between items-center text-sm mb-2 px-3">
          <div className="leading-tight pt-3">
            @
            <Link href={`/user/${author.username}`} className="decorate-link">
              {author.username}
            </Link>
            {author.role === "ADMIN" ? <> [ADMIN] </> : "&bull;"}
            <span
              className="text-gray-500 font-light"
              title={formattedDate(createdAt)}
            >
              posted {timeAgo({ agoDate: createdAt })}.
            </span>
            {!approved && (
              <span>(Not public - pending moderator approval!)</span>
            )}
          </div>
          <div>
            {/* TODO: Admin buttons */}
            {/* https://github.com/genevievecurry/paint-library-app/blob/c0e46bbc54d6528b42e1193d7b8a853420639c18/src/routes/paint/%5Buuid%5D/_Notes.svelte#L154-L177 */}
          </div>
        </div>
        <div className="p-3 pt-2">{content}</div>
      </div>
    </>
  );
}
