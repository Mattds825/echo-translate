import React from "react";

const HomePage = () => {
  return (
    <main
      className="flex-1 p-4 flex flex-col gap-3
    sm:gap-4 md:gap-5 justify-center text-center pb-20"
    >
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Echo<span className="text-indigo-400 bold">Translate</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-indigo-400">&rarr;</span> Transcribe{" "}
        <span className="text-indigo-400">&rarr;</span> Translate{" "}
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 px-4 py-2 rounded-xl specialBtn">
        <p className="text-indigo-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base">
        Or <label
          className="text-indigo-400 cursor-pointer hover:text-blue-600 duration-200"
          htmlFor="fileInput"
        >
          upload <input id="fileInput" className="hidden" type="file" accept=".mp3, .wave" />
        </label>
        an audio file
      </p>
      <p className="italic text-slate-500">Free now & free <span className="underline decoration-indigo-400">forever</span></p>
    </main>
  );
};

export default HomePage;
