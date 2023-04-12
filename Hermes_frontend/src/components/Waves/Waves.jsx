import React from "react";
import Wave from "react-wavify";
import "./Waves.css";

const Waves = () => {
  return (
    <div>
      <div className="WaveContainer" style={{ height: "100vh" }}>
        <Wave
          fill="#03a1fc"
          paused={false}
          opacity="0.30"
          options={{
            height: 20,
            amplitude: 10,
            speed: 0.2,
            points: 3,
          }}
        />
      </div>
      <div className="WaveContainer" style={{ height: "100vh" }}>
        <Wave
          fill="#03a1fc"
          opacity="0.80"
          paused={false}
          options={{
            height: 75,
            amplitude: 20,
            speed: 0.3,
            points: 2,
          }}
        />
      </div>
      <div className="WaveContainer" style={{ height: "100vh" }}>
        <Wave
          fill="#03a1fc"
          paused={false}
          opacity="0.5"
          options={{
            height: 45,
            amplitude: 30,
            speed: 0.1,
            points: 4,
          }}
        />
      </div>
    </div>
  );
};

export default Waves;
