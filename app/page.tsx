import { PaintCardCollection } from "@/components/PaintCardCollection";
import { SearchBar } from "./_components/SearchBar/SearchBar";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="w-full">
        <div className="lg:container mx-auto py-16 px-4 sm:px-6">
          <h1 className="font-bold text-5xl">Paint Library</h1>
          <p className="text-xl font-light mt-6">
            Paint Library is an online database of artist paint swatches &
            pigments.
          </p>
          <div className="w-full mt-8">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="lg:container mx-auto px-4 sm:px-6">
        <h2 className="font-bold text-3xl mb-6">Recently Swatched Paints</h2>

        <PaintCardCollection
          count={30}
          orderBy={{ updatedAt: "desc" }}
          showOnlySwatched={true}
        />
      </div>
    </>
  );
}
