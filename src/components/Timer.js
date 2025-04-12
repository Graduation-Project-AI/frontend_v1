import React, { useEffect, useState } from "react";
import styled from "styled-components";

const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const Timer = ({ duration = 30, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = (timeLeft / duration) * CIRCUMFERENCE;

  return (
    <Wrapper>
      <SVG viewBox="0 0 300 300">
        <CircleBackground cx="150" cy="150" r={RADIUS} />
        <CircleProgress
          cx="150"
          cy="150"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE - progress}
        />
      </SVG>
      <TimeText>{typeof timeLeft === "number" && duration >= 60 ? formatTime(timeLeft) : timeLeft}</TimeText>
    </Wrapper>
  );
};



export default Timer;
// ⏱ 2:00 형식으로 출력 (선택적)
const formatTime = (sec) => {
  const min = Math.floor(sec / 60);
  const rem = sec % 60;
  return `${min}:${rem < 10 ? "0" : ""}${rem}`;
};
const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: #e6e6e6;
  stroke-width: 8;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: #5030e5;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
`;

const TimeText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Manrope", sans-serif;
  font-size: 64px;
  font-weight: 300;
  color: #a099ff;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
`;
