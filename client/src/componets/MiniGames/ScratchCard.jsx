import React, { useState, useRef, useEffect } from "react";
import "./ScratchCard.scss";
import { playMiniGame, getUserGameStats } from "../../api/minigame";

function ScratchCard() {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [remainingPlays, setRemainingPlays] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStats, setGameStats] = useState(null);

  const prizes = [
    { label: "50 điểm", value: 50 },
    { label: "100 điểm", value: 100 },
    { label: "15 điểm", value: 15 },
    { label: "25 điểm", value: 25 },
    { label: "75 điểm", value: 75 },
    { label: "Chúc may mắn lần sau", value: 0 },
  ];

  useEffect(() => {
    initCanvas();
    fetchRemainingPlays();
  }, []);

  const fetchRemainingPlays = async () => {
    try {
      const data = await getUserGameStats();
      if (data.success) {
        setRemainingPlays(data.data.remainingPlays);
        setGameStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching game stats:", err);
    }
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 250;

    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#888";
    ctx.textAlign = "center";
    ctx.fillText("Cào để xem phần thưởng", canvas.width / 2, canvas.height / 2);
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    const mouseX = x - rect.left;
    const mouseY = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 20, 0, 2 * Math.PI);
    ctx.fill();

    checkScratchedArea();
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);
  
  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isScratching) return;
    e.preventDefault();
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const checkScratchedArea = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }

    const percentage = (transparent / (canvas.width * canvas.height)) * 100;
    setScratchedPercentage(percentage);

    if (percentage > 50 && !revealed) {
      setRevealed(true);
      handlePlayGame();
    }
  };

  const handlePlayGame = async (isPaidPlay = false) => {
    if (remainingPlays === 0) {
      alert("Bạn đã hết lượt chơi hôm nay");
      return;
    }

    const freePlayStats = gameStats?.gamePlayStats?.scratchcard || {};
    const canPlayFree = freePlayStats.free < freePlayStats.freeLimit;
    
    if (!canPlayFree && !isPaidPlay) {
      alert("Bạn đã hết lượt miễn phí. Vui lòng mua thêm lượt chơi.");
      return;
    }

    try {
      const data = await playMiniGame("scratchcard", {}, isPaidPlay);
      
      if (data.success) {
        setMessage(data.message);
        setRemainingPlays(data.remainingPlays);
        const serverPrize = prizes.find(p => p.value === data.reward) || prizes[prizes.length - 1];
        setPrize(serverPrize);
        await fetchRemainingPlays();
      } else {
        console.error("Play game failed:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error("Error playing scratch card:", err);
    }
  };

  const handleReset = () => {
    setRevealed(false);
    setScratchedPercentage(0);
    setIsScratching(false);
    setMessage("");
    setPrize(null);
    initCanvas();
  };

  const freePlayStats = gameStats?.gamePlayStats?.scratchcard || {};
  const canPlayFree = freePlayStats.free < freePlayStats.freeLimit;

  return (
    <div className="scratchcard-container">
      <h2>Cào Thẻ Trúng Thưởng</h2>
      <p className="description">Cào để khám phá phần thưởng của bạn!</p>
      <p className="remaining-plays">Lượt chơi hôm nay: <strong>{remainingPlays}</strong></p>
      {gameStats && (
        <>
          <p className="remaining-plays">Lượt miễn phí: {freePlayStats.free}/{freePlayStats.freeLimit}</p>
          <p className="remaining-plays">Điểm hôm nay: {gameStats.pointsWonToday}/{gameStats.dailyMaxPoints}</p>
        </>
      )}
      {message && <p className="message">{message}</p>}

      <div className="card-wrapper">
        <div className="prize-background">
          {prize ? (
            <>
              <div className="prize-icon">🎁</div>
              <div className="prize-text">{prize.label}</div>
            </>
          ) : (
            <>
              <div className="prize-icon">❓</div>
              <div className="prize-text">Cào để khám phá</div>
            </>
          )}
        </div>
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        />
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${scratchedPercentage}%` }} />
      </div>
      <p className="progress-text">Đã cào: {scratchedPercentage.toFixed(0)}%</p>

      {revealed && prize && (
        <div className="result-panel">
          <h3>🎉 Chúc mừng!</h3>
          <p>{prize.label}</p>
          {!canPlayFree && remainingPlays > 0 && (
            <button onClick={() => handlePlayGame(true)} className="btn-buy">
              Mua thêm lượt ({gameStats?.pointsPerFreePlay || 10} điểm)
            </button>
          )}
          <button onClick={handleReset}>Chơi lại</button>
        </div>
      )}
    </div>
  );
}

export default ScratchCard;
