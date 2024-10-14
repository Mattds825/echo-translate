import { useState, useEffect, useRef } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      // Create a new worker instance if it doesn't exist
      worker.current = new Worker(
        new URL("./utils/whisperer.worker.js", import.meta.url),
        { type: "module" }
      ); 
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWNLOADING");
          break;
        case "LOADING":
          setLoading(true);
          console.log("LOADING");
          break;
        case "RESULT":
          setOutput(e.date.results);
          console.log("RESULT");
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("INFERENCE_DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    // Cleanup
    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
    };
  }, []);

  /**
   * Reads audio data from a given file and returns the audio data as a Float32Array.
   *
   * @param {File} file - The audio file to read from.
   * @returns {Promise<Float32Array>} A promise that resolves to the audio data.
   */
  const readAudioFrom = async (file) => {
    const sampling_rate = 16000;
    const audioContext = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  };

  const handleFormSubmission = async () => {
    if(!file && !audioStream) return;
    

    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = "openai/whisper-tiny.en";

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {/* Conditional rendering of page */}
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
        <footer></footer>
      </section>
    </div>
  );
}

export default App;
