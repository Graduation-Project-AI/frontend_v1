import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { ReactComponent as SelectIcon } from "../assets/select.svg";
import CommentInput from "../components/CommentInput";
import PostModal from "../components/PostModal";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    navigate("/community");
  };

  return (
    <PageLayout>
      <Sidebar />
      <ContentWrapper>
        <BackButton onClick={() => navigate("/community")}>← 뒤로가기</BackButton>
        <Top>
          <DateLabel>4월 9일</DateLabel>
          <ButtonGroup>
            <EditButton onClick={() => setIsEditing(true)}>수정하기</EditButton>
            <DeleteButton onClick={() => setShowDeleteConfirm(true)}>삭제하기</DeleteButton>
          </ButtonGroup>
        </Top>

        <PostBox>
          <PostHeader>
            <UserLabel>
              익명 <UserIconStyled />
            </UserLabel>
            <Title>제목: 어쩌구 저쩌구</Title>
          </PostHeader>
          <ContentDivider />
          <BodyText>취업이 어쩌구저쩌구~ (본문 생략)</BodyText>
        </PostBox>

        <CommentList>
          {[1, 2, 3].map((_, i) => (
            <CommentItem key={i}>
              <UserLabel>
                익명 <UserIconStyled />
              </UserLabel>
              <CommentText>이거는 댓글의 댓글댓글</CommentText>
              <CommentMeta>
                <span>6:49 PM</span>
                <DeleteIconStyled />
              </CommentMeta>
            </CommentItem>
          ))}
        </CommentList>

        <CommentInput />
      </ContentWrapper>

      {isEditing && <PostModal onClose={() => setIsEditing(false)} />}

      {showDeleteConfirm && (
        <DeleteOverlay>
          <DeleteModal>
            <DeleteText>게시물을 삭제하시겠습니까?</DeleteText>
            <DeleteButtonGroup>
              <DeleteConfirmBtn onClick={handleDelete}>삭제하기</DeleteConfirmBtn>
              <DeleteCancelBtn onClick={() => setShowDeleteConfirm(false)}>취소하기</DeleteCancelBtn>
            </DeleteButtonGroup>
          </DeleteModal>
        </DeleteOverlay>
      )}
    </PageLayout>
  );
};

export default PostDetail;

const PageLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #666;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background: #d9d6ff;
  border-radius: 10px;
  border: none;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 160, 153, 0.4);
  border-radius: 10px;
  border: none;
  font-weight: 600;
`;

const PostBox = styled.div`
  border: 1px solid #999;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserLabel = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 700;
`;

const ContentDivider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 12px 0;
`;

const BodyText = styled.p`
  font-size: 16px;
  line-height: 1.4;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const CommentText = styled.p`
  margin: 4px 0;
`;

const CommentMeta = styled.div`
  font-size: 12px;
  color: #777;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserIconStyled = styled(UserIcon)`
  width: 14px;
  height: 14px;
`;

const DeleteIconStyled = styled(DeleteIcon)`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const DeleteOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DeleteModal = styled.div`
  width: 320px;
  padding: 30px;
  border-radius: 16px;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DeleteText = styled.div`
  color: #000;
  font-family: Lato;
  font-size: 20px;
  font-weight: 400;
  line-height: 142%;
`;

const DeleteButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const DeleteConfirmBtn = styled.button`
  width: 150px;
  height: 50px;
  padding: 6px 40px;
  background: #f55546;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const DeleteCancelBtn = styled.button`
  width: 150px;
  height: 50px;
  padding: 6px 40px;
  background: #9a9393;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;