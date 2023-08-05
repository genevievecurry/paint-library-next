"use client";

import { useRef } from "react";
import { Dialog } from "@headlessui/react";

export function Modal({
  title,
  fullWidth = false,
  children,
  isOpen = false,
  setIsOpen,
}: {
  title: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeButtonRef = useRef(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-20 inset-0 overflow-y-auto"
      initialFocus={closeButtonRef}
    >
      <div className="fixed inset-0 bg-gray-100/30" aria-hidden="true" />
      <div
        className="flex min-h-screen text-center md:block md:px-2 lg:px-4 overflow-y"
        style={{ fontSize: 0 }}
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className={`flex text-base text-left transition w-full md:inline-block  md:px-4 md:my-8 md:align-middle ${
              fullWidth ? "lg:max-w-full" : "md:max-w-2xl lg:max-w-4xl"
            }`}
          >
            <Dialog.Panel className="border-2 border-black w-full relative flex items-center bg-white px-4 md:px-8 pt-4 md:pt-8 pb-8 overflow-hidden ">
              <button
                type="button"
                className="absolute top-4 right-4 text-black hover:text-pink-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="w-full grid grid-cols-1 gap-y-8 gap-x-0 items-start sm:grid-cols-12 lg:gap-x-8 ">
                <div className="col-span-11">
                  <h2 className="h2">{title}</h2>
                </div>
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
