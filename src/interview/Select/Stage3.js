import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import StepIndicatorBar from "../../components/StepIndicatorBar";
import Title from "../../components/SubTitle";
import SubText from "../../components/SubText";
import Button from "../../components/Button";
import ResumeForm from "../../components/ResumeForm";

function Stage3() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const company = queryParams.get("company");
  const jobId = parseInt(queryParams.get("jobId"));
  const userId = parseInt(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");

  const [resumeList, setResumeList] = useState([]);

  const formatInterviewData = () => {
    const resume = resumeList
      .filter((r) => r.question.trim() && r.answer.trim())
      .map((item) => ({
        resumeQuestion: item.question,
        resumeAnswer: item.answer,
      }));

    return {
      company,
      jobId,
      userId,
      resume,
    };
  }
  const handleSubmit = async () => {
    const interviewData = formatInterviewData();
    const hasResume = interviewData.resume.length > 0;
    

    try {
      const res = await axios.post("http://localhost:8080/api/interview/start", interviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("인터뷰 정보전달 완료", res.data);
      const interviewId = res.data.interviewId;
      localStorage.setItem("interviewId", res.data.interviewId); // localStorage에 interviewId 저장

      console.log("interviewId ?? : ", interviewId);
      console.log("hasResume",hasResume);
      
      await new Promise((resolve) => setTimeout(resolve, 400));
      // 만약 자소서가 있다면 → gpt/resume-question 호출 (자소서 기반 질문 생성 후 db 저장)
    
      if (hasResume) {
      await axios.post(`http://localhost:8080/api/gpt/resume-question?interviewId=${interviewId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("자소서 기반 질문 생성 요청 완료");
    }

      navigate("/questioncount");
    } catch (err) {
      console.error("실패:", err);
      alert("인터뷰 시작 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <StepIndicatorBar currentStep={3} />
        <Title>자기소개서</Title>
        <SubText>자기소개서를 입력해 주세요. 미입력 시 자소서 맞춤형 질문이 생성되지 않습니다.</SubText>
        <ResumeForm onChange={setResumeList} />
        <Button onClick={handleSubmit}>Next</Button>
      </MainContent>
    </Wrapper>
  );
}

export default Stage3;
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
