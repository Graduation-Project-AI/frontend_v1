import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";

// 예시 더미 데이터 -> 나중에 실제 데이터로 대체
const historyList = [
    {
      id: 1,
      date: "3월 5일",
      company: "우리은행 - 데이터분석",
      questions: [
        {
          question: "자기소개",
          answer: "저는 혼자 해결하는 타입입니다. 어릴적부터 그런게 익숙했고..."
        },
        {
          question: "자신의 장점과 단점",
          answer: "저는 현재까지는 일에 대한 답변에 대한 실수가 없었는데..."
        }
      ]
    },
    {
      id: 2,
      date: "3월 5일",
      company: "삼성 SDS - sw 개발",
      questions: [
        {
          question: "자신의 장점과 단점",
          answer: "협업을 중요하게 생각합니다. 이유는..."
        }
      ]
    }
  ];
  
  const Mypage = () => {
    const [selected, setSelected] = useState(null);
  
    return (
      <Wrapper>
        <Sidebar />
        <Content>
          <ProfileSection>
            <ProfileText>
              <h2>OOO</h2>
              <p>Data Scientist, Backend Engineer</p>
            </ProfileText>
          </ProfileSection>
  
          <HistoryHeader>
            <LeftSection>
              <PurpleDot />
              <Title>History</Title>
              <CountBadge>{historyList.length}</CountBadge>
            </LeftSection>
          </HistoryHeader>
  
          <Main>
            <Left>
              <Divider />
              {historyList.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => setSelected(selected?.id === item.id ? null : item)}
                  isSelected={selected?.id === item.id}
                >
                  <DateTag>{item.date}</DateTag>
                  <Company>{item.company}</Company>
                  {item.questions.map((q, idx) => (
                    <div key={idx}>Q{idx + 1}. {q.question}</div>
                  ))}
                </Card>
              ))}
            </Left>
  
            <Right>
              <ChartWrapper style={{ display: selected ? "none" : "block" }}>
                <Chart />
              </ChartWrapper>
              {selected && selected.questions.map((qa, idx) => (
                <React.Fragment key={idx}>
                  <QuestionBox>
                    <Label>Question</Label>
                    <Text>{qa.question}</Text>
                  </QuestionBox>
                  <AnswerBox>
                    <Label>Answer</Label>
                    <Text>{qa.answer}</Text>
                  </AnswerBox>
                </React.Fragment>
              ))}
            </Right>
          </Main>
        </Content>
      </Wrapper>
    );
  };
  
  export default Mypage;
  
  const Wrapper = styled.div`
    display: flex;
  `;
  
  const Content = styled.div`
    flex: 1;
    padding: 32px;
  `;
  
  const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `;
  
  const ProfileText = styled.div`
    h2 {
      font-size: 20px;
    }
    p {
      color: #888;
    }
  `;
  
  const HistoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  `;
  
  const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  
  const PurpleDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: #5030e5;
    border-radius: 50%;
  `;
  
  const Title = styled.h4`
    font-size: 16px;
    font-weight: 600;
    color: #1d1d1d;
    margin: 0;
  `;
  
  const CountBadge = styled.div`
    background: #d9d9d9;
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 500;
    color: #1d1d1d;
  `;
  
  const Main = styled.div`
    display: flex;
    margin-top: 32px;
    gap: 24px;
  `;
  
  const Left = styled.div`
    flex: 1;
  `;
  
  const Right = styled.div`
    flex: 2;
  `;
  
  const Card = styled.div`
    background: ${({ isSelected }) => (isSelected ? "#EBEBEB" : "#fff")};
    border-radius: 16px;
    border: 1px solid #ddd;
    padding: 16px;
    margin-bottom: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {background: #EBEBEB;}
  `;
  
  const DateTag = styled.div`
    background: #ffe9cd;
    display: inline-block;
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 4px;
    margin-bottom: 6px;
  `;
  
  const Company = styled.div`
    font-weight: bold;
    margin-bottom: 8px;
  `;
  
  const QuestionBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 728px;
    min-width: 200px;
    padding: 24px;
    border-radius: 16px;
    background: #edeefc;
    margin-bottom: 16px;
  `;
  
  const AnswerBox = styled(QuestionBox)`
    background: #e6f1fd;
  `;
  
  const Label = styled.div`
    font-weight: bold;
    font-size: 12px;
  `;
  
  const Text = styled.div`
    font-size: 14px;
    font-weight: 500;
    font-family: Inter, sans-serif;
    color: #000;
    margin-bottom: 8px;
  `;
  
  const ChartWrapper = styled.div`
    width: 728px;
    height: 350px;
    border-radius: 16px;
    background: #f8f8f8;
    padding: 24px;
    margin-bottom: 16px;
  `;
  
  const Divider = styled.div`
    height: 3px;
    background-color: #5030e5;
    margin-bottom: 24px;
  `;
  