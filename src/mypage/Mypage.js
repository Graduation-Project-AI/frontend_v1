import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";

const jobMap = {
  1: "Frontend",
  2: "Backend",
  3: "FullStack",
  4: "Mobile",
  5: "Data",
  6: "Infra",
  7: "System",
  8: "AI",
};

const Mypage = () => {
  const [selected, setSelected] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [scoreChartData, setScoreChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("mypageResults");
    if (raw) {
      const parsed = JSON.parse(raw);
      const result = parsed.map((item) => {
        const job = jobMap[item.jobId] || "Unknown";
        const date = new Date(item.createdAt).toLocaleDateString("ko-KR");

        const questions = item.answers.map((ans) => ({
          question: ans.qcontent,
          answer: ans.acontent,
          score: {
            logic: ans.logicScore || 0,
            expression: ans.claScore || 0,
            similarity: ans.simScore || 0,
          },
        }));

        return {
          id: item.interviewId,
          date,
          company: `${item.company} - ${job}`,
          questions,
        };
      });
      setHistoryList(result);
    }
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const res = await fetch(`http://localhost:8080/api/results/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("score chart fetch failed");
        const data = await res.json();

        const recentSix = data.slice(0, 6).reverse();
        const formatted = recentSix.map((item) => {
          const dateObj = new Date(item.createdAt);
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const date = `${month}.${day}`;
          return {
            name: date,
            논리성: Math.round(item.logicScore * 100) / 10,
            표현력: Math.round(item.claScore * 100) / 10,
            유사성: Math.round(item.simScore * 10) / 10,
          };
        });
        setScoreChartData(formatted);
      } catch (e) {
        console.error(e);
      }
    };
    fetchScores();
  }, []);

  const userName = localStorage.getItem("name") || "사용자";
  const allJobs = [...new Set(historyList.map((h) => h.company.split(" - ")[1]))].join(", ");

  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <ProfileSection>
          <ProfileText>
            <h2>{userName}</h2>
            <p>{allJobs}</p>
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
            {historyList.length === 0 ? (
              <EmptyState>
                <p>아직 진행한 면접 연습이 없어요.</p>
                <span>면접 연습을 시작하면 여기에 히스토리가 표시됩니다.</span>
                <StartButton onClick={() => navigate("/interview/stage1")}>
                  면접 연습하러 가기
                </StartButton>
              </EmptyState>
            ) : (
              historyList.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => setSelected(selected?.id === item.id ? null : item)}
                  isSelected={selected?.id === item.id}
                >
                  <DateTag>{item.date}</DateTag>
                  <Company>{item.company}</Company>
                  {item.questions.map((q, idx) => (
                    <div key={idx}>
                      Q{idx + 1}. {q.question}
                    </div>
                  ))}
                </Card>
              ))
            )}
          </Left>

          <Right>
            {!selected && (
              <ChartWrapper>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scoreChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="논리성" stroke="#8884d8" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="표현력"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="유사성"
                      stroke="#ffc658"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>
            )}

            {selected &&
              selected.questions.map((qa, idx) => (
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
  max-height: 700px;
  overflow-y: auto;
  padding-right: 8px;
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
  &:hover {
    background: #ebebeb;
  }
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
  width: 80%;
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
  width: 80%;
  border-radius: 16px;
  background: #f8f8f8;
  padding: 24px;
  margin-bottom: 40px;
`;

const Divider = styled.div`
  height: 3px;
  background-color: #5030e5;
  margin-bottom: 24px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f3f3f3;
  border-radius: 16px;
  padding: 40px 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
  font-weight: 500;

  p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #555;
  }

  span {
    display: block;
    margin-bottom: 16px;
  }
`;

const StartButton = styled.button`
  margin-top: 10px;
  background-color: #5030e5;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #3b24b3;
  }
`;
