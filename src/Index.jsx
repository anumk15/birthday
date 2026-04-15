import React, { useRef, useState, useEffect } from "react";
import "./styles/global.css";

const App = () => {
  const audioRef = useRef(null);
  const openAudioRef = useRef(null);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countdown, setCountdown] = useState(12);
  const [showContent, setShowContent] = useState(false);

  // 🔐 Password Handler
  const handlePassword = () => {
    const pass = prompt("Enter Secret Code 🔐");

    if (!pass) return;

    const formattedPass = pass.toLowerCase().trim();

    if (formattedPass === "lv u anu") {
      setIsUnlocked(true);

      // 🎵 Background music
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.volume = 0.6;
          audioRef.current.play().catch(() => {});
        }
      }, 1000);
    } else {
      alert("Wrong Password ❌");
    }
  };

  // ⏳ Countdown Logic
  useEffect(() => {
    let timer;

    if (isUnlocked && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0 && isUnlocked) {
      setShowContent(true);
    }

    return () => clearTimeout(timer);
  }, [isUnlocked, countdown]);

  return (
    <div>

      {/* 🔊 Sounds */}
      <audio ref={openAudioRef} src="/birthday/open.ogg" />
      <audio ref={audioRef} src="/birthday/anu3.mp3" loop />

      {/* 🔐 STEP 1: Unlock Screen */}
      {!isUnlocked ? (
        <div className="unlock-screen">
          <div className="unlock-card">
            <h1 className="title">💖 Special Surprise 💖</h1>
            <p className="subtitle">Only for someone special...</p>

            <button
              className="unlock-btn"
              onClick={() => {
                if (openAudioRef.current) {
                  openAudioRef.current.currentTime = 0;
                  openAudioRef.current.play().catch(() => {});
                }

                setTimeout(() => {
                  handlePassword();
                }, 500);
              }}
            >
              🔐 Unlock My Heart
            </button>
          </div>
        </div>

      ) : !showContent ? (

        /* ⏳ STEP 2: Countdown Screen */
        <div className="countdown-screen">

          {/* 💖 Hearts */}
          <div className="hearts-container">
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
            <div className="heart"></div>
          </div>

          {/* ✨ Countdown Card */}
          <div className="countdown-card">
            <h1 className="count-title">💓 Get Ready 💓</h1>
            <h2 className="count-number">{countdown}</h2>
            <p className="count-text">Your surprise is loading...</p>
          </div>
        </div>

      ) : (

        /* 🎂 STEP 3: Final Content */
        <div className="photo-section">

          {/* 📸 Gallery */}
          <div className="bg-gallery">
            <img src="/birthday/kaif1.jpeg" alt="" />
            <img src="/birthday/kaif4.jpeg" alt="" />
            <img src="/birthday/kaif6.jpeg" alt="" />
            <img src="/birthday/kaif2.jpeg" alt="" />
          </div>

          {/* 💌 Message */}
          <div className="message-box">
            <p className="love-text">
              You are my ❤️ forever <br />
              Happy Birthday My Love 🎂💖
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;