import React, { useEffect, useState } from "react";
import "./CountdownTimer.scss";

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsExpired(false);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="countdown-timer">
      {isExpired ? (
        <div className="timer-expired">Đã kết thúc</div>
      ) : (
        <div className="timer-container">
          <div className="timer-unit">
            <span className="timer-value">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="timer-label">Ngày</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-value">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="timer-label">Giờ</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-value">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="timer-label">Phút</span>
          </div>
          <span className="timer-separator">:</span>
          <div className="timer-unit">
            <span className="timer-value">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="timer-label">Giây</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountdownTimer;
