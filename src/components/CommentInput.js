import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SelectIcon } from "../assets/select.svg";

const CommentInput = () => {
  const [isCurrentWorker, setIsCurrentWorker] = useState(false);

  return (
    <Container>
      <Input placeholder="댓글달기" />
      <ToggleButton
        active={isCurrentWorker}
        onClick={() => setIsCurrentWorker((prev) => !prev)}
      >
        {!isCurrentWorker && <SelectIconWrapper position="left"><SelectIcon /></SelectIconWrapper>}
        <ToggleText>{isCurrentWorker ? "현직자" : "구직자"}</ToggleText>
        {isCurrentWorker && <SelectIconWrapper position="right"><SelectIcon /></SelectIconWrapper>}
      </ToggleButton>
    </Container>
  );
};

export default CommentInput;

const Container = styled.div`
  border-radius: 10px;
  border: 2px solid #787486;
  background: #fff;
  display: flex;
  width: 700px;
  height: 60px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;
/*Container width 위에꺼랑 맞게 수정해야할듯 */
const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  flex: 1;
`;

const ToggleButton = styled.button`
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 15px;
  background: ${({ active }) => active ? 'rgba(160, 153, 255, 0.59)' : '#D9D9D9'};
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => active ? 'flex-end' : 'flex-start'};
  padding: 0 10px;
  gap: 8px;
  border: none;
  cursor: pointer;
`;

const ToggleText = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin: 0 2px;
`;

const SelectIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
