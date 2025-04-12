import React from "react";
import styled from "styled-components";

const StepIndicatorBar = ({ currentStep = 1 }) => {
  return (
    <Bar>
      <Step active={currentStep === 1} />
      <Step active={currentStep === 2} />
    </Bar>
  );
};

export default StepIndicatorBar;

const Bar = styled.div`
  display: flex;
  width: 300px;
  height: 6px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

const Step = styled.div`
  width: 100px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ active }) => (active ? "#495AFF" : "#E0E0E0")};
  transition: background-color 0.3s;
`;
