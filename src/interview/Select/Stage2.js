import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import StepIndicatorBar from "../../components/StepIndicatorBar";
import Title from "../../components/SubTitle";
import SubText from "../../components/SubText";
import Button from "../../components/Button";

const jobList = [
  { jobId: 1, job: "frontend" },
  { jobId: 2, job: "backend" },
  { jobId: 3, job: "fullStack" },
  { jobId: 4, job: "mobile" },
  { jobId: 5, job: "data" },
  { jobId: 6, job: "infra" },
  { jobId: 7, job: "system" },
  { jobId: 8, job: "ai" },
];

function Stage2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");
  const [selectjobId, setselectjobId] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectjobId) {
      alert("직군을 선택해 주세요.");
      return;
    }

    const userId = parseInt(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");

    const interviewData = {
      company,
      jobId: parseInt(selectjobId),
      userId,
      resume: [], // 자소서 없이 진행
    };

    try {
      const res = await axios.post("http://localhost:8080/api/interview/start", interviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const interviewId = res.data.interviewId;
      localStorage.setItem("interviewId", interviewId);
      console.log("인터뷰 시작 완료:", interviewId);

      navigate("/questioncount");
    } catch (err) {
      console.error("인터뷰 시작 실패:", err);
      alert("인터뷰 시작 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <StepIndicatorBar currentStep={2} />
        <Title>직군 선택</Title>
        <SubText>지원하는 직군을 선택해주세요.</SubText>

        <FormGroup>
          <Label>직군</Label>
          <Select value={selectjobId} onChange={(e) => setselectjobId(e.target.value)}>
            <option value="">선택하세요</option>
            {jobList.map((job) => (
              <option key={job.jobId} value={job.jobId}>
                {job.job}
              </option>
            ))}
          </Select>
        </FormGroup>

        <Button onClick={handleNext}>Next</Button>
      </MainContent>
    </Wrapper>
  );
}

export default Stage2;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 296px;
`;

const Select = styled.select`
  width: 296px;
  height: 40px;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #cfd4dc;
  border-radius: 6px;
  outline: none;
  background-color: white;
  color: #333;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #333;
`;
