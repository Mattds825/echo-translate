import React from "react";

const FileDisplay = (props) => {
  const { file, audioStream, handleAudioReset } = props;

  return (
    <main
      className="flex-1 p-4 flex flex-col gap-3
    sm:gap-4 justify-center text-center pb-20 w-72 sm:w-96 max-w-full mx-auto"
    >
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-indigo-400 bold">File</span>
      </h1>
      <div className="my-4 flex flex-col text-left">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : "Custom Audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleAudioReset}
          className="text-slate-400 hover:text-indigo-600 duration-200"
        >
          Reset
        </button>
        <button className="px-3 py-2 rounded-lg text-indigo-400 flex items-center gap-2 font-medium specialBtn">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
