import  { useState, useEffect } from 'react';

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

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <h1 className='text-5xl font-bold underline'>STOPWATCH</h1>
      <h1>{formatTime(elapsedTime)}</h1>
      <button onClick={start} disabled={isRunning}>
        Start
      </button>
      <button onClick={stop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default App;
