import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ResumeFormItem from "./ResumeFormItem"; // 자소서 입력 폼 하나

const ResumeForm = ({onChange}) => {
  const [questions, setQuestions] = useState([{ id: 1, question: "", answer: "" }]);
  useEffect(() => {
    onChange(questions);
  }, [questions, onChange]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: "",
        answer: "",
      },
    ]);
  };

  return (
    <Wrapper>
      {questions.map((item, index) => (
        <ResumeFormItem
          key={item.id}
          index={index}
          question={item.question}
          answer={item.answer}
          onChange={handleChange}
        />
      ))}

      <AddButton onClick={addQuestion}>문항 추가</AddButton>
    </Wrapper>
  );
};

export default ResumeForm;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const AddButton = styled.button`
  width: 480px;
  height: 42px;
  background-color: #aebdfc;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #92a9f8;
  }
`;