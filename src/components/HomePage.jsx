import React, { useState, useEffect, useRef } from "react";

const HomePage = (props) => {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  /**
   * Starts recording audio from the user's microphone.
   *
   * This function:
   * - Requests access to the user's microphone.
   * - Creates a MediaRecorder instance to handle the audio stream.
   * - Starts recording audio and stores the audio data in chunks.
   *
   * If an error occurs while accessing the microphone, it logs the error to the console.
   *
   */
  const startRecording = async () => {
    let tempStream;

    console.log("start recording");

    try {
      // Get audio stream from user's microphone
      const streamDate = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamDate;
    } catch (err) {
      console.error(err);
      return;
    }
    setRecordingStatus("recording");

    // Create a new MediaRecorder instance with the audio stream
    const media = new MediaRecorder(tempStream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (e) => {
      // return if there is no data
      if (typeof e.data === "undefined") return;
      if (e.data.size === 0) return;

      // Push the audio data to the localAudioChunks array
      localAudioChunks.push(e.data);
    };

    setAudioChunks(localAudioChunks);
  };

  /**
   * Stops recording audio from the user's microphone.
   * This function:
   * - Stops the MediaRecorder instance.
   * - Creates a new Blob from the audio chunks.
   * - Sets the audio stream state with the new Blob.
   * - Resets the audioChunks state.
   * - Resets the duration state.
   */
  const stopRecording = () => {
    setRecordingStatus("inactive");

    console.log("stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType }); // Create a new Blob from the audio chunks
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  };

  //
  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <main
      className="flex-1 p-4 flex flex-col gap-3
    sm:gap-4  justify-center text-center pb-20"
    >
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Echo<span className="text-indigo-400 bold">Translate</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-indigo-400">&rarr;</span> Transcribe{" "}
        <span className="text-indigo-400">&rarr;</span> Translate{" "}
      </h3>
      <button onClick={recordingStatus === "recording" ? stopRecording : startRecording} className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 px-3 py-2 rounded-xl specialBtn">
        <p className="text-indigo-400">
          {recordingStatus === "recording" ? "Stop recording" : "Record"}
        </p>
        <div className="flex items-center gap-2">
            {duration && (
                <p className="text-sm">{duration}s</p>
            )}
          <i className={"fa-solid fa-microphone duration-200 " + (recordingStatus === "recording" ? "text-rose-300" : "")}></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label
          className="text-indigo-400 cursor-pointer hover:text-blue-600 duration-200"
          htmlFor="fileInput"
        >
          upload{" "}
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            id="fileInput"
            className="hidden"
            type="file"
            accept=".mp3, .wave"
          />
        </label>
        an audio file
      </p>
      <p className="italic text-slate-500">
        Free now & free{" "}
        <span className="underline decoration-indigo-400">forever</span>
      </p>
    </main>
  );
};

export default HomePage;
