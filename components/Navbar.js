import React from 'react'

const Navbar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50  bg-slate-200 text-sm py-4 dar:bg-gray-800 w-[80vw] mx-auto rounded-xl sticky top-2 left-[10vw]">
      <nav
        className="px-4 w-full sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center w-full justify-between">
          <a
            className="flex items-center justify-center w-full gap-x-2 text-3xl uppercase text-slate-900 font-semibold  dar:text-white"
            href="#"
          >
            To-Do List by Shubham
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar