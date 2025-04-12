import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostModal = ({ onClose }) => {
  const [activeType, setActiveType] = useState(null);
  const navigate = useNavigate();

  const handlePost = () => {
    onClose();
    navigate("/community");
  };

  return (
    <Overlay>
      <ModalBox>
        <Header>
          게시글 작성하기
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        <Line />
        <Body>
          <Section>
            <ToggleWrapper>
              <ToggleButton
                active={activeType === "구직자"}
                onClick={() => setActiveType("구직자")}
              >
                구직자
              </ToggleButton>
              <ToggleButton
                active={activeType === "현직자"}
                onClick={() => setActiveType("현직자")}
              >
                현직자
              </ToggleButton>
            </ToggleWrapper>
          </Section>

          <Section>
            <Label>제목</Label>
            <Input placeholder="제목을 입력하세요" />
          </Section>

          <Section>
            <Label>내용</Label>
            <Textarea placeholder="내용을 입력하세요" />
          </Section>
        </Body>
        <Footer>
          <SubmitButton onClick={handlePost}>POST</SubmitButton>
        </Footer>
      </ModalBox>
    </Overlay>
  );
};

export default PostModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 48px 12px 48px 48px; /* 오른쪽 여백만 줄임 */
`;

const ModalBox = styled.div`
  width: 520px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 96px);
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: 600;
  position: relative;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 12px 0 24px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  height: 44px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0 12px;
`;

const Textarea = styled.textarea`
  height: 140px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  resize: none;
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const ToggleButton = styled.button`
  flex: 1;
  height: 40px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background: ${({ active }) => (active ? '#A099FF' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  font-weight: 600;
  cursor: pointer;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background: #5030e5;
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;
