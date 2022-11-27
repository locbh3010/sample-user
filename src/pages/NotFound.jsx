import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const notFoundRef = useRef(null);
  useEffect(() => {
    notFoundRef.current?.classList.add("cont_error_active");
    return () => {
      notFoundRef.current?.classList.remove("cont_error_active");
    };
  }, []);
  return (
    <div
      className="cont_principal w-[100vw] h-[100vh] bg-[#D4D9ED]"
      ref={notFoundRef}
    >
      <div className="cont_error pl-10">
        <h1 className="font-bold text-7xl uppercase text-blue-500">Oops</h1>
        <p>The Page you're looking for isn't here.</p>
        <Link
          to="/"
          className="shadow rounded-lg bg-blue-500 text-white font-bold text-xl inline-flex items-center gap-3 capitalize py-4 px-7 mt-7 duration-300 hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          To home Page
        </Link>
      </div>
      <div className="cont_aura_1"></div>
      <div className="cont_aura_2"></div>
    </div>
  );
};

export default NotFound;
