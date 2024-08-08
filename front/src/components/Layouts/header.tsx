import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const [tabPageNum, setTabPageNum] = useState<number>(0);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/dashBoard") {
      setTabPageNum(0);
    } else if (location.pathname === "/imageBoard") {
      setTabPageNum(1);
    }

    window.addEventListener("scroll", scrollCheck);
    return () => window.removeEventListener("scroll", scrollCheck);
  }, [location.pathname]);

  const tabClick = (pageNum: number) => {
    setIsMenuOpen(false);
    setTabPageNum(pageNum);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollCheck = () => {
    if (window.pageYOffset > 120) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto ">
        <a
          href="/dashBoard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            treeD Studio
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/dashBoard"
                className={`block px-3 py-2 rounded ${
                  tabPageNum === 0
                    ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                onClick={() => tabClick(0)}
              >
                대쉬보드
              </Link>
            </li>
            <li>
              <Link
                to="/imageBoard"
                className={`block px-3 py-2 rounded ${
                  tabPageNum === 1
                    ? " text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }`}
                onClick={() => tabClick(1)}
              >
                이미지 게시판
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={scrollToTop}
          className={`z-50 fixed bottom-10 right-10 w-12 h-12 p-3 text-gray-500 bg-white border border-gray-300 rounded-full shadow-md transition-opacity duration-300 ${
            showScrollButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;
