import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const Result = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mergedData, setMergedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const answerList = JSON.parse(localStorage.getItem("answerList") || "[]");
    const analyzeResult = JSON.parse(localStorage.getItem("analyzeResult") || "[]");
  
    // ✅ 중복 제거: questionId 기준으로 중복 분석 제거
    const uniqueResults = analyzeResult.filter(
      (result, index, self) =>
        index === self.findIndex((r) => r.questionId === result.questionId)
    );
  
    const merged = uniqueResults.map((result) => {
      const match = answerList.find((a) => a.questionId === result.questionId);
      return {
        question: match?.qcontent || "",
        answer: match?.acontent || "",
        improvement: result.impAnswer || "",
        guidance: result.suggestion || "",
        scores: {
          논리성: result.logicScore || 0,
          표현력: result.claScore || 0,
          유사성: result.simScore || 0,
          총점: Math.round(((result.logicScore || 0) + (result.claScore || 0) + (result.simScore || 0)) / 3)
        }
      };
    });
  
    setMergedData(merged);
  }, []);
  

  if (mergedData.length === 0) return <div>로딩 중...</div>;

  const current = mergedData[currentIndex];
  const chartData = Object.entries(current.scores).map(([name, score]) => ({
    name,
    score,
    color:
      name === "논리성" ? "#A594F9" :
      name === "표현력" ? "#A0E7E5" :
      name === "유사성" ? "#FFDD94" : "#000000"
  }));

  const handleFinish = () => navigate("/feedback");

  return (
    <Wrapper>
      <Sidebar />
      <Main>
        <TopBar>
          <HeaderBox>
            <HeaderText>AI 결과 REPORT</HeaderText>
          </HeaderBox>
          <FinishButton onClick={handleFinish}>종료</FinishButton>
        </TopBar>

        <TabWrapper>
          {mergedData.map((_, idx) => (
            <Tab
              key={idx}
              active={currentIndex === idx}
              onClick={() => setCurrentIndex(idx)}
            >
              {idx + 1}
            </Tab>
          ))}
        </TabWrapper>

        <Body>
          <LeftColumn>
            <LabelBox>나의 답변 보기</LabelBox>
            <AnswerBox>
              <QuestionText>{current.question}</QuestionText>
              <Divider />
              <AnswerText>{current.answer}</AnswerText>
            </AnswerBox>

            <AnalysisBox>
              <h4>AI 분석 결과</h4>

              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <DonutContainer>
                {chartData.map((entry, idx) => (
                  <DonutBox key={idx}>
                    <PieChart width={100} height={100}>
                      <Pie
                        data={[{ value: entry.score }, { value: 100 - entry.score }]}
                        innerRadius={30}
                        outerRadius={45}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        <Cell fill={entry.color} />
                        <Cell fill="#F2F2F2" />
                      </Pie>
                    </PieChart>
                    <DonutLabel>{entry.name}</DonutLabel>
                  </DonutBox>
                ))}
              </DonutContainer>
            </AnalysisBox>
          </LeftColumn>

          <RightColumn>
            <LabelBox green>개선 답변</LabelBox>
            <ImprovementBox>
              <SubTitle>AI가 생성한 모범 답안</SubTitle>
              <Divider />
              <p>{current.improvement}</p>
            </ImprovementBox>

            <GuidanceBox>
              <h4>개선 방향</h4>
              <Divider />
              <p>{current.guidance}</p>
            </GuidanceBox>
          </RightColumn>
        </Body>
      </Main>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 1;
  padding: 30px 40px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBox = styled.div`
  background: #a3aaf2;
  height: 50px;
  border-radius: 25px;
  padding: 0 40px;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const FinishButton = styled.button`
  background: #5030e5;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const TabWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Tab = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ active }) => (active ? "#5030e5" : "#d1d4f8")};
  color: #000;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  gap: 30px;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LabelBox = styled.div`
  width: fit-content;
  height: 35px;
  background: ${({ green }) => (green ? "#96E2D6" : "#d1d4f8")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
`;

const AnswerBox = styled.div`
  border: 2px solid #a3aaf2;
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  min-height: 300px;
`;

const ImprovementBox = styled.div`
  border: 2px solid #96e2d6;
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  min-height: 300px;

  p {
    font-size: 16px;
    line-height: 24px;
  }
`;

const GuidanceBox = styled.div`
  border: 2px solid #787486;
  border-radius: 12px;
  background: #fff;
  padding: 20px;

  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    line-height: 24px;
  }
`;

const AnalysisBox = styled.div`
  border: 2px dashed #ccc;
  border-radius: 12px;
  background: #fafafa;
  padding: 20px;
  height: 420px;
`;

const DonutContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const DonutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const DonutLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-top: -10px;
`;

const QuestionText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const AnswerText = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 12px 0;
`;