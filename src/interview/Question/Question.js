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
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questionList");
    if (storedQuestions) {
      const parsed = JSON.parse(storedQuestions);
      setQuestionList(parsed);
    } else {
      alert("질문 목록을 불러올 수 없습니다.");
      navigate("/home");
    }

    // 질문에 대한 답변 준비 시간이 너무 길다는 사용자 피드백 반영 -> 5초 후 스킵할 수 있는 버튼 만듦.
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);


  const handleTimerComplete = () => {
    navigate("/answer");
  };
  const handleAnswerClick = () => {
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
        {showButton && (
          <ButtonWrapper>
          <AnswerButton style={{ visibility: showButton ? "visible" : "hidden" }} onClick={handleAnswerClick}>
            답변하기
          </AnswerButton>
          </ButtonWrapper>

        )}
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

const ButtonWrapper = styled.div`
  height: 40px; 
`;

const Text = styled.p`
  font-size: 13px;
  font-weight: 700;
  font-family: Inter, sans-serif;
  color: #5030e5;
`;

const AnswerButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: #5030e5;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;