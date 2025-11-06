import React, { useState, useRef, useEffect } from "react";
import "./SpinWheel.scss";
import { playMiniGame, getUserGameStats } from "../../api/minigame";

const SpinWheel = ({ settings }) => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [remainingPlays, setRemainingPlays] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStats, setGameStats] = useState(null);

  const spinDuration = 3000;
  const wheelRadius = 150;

  const rewards = [
    { text: "0 điểm", value: 0, color: "#6c757d" },
    { text: "10 điểm", value: 10, color: "#17a2b8" },
    { text: "20 điểm", value: 20, color: "#007bff" },
    { text: "30 điểm", value: 30, color: "#6610f2" },
    { text: "50 điểm", value: 50, color: "#20c997" },
    { text: "100 điểm", value: 100, color: "#28a745" },
    { text: "200 điểm", value: 200, color: "#ffc107" },
    { text: "500 điểm", value: 500, color: "#dc3545" },
  ];

  useEffect(() => {
    fetchRemainingPlays();
    drawWheel();
  }, []);

  const fetchRemainingPlays = async () => {
    try {
      const data = await getUserGameStats();
      if (data.success) {
        setRemainingPlays(data.data.remainingPlays);
        setGameStats(data.data);
      } else {
        console.error("Game stats failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching game stats:", err);
    }
  };

  const handlePlayGame = async (isPaidPlay = false) => {
    try {
      const selectedRewardValue = rewards[Math.floor(Math.random() * rewards.length)].value;
      const data = await playMiniGame("spinwheel", {
        value: selectedRewardValue,
      }, isPaidPlay);
      if (data.success) {
        setMessage(data.message);
        setRemainingPlays(data.remainingPlays);
        setSelectedReward(data.reward);
        await fetchRemainingPlays();
        return data.reward;
      } else {
        console.error("Play game failed:", data.message);
        alert(data.message);
        return null;
      }
    } catch (err) {
      console.error("Error playing game:", err);
      alert("Lỗi khi chơi game: " + err.message);
      return null;
    }
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = wheelRadius;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f0f0f0";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    const sliceAngle = (2 * Math.PI) / rewards.length;

    rewards.forEach((reward, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;

      ctx.fillStyle = reward.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();

      const textAngle = startAngle + sliceAngle / 2;
      const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
      const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = reward.color === "#ffc107" ? "#000" : "#fff";
      ctx.font = "bold 13px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(reward.text, 0, 0);
      ctx.restore();
    });

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#dee2e6";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const handleSpin = async (isPaidPlay = false) => {
    if (isSpinning || remainingPlays === 0) return;

    setIsSpinning(true);
    setSelectedReward(null);
    setMessage("");

    const reward = await handlePlayGame(isPaidPlay);

    if (reward !== null) {
      const canvas = canvasRef.current;
      if (canvas) {
        const sliceAngle = (2 * Math.PI) / rewards.length;
        const spins = 5;
        const randomExtraRotation = Math.random() * sliceAngle;
        const targetRotation = spins * 2 * Math.PI + randomExtraRotation;

        let currentRotation = 0;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / spinDuration, 1);

          const easeProgress = 1 - Math.pow(1 - progress, 3);
          currentRotation = targetRotation * easeProgress;

          canvas.style.transform = `rotate(${currentRotation}rad)`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsSpinning(false);
          }
        };

        requestAnimationFrame(animate);
      }
    } else {
      setIsSpinning(false);
    }
  };

  const freePlayStats = gameStats?.gamePlayStats?.spinwheel || {};
  const canPlayFree = freePlayStats.free < freePlayStats.freeLimit;

  return (
    <div className="spin-wheel-container">
      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="spin-wheel-canvas"
        />
        <button
          className="spin-button"
          onClick={() => handleSpin(false)}
          disabled={isSpinning || remainingPlays === 0 || !canPlayFree}
        >
          {isSpinning ? "Đang quay..." : remainingPlays > 0 && canPlayFree ? "QUAY NGAY" : "Hết lượt chơi"}
        </button>
      </div>

      <div className="spin-info">
        <p>Lượt chơi hôm nay: <strong>{remainingPlays}</strong></p>
        {gameStats && (
          <>
            <p>Lượt miễn phí: {freePlayStats.free}/{freePlayStats.freeLimit}</p>
            <p>Điểm hôm nay: {gameStats.pointsWonToday}/{gameStats.dailyMaxPoints}</p>
          </>
        )}
        {message && <p className="message">{message}</p>}
        {!canPlayFree && remainingPlays > 0 && (
          <button 
            className="btn-buy-play" 
            onClick={() => handleSpin(true)}
            disabled={isSpinning}
          >
            Mua thêm lượt ({gameStats?.pointsPerFreePlay} điểm)
          </button>
        )}
      </div>

      {selectedReward !== null && (
        <div className="reward-modal">
          <div className="reward-content">
            <h2>🎉 Kết quả! 🎉</h2>
            <p className="reward-value">{selectedReward} điểm</p>
            <button
              onClick={() => {
                setSelectedReward(null);
                setMessage("");
              }}
              className="btn-close"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;