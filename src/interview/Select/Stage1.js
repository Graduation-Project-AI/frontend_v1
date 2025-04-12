import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import StepIndicatorBar from "../../components/StepIndicatorBar";
import Title from "../../components/SubTitle";
import SubText from "../../components/SubText";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";

function Stage1() {
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const handleNext = () => {
    if (!company) {
      alert("회사명을 입력해주세요.");
      return;
    }
    navigate(`/interview/stage2?company=${encodeURIComponent(company)}`); // 쿼리파라미터로 회사 정보 전달

  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <StepIndicatorBar currentStep={1} />
        <Title>기업 선택</Title>
        <SubText>지원하는 기업을 입력해주세요.</SubText>
        <InputBox
          label="회사명"
          placeholder="Enter"
          value={company}
          onChange={setCompany}
        />
        <Button onClick={handleNext}>Next</Button>
      </MainContent>
    </Wrapper>
  );
}

export default Stage1;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  gap: 32px;
  flex: 1;
  background-color: #f9f9f9;
  overflow-y: auto;
`;


