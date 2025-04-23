import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TitleBox from "../../components/TitleBox";
import Timer from "../../components/Timer";
import Sidebar from "../../components/Sidebar";
import axios from "axios"; // api 연동
const Answer = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2분 타이머 (120초)
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // answer버튼 누름 여부부

  // 마이크 녹음
  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.start();
        console.log("🎙 녹음 시작");
      } catch (err) {
        alert("마이크 사용 권한을 허용해주세요.");
        console.error(err);
      }
    };

    startRecording();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      stopRecordingAndSubmit();
    }
    if (timeLeft <= 0) return; // 타이머가 0이 되면 더 이상 카운트하지 않음
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // 녹음 종료 후 백엔드 전송
  const stopRecordingAndSubmit = async () => {
    if (isSubmitting) return; // 중복 제출 방지
    setIsSubmitting(true);
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

        const interviewId = localStorage.getItem("interviewId");
        const questionList = JSON.parse(localStorage.getItem("questionList"));
        const questionIndex = parseInt(localStorage.getItem("questionIndex") || "0");
        const currentQuestion = questionList[questionIndex];

        // 서버 업로드
        const formData = new FormData();
        formData.append("file", audioBlob, "answer.wav");
        formData.append("interviewId", interviewId);
        formData.append("questionId", currentQuestion.questionId);

        try {
          const response = await axios.post("http://localhost:8080/api/stt/answer", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const resultText = response.data;
          console.log("변환된 텍스트:", resultText);
        } catch (err) {
          console.error("요청 실패:", err);
          alert("서버에 연결할 수 없습니다.");
        }
        const nextIndex = questionIndex + 1;
        localStorage.setItem("questionIndex", nextIndex);

        if (nextIndex < questionList.length) {
          navigate("/question");
        } else {
          navigate("/loading");
        }

      };
    }
  };
  const handleFinish = () => {
    stopRecordingAndSubmit();
  };

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <TitleBox title="답변해 주세요" subtitle="2분 제한 시간이 주어집니다." />
        <Timer duration={120} time={timeLeft} />
        {!isSubmitting && (
          <FinishButton onClick={handleFinish}>
            답변 마치기
          </FinishButton>
        )}
        {isSubmitting && <ProcessingText>답변 저장 중...</ProcessingText>}

      </MainContent>
    </Wrapper>
  );
};

export default Answer;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #f9f9f9;
`;


const FinishButton = styled.button`
  width: 120px;
  padding: 10px;
  background-color: #5030e5;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
const ProcessingText = styled.p`
  font-size: 14px;
  color: #999;
  font-weight: 500;
`;
