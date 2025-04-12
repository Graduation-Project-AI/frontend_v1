import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import StepIndicatorBar from "../../components/StepIndicatorBar";
import Title from "../../components/SubTitle";
import SubText from "../../components/SubText";
import Button from "../../components/Button";

const jobList = [ // 나중에 백엔드 Field table로 바꾸기
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

  const handleNext = () => {
    if (!selectjobId) {
      alert("직군을 선택해해주세요.");
      return;
    }
    console.log("company:", company);
    console.log("jobId:", selectjobId);
    navigate(`/interview/stage3?company=${encodeURIComponent(company)}&jobId=${selectjobId}`); // 쿼리파라미터로 회사, 직군 정보 전달

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
