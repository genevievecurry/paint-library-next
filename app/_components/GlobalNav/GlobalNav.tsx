"use client";

import { useState } from "react";

export function GlobalNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative inline-block text-left pl-3">
      {/* TODO: Add click outside event handler to set menuOpen to false */}
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
          {/* TODO: Add menu icon */}
          [MENU]
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
            {/* {#if $session?.user}
            <div
              className="block px-4 pt-2 pb-4 border-b border-gray-300">
              <a
                href={`/@${$session.user.username}`}
                className="decorate-link text-sm"
                role="menuitem"
                tabindex="-1"
                on:click={() => (menuOpen = false)}
                >@{$session.user.username}</a>
            </div>
          {/if} */}
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
            {/* {#if $session?.user}
            {#if $session.user?.role === 'ADMIN'}
              <div className="block px-4 py-2 text-sm"
                ><a
                  href="/admin"
                  className="decorate-link"
                  role="menuitem"
                  tabindex="-1"
                  on:click={() => (menuOpen = false)}
                  >Paint Library Admin</a
                ></div>
              <div className="block px-4 py-2 text-sm"
                ><a
                  href="/admin/paints/create"
                  className="decorate-link"
                  role="menuitem"
                  tabindex="-1"
                  on:click={() => (menuOpen = false)}>Create Paint</a
                ></div>
              <div className="block px-4 py-2 text-sm">
                <a
                  href="/register"
                  className="decorate-link"
                  role="menuitem"
                  tabindex="-1"
                  on:click={() => (menuOpen = false)}
                  >Register User</a>
              </div>
            {/if}

            <div className="block px-4 py-2 text-sm">
              <a
                href="/account"
                className="decorate-link"
                role="menuitem"
                tabindex="-1"
                on:click={() => (menuOpen = false)}>Account</a>
            </div>

            <div
              className="block px-4 pb-2 pt-2 text-sm border-t border-gray-300">
              <span
                className="decorate-link cursor-pointer"
                role="menuitem"
                tabindex="-1"
                on:click={logoutHandler}>Sign Out</span>
            </div>
          {:else} */}
            <div className="block px-4 pb-2 pt-2 text-sm border-t border-gray-300">
              <a href="/login" className="decorate-link">
                Login
              </a>
            </div>
            {/* {/if} */}
          </div>
        </div>
      )}
    </div>
  );
}
