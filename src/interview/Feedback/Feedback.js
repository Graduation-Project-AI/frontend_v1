import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function Feedback() {
  const navigate = useNavigate(); 
  const [questionRating, setQuestionRating] = useState(0);
  const [feedbackRating, setFeedbackRating] = useState(0);

  const handleQuestionRate = (index) => setQuestionRating(index);
  const handleFeedbackRate = (index) => setFeedbackRating(index);
  const handleFinish = async () => {
    const interviewId = parseInt(localStorage.getItem("interviewId"));
  
    const payload = {
      interviewId,
      qScore: questionRating,
      aiScore: feedbackRating,
    };
  
    try {
      await axios.post("http://localhost:8080/api/feedback/submit", payload);
      navigate("/mypage");
    } catch (err) {
      console.error("피드백 저장 실패:", err);
      alert("피드백 저장에 실패했습니다.");
    }
  };
  
  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <ResultBox>
          <strong>인터뷰가 종료되었습니다.</strong>
          <SubText>아래 만족도 평가를 진행해 주세요.</SubText>
        </ResultBox>

        <Section>
          <Label>질문 만족도를 선택하세요</Label>
          <Stars>
            {[1, 2, 3, 4, 5].map((i) => (
              <StyledStar
                key={i}
                size={40}
                onClick={() => handleQuestionRate(i)}
                selected={i <= questionRating}
              />
            ))}
          </Stars>
        </Section>

        <Section>
          <Label>답변에 대한 피드백 만족도를 선택하세요</Label>
          <Stars>
            {[1, 2, 3, 4, 5].map((i) => (
              <StyledStar
                key={i}
                size={40}
                onClick={() => handleFeedbackRate(i)}
                selected={i <= feedbackRating}
              />
            ))}
          </Stars>
        </Section>
        <FinishButton onClick={handleFinish}>종료</FinishButton>
      </MainContent>
    </Wrapper>
  );
}

export default Feedback;

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
  gap: 40px;
  background-color: #f9f9f9;
`;

const ResultBox = styled.div`
  padding: 20px 60px;
  border-radius: 30px;
  background-color: #e6e6e6;
  text-align: center;
  font-size: 16px;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 6px;
`;

const Section = styled.div`
  text-align: center;
`;

const Label = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Stars = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const StyledStar = styled(FaStar)`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#A3AAF2" : "#e0e0e0")};
  transition: color 0.2s;

  &:hover {
    color: #a3aaf2;
  }
`;
const FinishButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  background-color: #5030e5;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;