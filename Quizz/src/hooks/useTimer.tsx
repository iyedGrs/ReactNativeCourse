import { useRef, useState } from "react";

const useTimer = (maxTime: number) => {
  const [time, setTime] = useState<number>(20);
  const interval = useRef<NodeJS.Timeout>();
  const startTimer = () => {
    setTime(maxTime);
    interval.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 500);
  };
  const clearTimer = () => {
    clearInterval(interval.current);
  };
  return {
    time,
    startTimer,
    clearTimer,
  };
};
export default useTimer;
