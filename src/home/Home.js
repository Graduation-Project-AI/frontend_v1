import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.clear();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    if (token && userId) {
      // 이미 로그인된 상태 : 정보출력 및 이동
      console.log("이미 로그인됨");
      console.log("token:", token);
      console.log("userId:", userId);
      console.log("name : ", name);
      navigate("/interview/stage1");
    } else {
      // 로그인 필요한 상태 : 백엔드 로그인 URL로 이동
      window.location.href = "http://localhost:8080/auth/kakao/login";
    }
  };
  return (
    <Wrapper>
      <Title>AI 면접 TUTOR</Title>
      <SubText>로그인 후 서비스를 이용해 주세요</SubText>
      <LoginImageButton
    src={require("../assets/kakaologinbtn.png")}
    alt="카카오로 로그인"
    onClick={handleLogin}
  />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  color: #5030e5;
  font-family: "Noto Sans", sans-serif;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const SubText = styled.p`
  color: #000;
  font-family: "Noto Sans", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const LoginImageButton = styled.img`
  width: 350px;
  height: auto;
  cursor: pointer;
`;
