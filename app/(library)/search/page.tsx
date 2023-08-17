"use client";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
  PageHeader,
  PaintCardItem,
  PigmentCardItem,
} from "@/components/client";
import type {
  PaintCardItemProps,
  PigmentCardItemProps,
} from "@/components/client";
import { pluralizeWord } from "@/lib/utilities";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { Badge } from "@/components/Badge";

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const pageTitle = searchQuery ? searchQuery : "Search";

  const [paints, setPaints] = useState<PaintCardItemProps[]>([]);
  const [paintResultsCount, setPaintResultsCount] = useState<number>(0);
  const [pigments, setPigments] = useState<PigmentCardItemProps[]>([]);
  const [pigmentResultsCount, setPigmentResultsCount] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setPaints(data.paintCardCollection);
        setPigments(data.pigmentCardCollection);
        setPaintResultsCount(data.paintCardCollection.length);
        setPigmentResultsCount(data.pigmentCardCollection.length);
        setSelectedIndex(
          data.paintCardCollection.length === 0 &&
            data.pigmentCardCollection.length > 0
            ? 1
            : 0
        );
      });
  }, [searchQuery]);

  function setSubtitle() {
    if (paintResultsCount > 0 && pigmentResultsCount > 0 && searchQuery) {
      return `${paintResultsCount} ${pluralizeWord(
        paintResultsCount,
        "paint"
      )} and ${pigmentResultsCount} ${pluralizeWord(
        pigmentResultsCount,
        "pigment"
      )} found`;
    }

    if (paintResultsCount > 0 && searchQuery) {
      return `${paintResultsCount} ${pluralizeWord(
        paintResultsCount,
        "paint"
      )} found`;
    }

    if (pigmentResultsCount > 0 && searchQuery) {
      return `${pigmentResultsCount} ${pluralizeWord(
        pigmentResultsCount,
        "pigment"
      )} found`;
    }

    return "";
  }

  return (
    <>
      <PageHeader title={pageTitle} subtitle={setSubtitle()} />

      {searchQuery && (paintResultsCount > 0 || pigmentResultsCount > 0) && (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`pop px-4 py-2 text-xl hover:text-pink-500 inline-flex ${
                    selected ? "active" : ""
                  }`}
                >
                  <span className="mr-1">Paints</span>{" "}
                  <Badge>{paintResultsCount}</Badge>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`pop px-4 py-2 text-xl hover:text-pink-500 ml-2 inline-flex ${
                    selected ? "active" : ""
                  }`}
                >
                  <span className="mr-1">Pigments</span>{" "}
                  <Badge>{pigmentResultsCount}</Badge>
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Watercolor Paints</h2>

                {/* If there are paint results */}
                {paintResultsCount > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3">
                    {paints.map((paint) => (
                      <PaintCardItem key={paint.uuid} paint={paint} />
                    ))}
                  </div>
                )}
                {/* If there are no paint results */}
                {paintResultsCount === 0 && (
                  <p className="text-gray-500 font-light my-6">
                    No paint results matching &quot;{searchQuery}&quot; were
                    found.
                  </p>
                )}
              </section>
            </Tab.Panel>
            <Tab.Panel>
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Pigments</h2>
                {pigmentResultsCount > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {pigments.map((pigment) => (
                      <PigmentCardItem key={pigment.id} pigment={pigment} />
                    ))}
                  </div>
                )}

                {/* If there are no paint results */}
                {pigmentResultsCount === 0 && (
                  <p className="text-gray-500 font-light my-6">
                    No pigment results matching &quot;{searchQuery}&quot; were
                    found.
                  </p>
                )}
              </section>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}

      {/* If there are no results for a searchQuery */}
      {searchQuery && paintResultsCount === 0 && pigmentResultsCount === 0 && (
        <p className="text-gray-500 font-light my-6">
          No paint or pigment results matching &quot;{searchQuery}&quot; were
          found.
        </p>
      )}

      {/* If there are no paint results and empty searchQuery */}
      {!searchQuery && paintResultsCount === 0 && pigmentResultsCount === 0 && (
        <div className="text-center max-w-lg mx-auto">
          <SearchBar />
          <p className="text-lg font-light mt-4">
            Try searching for &quot;Cadmium&quot; or &quot;Cobalt Blue&quot;
          </p>
        </div>
      )}
    </>
  );
}
