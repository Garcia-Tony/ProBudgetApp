import { useState } from 'react';

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative flex-grow flex-1 pl-2 px-4">
      <div className="flex items-center space-x-4">
        <button
          className="rounded py-2 px-1.5 bg-white hover:bg-gray-200 transition mt-6"
          onClick={toggleMenu}>
          <svg
            className="md:w-[50px] md:h-[50px] w-8 h-8 text-[#01898B]"
            viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-0 left-0 h-screen w-64 bg-white shadow-md border transition-all transform ease-in-out
  ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  shadow-lg shadow-black md:w-1/2`}>
          <button
            className="flex justify-center w-full mb-2"
            onClick={toggleMenu}>
            <svg
              className="w-[55px] h-[55px] md:w-[100px] md:h-[100px] mr-[180px] mt-5 md:mr-[82%]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.707 5.293a1 1 0 0 1 0 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z"
                fill="#01898B"
              />
            </svg>
          </button>
          <h2 className="text-4xl ml-3 text-[#01898B] font-bold mt-8 md:text-5xl md:ml-[25px]">
            Menu
          </h2>
        </div>
      )}
    </div>
  );
}
