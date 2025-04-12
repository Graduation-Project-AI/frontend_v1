import React from "react";
import styled from "styled-components";

const InputBox = ({ label, placeholder, value, onChange }) => {
  return (
    <Group>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Group>
  );
};

export default InputBox;

const Group = styled.div`
  display: flex;
  width: 296px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Label = styled.label`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 296px;
  height: 40px;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
`;
