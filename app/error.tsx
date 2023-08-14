"use client"; // Error components must be Client Components

import { PageHeader } from "@/components/PageHeader";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHeader title={error.name}></PageHeader>

      <p className="mb-6">{error.message || "An unknown error occurred."}</p>
      <button
        className="pop px-4 py-2 text-xl hover:text-pink-500 inline-flex"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </>
  );
}
