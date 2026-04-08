import React, { useRef, useState, useEffect } from "react";
import "./styles/global.css";
import music from "./assets/anu3.mp3";

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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      

      {/* 🔊 Sounds */}
      <audio ref={openAudioRef} src="/open.ogg" />
      <audio ref={audioRef} src="/anu3.mp3" loop />

      {!isUnlocked ? (
        <button
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
          🔐 Enter Password
        </button>
      ) : !showContent ? (
        <h2>Surprise starts in {countdown}... ⏳</h2>
      ) : (
        <div className="photo-section">

          {/* 💖 Background Photos */}
          <div className="bg-gallery">
            <img src="/kaif1.jpeg" alt="" />
            <img src="/kaif4.jpeg" alt="" />
            <img src="/kaif6.jpeg" alt="" />
            <img src="/kaif2.jpeg" alt="" />
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