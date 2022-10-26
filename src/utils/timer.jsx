import { useCallback, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

function timer() {
  const [currentTime, setCurrentTime] = useState(DateTime.now());
  const [inputTime] = useState(DateTime.now().toUnixInteger());
  const [diffTime, setDiffTime] = useState(0);

  const currentTimeRef = useRef(currentTime);
  currentTimeRef.current = currentTime;
  const inputTimeRef = useRef(inputTime);
  inputTimeRef.current = process.env.START;

  const calculateDiff = useCallback((inputT, currentT) => {
    setDiffTime(currentT.toUnixInteger() - inputT);
    setTimeout(() => {
      calculateDiff(inputTimeRef.current, currentTimeRef.current);
    }, 500);
  }, []);

  const formatDiff = (diffT) => {
    const isPositive = diffT >= 0;
    const absDiff = Math.abs(diffT);
    let remainder = absDiff;
    const days = Math.floor(absDiff / 86400);
    remainder = remainder % 86400;
    const hours = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    const minutes = Math.floor(remainder / 60);
    remainder = remainder % 60;
    const result = `${days}D ${hours}H ${minutes}M ${remainder}S`;

    if (isPositive) {
      return ``;
    }

    return `Starts in ${result}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 500);

    calculateDiff(inputTimeRef.current, currentTimeRef.current);

    return () => clearInterval(intervalId);
  }, [calculateDiff]);

  return (
      <div className="timer">
 {formatDiff(diffTime)}
      </div>

  );
}

export default timer;
