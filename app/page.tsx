import { PaintCardCollection } from "@/components/PaintCardCollection";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <div className="lg:container mx-auto py-16 px-4 sm:px-6">
          <h1 className="font-bold text-5xl">Paint Library</h1>
          <p className="text-xl font-light mt-6">
            Paint Library is an online database of artist paint swatches.
          </p>
          <div className="w-full mt-8">[SEARCH]</div>
        </div>
      </div>

      <div className="lg:container mx-auto px-4 sm:px-6">
        <h2 className="font-bold text-3xl mb-6">Recently Swatched Paints</h2>

        <PaintCardCollection count={30} />
      </div>
    </>
  );
}
