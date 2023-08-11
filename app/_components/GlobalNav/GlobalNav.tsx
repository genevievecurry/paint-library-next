"use client";

import { Bars4Icon } from "@heroicons/react/20/solid";
import { useState } from "react";

export function GlobalNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative inline-block text-left pl-3">
      {/* TODO: Add click outside event handler to set menuOpen to false */}
      {/* https://github.com/genevievecurry/paint-library-app/blob/c0e46bbc54d6528b42e1193d7b8a853420639c18/src/routes/__layout.svelte#L90-L94 */}
      <div>
        <button
          type="button"
          id="menu-button"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          onClick={() => setMenuOpen(!menuOpen)}
          className="pop inline-flex justify-center px-2 py-1 text-sm {menuOpen
          ? 'text-pink-400 active'
          : 'text-black'}"
        >
          <Bars4Icon className="h-6 w-6" />
        </button>
      </div>
      {menuOpen && (
        <div
          className="light transition ease-out duration-100 {menuOpen
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'} z-10 border-2 border-black origin-top-right absolute right-0 mt-2 w-48 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {/* TODO: Add authorized user & admin menu items */}
            {/* https://github.com/genevievecurry/paint-library-app/blob/c0e46bbc54d6528b42e1193d7b8a853420639c18/src/routes/__layout.svelte#L116-L127 */}
            <div className="block px-4 pt-2 pb-2 border-b border-gray-300">
              <span className="text-xs text-gray-500">Browse by:</span>
              <div className="block px-4 py-1 text-sm">
                <a
                  href="/pigments"
                  className="decorate-link text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setMenuOpen(false)}
                >
                  Pigment
                </a>
              </div>
              <div className="block px-4 py-1 text-sm">
                <a
                  href="/manufacturers"
                  className="decorate-link text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setMenuOpen(false)}
                >
                  Manufacturer
                </a>
              </div>
            </div>
            {/* TODO: Add authorized user & admin menu items */}
            {/* https://github.com/genevievecurry/paint-library-app/blob/c0e46bbc54d6528b42e1193d7b8a853420639c18/src/routes/__layout.svelte#L147-L199 */}
            {/* <div className="block px-4 pb-2 pt-2 text-sm border-t border-gray-300">
              <a href="/login" className="decorate-link">
                Login
              </a>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
