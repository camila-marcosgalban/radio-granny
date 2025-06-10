import React, { useRef, useState, useEffect } from "react";
import "./RadioApp.css";

const stations = [
  {
    name: "99.9",
    url: "http://buecrplb01.cienradios.com.ar/la100.aac",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Logo_La100_Verde.JPG"
  },
  {
    name: "100.7",
    url: "https://26593.live.streamtheworld.com/BLUE_FM_100_7AAC.aac",
    image: "https://myradioenvivo.ar/public/uploads/radio_img/blue-fm-100-7/play_250_250.webp"
  },
  {
    name: "102.3",
    url: "https://27403.live.streamtheworld.com/ASPEN.mp3",
    image: "https://myradioenvivo.ar/public/uploads/radio_img/aspen-102-3/fb_cover.jpg"
  }
];

function RadioApp() {
  const audioRef = useRef(null);
  const [currentStation, setCurrentStation] = useState(stations[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => alert("Could not play audio."));
    }
    setIsPlaying(!isPlaying);
  };

  const changeStation = (station) => {
    setCurrentStation(station);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play().catch(() => alert("Could not play audio."));
      setIsPlaying(true);
    }, 100);
  };

  return (
    <div className="radio-card">
      <div className={`disc-container ${isPlaying ? "spin" : ""}`}>        
        <img src={currentStation.image} alt="cover" className="cover-image" />
      </div>
      <div className="station-info">
        <h2>{currentStation.name}</h2>
        <h1>RADIO GRANNY</h1>
      </div>
      <audio ref={audioRef} src={currentStation.url} hidden />
      <div className="controls">
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <div className="station-buttons">
          {stations.map((s) => (
            <button
              key={s.name}
              onClick={() => changeStation(s)}
              className={`station-btn ${s.name === currentStation.name ? "active" : ""}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RadioApp;
