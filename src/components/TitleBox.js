import React from "react";
import styled from "styled-components";

const TitleBox = ({ title, subtitle }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
};

export default TitleBox;

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  padding: 30px 130px 17px 130px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
  border-radius: 45px;
  background: #a3aaf2;
  text-align: center;
`;

const Title = styled.div`
  font-family: "Noto Serif Tamil";
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const Subtitle = styled.div`
  font-family: Inter;
  font-size: 15px;
  font-weight: 700;
  color: #5030e5;
`;
