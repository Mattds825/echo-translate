import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <h1 className="font-medium">
        Echo<span className="text-indigo-400 bold">Translate</span>
      </h1>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-400 specialBtn">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
};

export default Header;
