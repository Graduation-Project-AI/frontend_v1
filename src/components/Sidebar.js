import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { ReactComponent as MenuIcon } from "../assets/menuIcon.svg";
import { ReactComponent as ChatIcon } from "../assets/chatIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/historyIcon.svg";
import { ReactComponent as CommunityIcon } from "../assets/communityIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <MenuList>
        <MenuItem
          active={location.pathname === "/mypage"}
          onClick={() => navigate("/mypage")}
        >
          <MenuIconStyled />
          <MenuText>Home</MenuText>
        </MenuItem>

        <MenuItem
          active={location.pathname.startsWith("/interview")}
          onClick={() => navigate("/interview/stage1")}
        >
          <ChatIconStyled />
          <MenuText>Interview</MenuText>
        </MenuItem>

        <MenuItem
          active={location.pathname.startsWith("/history")}
          onClick={() => navigate("/mypage")}
        >
          <HistoryIconStyled />
          <MenuText>History</MenuText>
        </MenuItem>

        <MenuItem
          active={location.pathname.startsWith("/community")}
          onClick={() => navigate("/community")}
        >
          <CommunityIconStyled />
          <MenuText>Community</MenuText>
        </MenuItem>

        
      </MenuList>
    </Container>
  );
};

const Container = styled.div`
  width: 286px;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
`;

const LogoWrapper = styled.div`
  margin-bottom: 40px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  border-radius: 6px;
  background: ${({ active }) => (active ? "rgba(80, 48, 229, 0.08)" : "transparent")};
  cursor: pointer;
`;

const MenuText = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #787486;
`;

const MenuIconStyled = styled(MenuIcon)`
  width: 32.467px;
  height: 27.991px;
`;

const ChatIconStyled = styled(ChatIcon)`
  width: 32.467px;
  height: 27.991px;
`;

const HistoryIconStyled = styled(HistoryIcon)`
  width: 32.467px;
  height: 27.991px;
`;

const CommunityIconStyled = styled(CommunityIcon)`
  width: 32.467px;
  height: 27.991px;
`;

export default Sidebar;
