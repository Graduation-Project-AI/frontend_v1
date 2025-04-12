import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/SubTitle";
import SubText from "../../components/SubText";
import Button from "../../components/Button";

function QuestionCount() {
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(null);
  const interviewId = localStorage.getItem("interviewId");
  const token = localStorage.getItem("token");

  const handleNext = async () => {
    if (!selectedCount) {
      alert("질문 개수를 선택해주세요.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8080/api/question/list", {
        params: {
          interviewId,
          count: selectedCount,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

      const questionList = response.data;
      console.log("question LIST : ",questionList);
      localStorage.setItem("questionList", JSON.stringify(questionList)); // query list를 local storage에 저장

    navigate("/tutorial");
    }catch(err){
      console.error("질문 전달 실패", err);
      alert("오류 발생!!");
    }
  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <Title>연습할 질문 개수 선택</Title>
        <SubText>대답할 질문의 개수를 골라주세요.</SubText>

        <ButtonGroup>
          {[3, 5, 7].map((count) => (
            <CountButton
              key={count}
              selected={selectedCount === count}
              onClick={() => setSelectedCount(count)}
            >
              {count}개
            </CountButton>
          ))}
        </ButtonGroup>

        <Button style={{ width: "240px" }} onClick={handleNext}>
          Next
        </Button>
      </MainContent>
    </Wrapper>
  );
}

export default QuestionCount;
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 24px;
  background-color: #f9f9f9;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
`;

const CountButton = styled.button`
  width: 240px;
  height: 42px;
  border: none;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? "#495AFF" : "#AEBDFC")};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#3b4ee5" : "#92a9f8")};
  }
`;

