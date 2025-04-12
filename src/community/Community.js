import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import PostModal from "../components/PostModal";
import Sidebar from "../components/Sidebar";

const Community = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();

    const posts = {
        "4월 9일": [
            "제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다.",
            "제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다."
        ],
        "4월 8일": [
            "제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다.",
            "제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다. 제목 들어갑니다."
        ]
    };

    const handlePostClick = (date, index) => {
        setSelectedPost(`${date}-${index}`);
        navigate("/post");
    };

    return (
        <PageLayout>
            <Sidebar />
            <ContentWrapper>
                <InnerContainer>
                    <Title>Community</Title>
                    {Object.entries(posts).map(([date, list], idx) => (
                        <DateSection key={idx}>
                            <DateLabel>{date}</DateLabel>
                            <Line />
                            {list.map((content, i) => {
                                const isSelected = selectedPost === `${date}-${i}`;
                                return (
                                    <Post
                                        key={i}
                                        onClick={() => handlePostClick(date, i)}
                                        selected={isSelected}
                                    >
                                        <PostHeader>
                                            <span>익명</span>
                                            <UserIconStyled />
                                        </PostHeader>
                                        <PostContent>{content}</PostContent>
                                    </Post>
                                );
                            })}
                        </DateSection>
                    ))}
                    <FinalLine />
                </InnerContainer>
                <WriteButton onClick={() => setShowModal(true)}>글쓰기</WriteButton>
                {showModal && <PostModal onClose={() => setShowModal(false)} />}
            </ContentWrapper>
        </PageLayout>
    );
};

export default Community;

const PageLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const DateSection = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const DateLabel = styled.div`
  display: flex;
  width: 100px;
  height: 28px;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #A099FF;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 16px;
`;

const FinalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  margin-top: 16px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  color: #000;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 142%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? "#F1EFFD" : "transparent")};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f1effd;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const UserIconStyled = styled(UserIcon)`
  width: 14px;
  height: 14px;
`;

const PostContent = styled.p`
  margin: 0;
`;

const WriteButton = styled.button`
  position: fixed;
  right: 40px;
  bottom: 24px;
  display: flex;
  width: 140px;
  height: 44px;
  padding: 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: rgba(160, 153, 255, 0.4);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
