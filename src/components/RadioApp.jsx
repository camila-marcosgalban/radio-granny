import React, { useRef, useState, useEffect } from "react";
import "./RadioApp.css";

const stations = [
  {
    name: "mitre",
    url: "http://cdn.instream.audio:9288/stream",
    image: "https://yt3.googleusercontent.com/LxXG-3oOpCykA27GwVGpcrWDmfe1KVvTy_69EjBBCkpUAtTjJhNGWmW0WVubfZjOEP8JQ5FO=s900-c-k-c0x00ffffff-no-rj"
  },{
    name: "2x4",
    url: "https://media.radios.ar:9270/",
    image: "https://myradioenvivo.ar/public/uploads/radio_img/la-2x4/play_250_250.webp"
  }
];

function RadioApp() {

  const [deferredPrompt, setDeferredPrompt] = useState(null);

useEffect(() => {
  const handler = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };
  window.addEventListener("beforeinstallprompt", handler);
  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);


  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStation = stations[currentIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => alert("Could not play audio."));
    }
    setIsPlaying(!isPlaying);
  };

  const changeStation = (direction) => {
    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % stations.length;
    } else {
      nextIndex = (currentIndex - 1 + stations.length) % stations.length;
    }
    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play().catch(() => alert("Could not play audio."));
      setIsPlaying(true);
    }, 100);
  };

  return (
   <div className="radio-card">
    {deferredPrompt && (
  <button
    className="install-button"
    onClick={() => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }}
  >
    Install App
  </button>
)}

  <div className={`disc-container ${isPlaying ? "spin" : ""}`}>
    <img src={currentStation.image} alt="cover" className="cover-image" />
  </div>

  <div className="station-info">
    <h2>{currentStation.name}</h2>
    <h1>RADIO GRANNY</h1>
  </div>

  <audio ref={audioRef} src={currentStation.url} hidden />

  <div className="controls">
    <button onClick={() => changeStation("prev")} className="nav-button">⏮</button>
    <button onClick={togglePlay} className="play-button">{isPlaying ? "❚❚" : "▶"}</button>
    <button onClick={() => changeStation("next")} className="nav-button">⏭</button>
  </div>
</div>

  );
}

export default RadioApp;
