import React from "react";
import styled from "styled-components";

const ResumeFormItem = ({ index, question, answer, onChange }) => {
  return (
    <ItemWrapper>
      <Label>{index + 1}번 문항</Label>
      <StyledInput
        placeholder="Enter"
        value={question}
        onChange={(e) => onChange(index, "question", e.target.value)}
      />
      <Label>{index + 1}번 답안</Label>
      <StyledTextarea
        placeholder="Enter"
        value={answer}
        onChange={(e) => onChange(index, "answer", e.target.value)}
      />
    </ItemWrapper>
  );
};

export default ResumeFormItem;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 480px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #cfd4dc;
  border-radius: 4px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 14px;
  resize: none;
  border: 1px solid #cfd4dc;
  border-radius: 4px;
  line-height: 1.4;
`;