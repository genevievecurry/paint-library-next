"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar({ reverse = false }: { reverse?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("q") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full flex align-middle border-2 ${
        reverse
          ? "bg-gray-900 border-white text-white"
          : "bg-white  border-black text-black"
      } focus:outline-none focus:ring-lime-500 focus:border-lime-500`}
    >
      <button className="p-3 flex-none">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>

      <input
        className={`flex-grow font-light py-2 px-3 ${
          reverse
            ? "bg-gray-900 border-white text-white"
            : "bg-white  border-black text-black"
        }`}
        onChange={(e) => setSearchQuery(e.target.value)}
        defaultValue={defaultValue}
        placeholder="Search Paints and Pigments"
      />
    </form>
  );
}
