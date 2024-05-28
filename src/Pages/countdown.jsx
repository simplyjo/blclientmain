import React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Countdown = () => {
  const dateTime = dayjs.utc('2024-03-04T16:00:00').toDate();

  const calculateTimeUntilTarget = () => {
    const currentTime = dayjs.utc().toDate();
    const timeDiff = dateTime.getTime() - currentTime.getTime();
    const secondsUntilTarget = Math.max(0, Math.floor(timeDiff / 1000));
    return secondsUntilTarget;
  };

  const [time, setTime] = useState(calculateTimeUntilTarget());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeUntilTarget();
      if (newTime <= 0) {
        clearInterval(interval); // Stop the interval if the countdown is complete
      } else {
        setTime(newTime); // Update the time left
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array to run once on mount

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="w-full text-center mt-[20px]">
      <h4 className="text-[50px] lg:text-[50px] font-[900] font-body text-white tracking-wider">
        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </h4>
    </div>
  );
};

export default Countdown;