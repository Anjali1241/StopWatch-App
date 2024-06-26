import { useState, useEffect } from "react";

const App = () => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else if (!isRunning && startTime !== null) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const start = () => {
    setStartTime(Date.now() - elapsedTime);
    setIsRunning(true);
  };

  const stop = () => {
    setElapsedTime(Date.now() - startTime);
    setIsRunning(false);
  };

  const reset = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-blue-800">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">STOPWATCH</h1>
        <h1 className="text-2xl font-mono text-center text-gray-800 mb-6">{formatTime(elapsedTime)}</h1>
        <div className="flex justify-center gap-4">
          <button 
            onClick={start} 
            disabled={isRunning} 
            className={`px-6 py-3 rounded-md text-lg font-semibold transition-colors ${
              isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300'
            } text-white shadow-md`}
          >
            Start
          </button>
          <button 
            onClick={stop} 
            disabled={!isRunning} 
            className={`px-6 py-3 rounded-md text-lg font-semibold transition-colors ${
              !isRunning ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300'
            } text-white shadow-md`}
          >
            Stop
          </button>
          <button 
            onClick={reset} 
            className="px-6 py-3 bg-yellow-500 text-lg font-semibold rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 text-white shadow-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
