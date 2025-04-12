import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interviewId = localStorage.getItem("interviewId");

    const startAnalysisFlow = async () => {
      try {
        // 1. 답변이 준비될 때까지 대기
        let answerList = [];
        let retryCount = 0;
        while (retryCount < 10) { // 최대 10번(10초) 대기
          const answerRes = await axios.get(`http://localhost:8080/api/answers/interview/${interviewId}`);
          answerList = answerRes.data;
          if (answerList.length > 0) break;
          await new Promise((res) => setTimeout(res, 1000));
          retryCount++;
        }

        if (answerList.length === 0) throw new Error("답변이 등록되지 않았습니다.");
        localStorage.setItem("answerList", JSON.stringify(answerList));

        // 2. 분석 요청 (POST)
        if (!localStorage.getItem("analyzeRequested")) {
          await axios.post(`http://localhost:8080/api/gpt/analyze/${interviewId}`);
          localStorage.setItem("analyzeRequested", "true");
        }
        // 3. 분석 결과가 준비될 때까지 폴링
        const pollInterval = setInterval(async () => {
          try {
            const analyzeRes = await axios.get(`http://localhost:8080/api/gpt/analyze/${interviewId}`);
            if (analyzeRes.data && analyzeRes.data.length > 0) {
              clearInterval(pollInterval);
              localStorage.setItem("analyzeResult", JSON.stringify(analyzeRes.data));
              console.log("분석 결과 저장 완료");
              navigate("/result");
            }
          } catch (e) {
            console.log("분석 결과 대기 중...");
          }
        }, 1000);
      } catch (err) {
        alert("분석 중 오류가 발생했습니다.");
        console.error(err);
      }
    };

    startAnalysisFlow();
  }, [navigate]);

  return (
    <Container>
      <Spinner />
      <Text>AI 분석 중입니다...</Text>
    </Container>
  );
};

export default Loading;

// 스타일 컴포넌트
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #cfcdfc;
  border-top: 6px solid #9f95f9;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #111;
`;
