import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSvg  } from "../assets/colorfilter.svg"; 

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon />
      <Title>AI 면접 TUTOR</Title>
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 168px;
  height: 28px;
  flex-shrink: 0;
  gap: 8px;
`;

const LogoIcon = styled(LogoSvg )`
  width: 32.467px;
  height: 27.991px;
  flex-shrink: 0;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  font-family: "Noto Sans", sans-serif;
`;
