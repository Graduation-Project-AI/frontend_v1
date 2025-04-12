import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";

function Tutorial() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/question");
    console.log("면접 시작!");
  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <MicAlert>🎤 마이크가 켜져 있는 지 확인해주세요</MicAlert>

        <Text>
          지금부터 주어지는 질문에 답변해주세요. <br />
          <Highlight>답변 제한시간은 2분 입니다.</Highlight> <br />
          질문이 주어지고 <Highlight>30초의 생각할 시간</Highlight>이 주어집니다. <br />
          열심히 답변해주세요! <br />
          답변 내용은 <Highlight>AI가 분석 후 평가</Highlight>합니다.
        </Text>

        <StartNotice>
          <Highlight>Start 버튼을 누르면 면접이 시작됩니다.</Highlight>
        </StartNotice>

        <StyledButton onClick={handleStart}>Start</StyledButton>
      </MainContent>
    </Wrapper>
  );
}

export default Tutorial;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  background-color: #f9f9f9;
`;

const MicAlert = styled.div`
  padding: 10px 18px;
  border: 2px solid red;
  border-radius: 12px;
  background-color: #fff3f3;
  font-size: 16px;
  font-weight: 600;
  color: red;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 1.7;
  max-width: 600px;
`;

const StartNotice = styled.p`
  font-size: 16px;
  text-align: center;
`;

const Highlight = styled.span`
  color: #5030e5;
  font-weight: 700;
`;

const StyledButton = styled(Button)`
  width: 240px;
`;
