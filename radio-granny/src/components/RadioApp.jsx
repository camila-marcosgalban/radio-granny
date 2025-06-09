import React, { useRef, useState } from "react";

const stations = [
  { name: "MITRE", url: "https://24423.live.streamtheworld.com/AM790_56.mp3" },
  { name: "ASPEN", url: "https://27403.live.streamtheworld.com/ASPEN.mp3" }
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
    <div style={{ textAlign: "center", fontSize: "20px", padding: "40px" }}>
      <h2>{currentStation.name}</h2>
      <audio ref={audioRef} src={currentStation.url} controls style={{ display: "none" }} />
      <button onClick={togglePlay} style={{ fontSize: "24px", padding: "10px 20px" }}>
        {isPlaying ? "⏸ Pause" : "▶️ Play"}
      </button>
      <div style={{ marginTop: "30px" }}>
        {stations.map((s) => (
          <button
            key={s.name}
            onClick={() => changeStation(s)}
            style={{
              fontSize: "18px",
              padding: "10px",
              margin: "10px",
              backgroundColor: s.name === currentStation.name ? "#806baf" : "#9977a0"
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RadioApp;
