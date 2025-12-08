import React, { useState, useEffect } from "react";
import "./MysteryBox.scss";
import { playMiniGame, getUserGameStats } from "../../api/minigame";

function MysteryBox() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [opened, setOpened] = useState(false);
  const [result, setResult] = useState(null);
  const [remainingPlays, setRemainingPlays] = useState(0);
  const [message, setMessage] = useState("");
  const [gameStats, setGameStats] = useState(null);

  const boxes = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const prizes = [
    { label: "20 điểm", value: 20 },
    { label: "100 điểm", value: 100 },
    { label: "40 điểm", value: 40 },
    { label: "300 điểm", value: 300 },
    { label: "Chúc may mắn", value: 0 },
  ];

  useEffect(() => {
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

  const handleSelectBox = (box) => {
    if (opened) return;
    if (remainingPlays === 0) {
      alert("Bạn đã hết lượt chơi hôm nay");
      return;
    }

    const freePlayStats = gameStats?.gamePlayStats?.mysterybox || {};
    const canPlayFree = freePlayStats.free < freePlayStats.freeLimit;
    
    if (!canPlayFree) {
      alert("Bạn đã hết lượt miễn phí. Vui lòng mua thêm lượt chơi.");
      return;
    }

    setSelectedBox(box.id);
    
    setTimeout(async () => {
      await handlePlayGame(box.id);
    }, 800);
  };

  const handlePlayGame = async (boxId, isPaidPlay = false) => {
    try {
      const data = await playMiniGame("mysterybox", { boxId }, isPaidPlay);
      if (data.success) {
        setMessage(data.message);
        setRemainingPlays(data.remainingPlays);
        const serverPrize = prizes.find(p => p.value === data.reward) || prizes[prizes.length - 1];
        setResult(serverPrize);
        setOpened(true);
        await fetchRemainingPlays();
      } else {
        console.error("Play game failed:", data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error("Error playing mystery box:", err);
    }
  };

  const handleReset = () => {
    setSelectedBox(null);
    setOpened(false);
    setResult(null);
    setMessage("");
  };

  const freePlayStats = gameStats?.gamePlayStats?.mysterybox || {};
  const canPlayFree = freePlayStats.free < freePlayStats.freeLimit;

  return (
    <div className="mysterybox-container">
      <h2>Hộp Quà Bí Ẩn</h2>
      <p className="description">Chọn 1 hộp quà và nhận phần thưởng ngẫu nhiên!</p>
      <p className="remaining-plays">Lượt chơi hôm nay: <strong>{remainingPlays}</strong></p>
      {gameStats && (
        <>
          <p className="remaining-plays">Lượt miễn phí: {freePlayStats.free}/{freePlayStats.freeLimit}</p>
          <p className="remaining-plays">Điểm hôm nay: {gameStats.pointsWonToday}/{gameStats.dailyMaxPoints}</p>
        </>
      )}
      {message && <p className="message">{message}</p>}

      <div className="boxes-grid">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`mystery-box ${selectedBox === box.id ? "selected" : ""} ${
              opened && selectedBox === box.id ? "opened" : ""
            }`}
            onClick={() => handleSelectBox(box)}
          >
            {opened && selectedBox === box.id ? (
              <div className="box-content">
                <div className="prize-icon">
                  {result.value > 0 ? "🎁" : "😢"}
                </div>
                <div className="prize-label">{result.label}</div>
              </div>
            ) : (
              <div className="box-icon">📦</div>
            )}
          </div>
        ))}
      </div>

      {opened && (
        <div className="result-panel">
          <h3>
            {result.value > 0 ? "🎉 Chúc mừng!" : "😊 Chúc may mắn lần sau!"}
          </h3>
          <p>
            {result.value > 0
              ? `Bạn nhận được ${result.label}`
              : result.label}
          </p>
          {!canPlayFree && remainingPlays > 0 && (
            <button onClick={() => handlePlayGame(selectedBox, true)} className="btn-buy">
              Mua thêm lượt ({gameStats?.pointsPerFreePlay || 10} điểm)
            </button>
          )}
          <button onClick={handleReset}>Chơi lại</button>
        </div>
      )}
    </div>
  );
}

export default MysteryBox;
