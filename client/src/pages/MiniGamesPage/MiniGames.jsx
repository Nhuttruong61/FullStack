import React, { useEffect, useState } from "react";
import { getPublicSettings } from "../../api/settings";
import { getUserGameStats } from "../../api/minigame";
import SpinWheel from "../../componets/MiniGames/SpinWheel";
import ScratchCard from "../../componets/MiniGames/ScratchCard";
import MysteryBox from "../../componets/MiniGames/MysteryBox";
import "./MiniGames.scss";

function MiniGames() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [gameStats, setGameStats] = useState(null);

  useEffect(() => {
    fetchSettings();
    fetchGameStats();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getPublicSettings();    
      if (response.success) {
        setSettings(response.data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGameStats = async () => {
    try {
      const response = await getUserGameStats();
      if (response.success) {
        setGameStats(response.data);
      }
    } catch (err) {
      console.error("Error fetching game stats:", err);
    }
  };

  if (loading) {
    return <div className="minigames-loading">Đang tải...</div>;
  }

  const isMiniGamesEnabled = settings?.features?.miniGames?.enabled !== false;

  if (!isMiniGamesEnabled) {
    return (
      <div className="minigames-disabled">
        <h2>Mini Games hiện không khả dụng</h2>
        <p>Vui lòng quay lại sau.</p>
      </div>
    );
  }

  const games = [
    {
      id: "spinwheel",
      name: "Vòng quay may mắn",
      icon: "🎡",
      enabled: settings?.miniGames?.spinWheelEnabled !== false,
      component: SpinWheel,
    },
    {
      id: "scratchcard",
      name: "Cào thẻ trúng thưởng",
      icon: "🎫",
      enabled: settings?.miniGames?.scratchCardEnabled !== false,
      component: ScratchCard,
    },
    {
      id: "mysterybox",
      name: "Hộp quà bí ẩn",
      icon: "🎁",
      enabled: settings?.miniGames?.mysteryBoxEnabled !== false,
      component: MysteryBox,
    },
  ];

  const enabledGames = games.filter((game) => game.enabled);

  return (
    <div className="minigames-container">
      {!activeGame && (
        <div className="minigames-header">
          <h1>Mini Games</h1>
          <p>Chơi game và nhận thưởng mỗi ngày!</p>
          <div className="stats-row">
            <div className="stat-badge">
              Điểm hiện tại: <strong>{gameStats?.totalPoints || 0}</strong>
            </div>
            <div className="stat-badge">
              Lượt chơi hôm nay: <strong>{gameStats?.remainingPlays || 0} lượt</strong>
            </div>
          </div>
        </div>
      )}

      {activeGame ? (
        <div className="game-active">
          <button 
            className="btn-back" 
            onClick={() => {
              setActiveGame(null);
              fetchGameStats();
            }}
          >
            ← Quay lại
          </button>
          {React.createElement(
            games.find((g) => g.id === activeGame)?.component,
            { settings, onGameComplete: fetchGameStats }
          )}
        </div>
      ) : (
        <div className="games-grid">
          {enabledGames.length > 0 ? (
            enabledGames.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => setActiveGame(game.id)}
              >
                <div className="game-icon">{game.icon}</div>
                <h3>{game.name}</h3>
                <button className="btn-play">Chơi ngay</button>
              </div>
            ))
          ) : (
            <div className="no-games">
              <p>Hiện không có trò chơi nào khả dụng</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MiniGames;
