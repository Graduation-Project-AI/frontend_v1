import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TitleBox from "../../components/TitleBox";
import Timer from "../../components/Timer";

function Question() {
  const navigate = useNavigate();
  const [questionIndex, setquestionIndex] = useState(() => {
    const stored = localStorage.getItem("questionIndex");
    return stored ? parseInt(stored) : 0;
  });
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questionList");
    if (storedQuestions) {
      const parsed = JSON.parse(storedQuestions);
      setQuestionList(parsed);
    } else {
      alert("질문 목록을 불러올 수 없습니다.");
      navigate("/home");
    }
  }, [navigate]);

  const handleTimerComplete = () => {
    navigate("/answer");
  };

  if (!questionList.length) return null;
  const currentQuestion = questionList[questionIndex];

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <TitleBox
          title={`${questionIndex + 1}번 질문`}
          subtitle={currentQuestion.qcontent}
        />
        <Text>30초 동안 생각할 시간이 주어집니다.</Text>
        <Timer duration={30} onComplete={handleTimerComplete} />
      </MainContent>
    </Wrapper>
  );
}

export default Question;

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
  gap: 32px;
  background-color: #f9f9f9;
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: 700;
  font-family: Inter, sans-serif;
  color: #5030e5;
`;
