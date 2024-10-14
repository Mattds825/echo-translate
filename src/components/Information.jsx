import React, { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = () => {
  const [tab, setTab] = useState("transcription");
  return (
    <main
      className="flex-1 p-4 flex flex-col gap-3
  sm:gap-4 justify-center text-center pb-20 max-w-prose w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-normal">
        Your <span className="text-indigo-400 bold">Transcription</span>
      </h1>

      <div className="grid grid-cols-2 items-center border-2 border-solid border-indigo-400 shadow rounded-full overflow-hidden mx-auto">
        <button onClick={() => setTab("transcription")} className={"px-4 py-1 duration-200 font-medium " + (tab === "transcription" ? "bg-indigo-400 text-white" : "text-indigo-400 hover:text-indigo-600")}>Transcription</button>
        <button onClick={() => setTab("translation")} className={"px-4 py-1 duration-200 font-medium " + (tab === "translation" ? "bg-indigo-400 text-white" : "text-indigo-400 hover:text-indigo-600")}>Translation</button>
      </div>
      {tab === "transcription" ? (<Transcription />) : (<Translation />)}
    </main>
  );
};

export default Information;
