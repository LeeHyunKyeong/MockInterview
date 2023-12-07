import React from 'react';
import styled from 'styled-components';
import ProgressStep from '../components/progress-step';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useNavigate } from 'react-router-dom';

const GradientBackground = styled.div`
  height: 100vh; //전체화면
  background-image: linear-gradient(to bottom, #8E2DE2CC, #4CA2CDCC);
`;

const InfoBox = styled.div`
  background-color: rgba(255, 255, 255, 0.2); // 반투명 흰색
  padding: 20px;
  margin: 20px auto; // 가운데 정렬
  width: 1000px;
  height: 420px;
  border-radius: 10px; // 모서리 둥글게
  text-align: center; // 텍스트 가운데 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuestionText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px; // 타이머와의 간격
`;

interface TimeProps {
  remainingTime: number;
}

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question: React.FC = () => {
  const navigate = useNavigate()

  const renderTime = ({ remainingTime }: TimeProps) => {
    if (remainingTime === 0) {
      navigate('/answer'); 
    }

    return (
      <div className="timer" style={{ color: '#4341B1', fontSize: '40px', fontWeight: 500 }}>
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <GradientBackground>
      <ProgressStep activeStep={2} />
      <InfoBox>
        <QuestionText>1분 자기소개를 해주세요</QuestionText>
        <TimerWrapper>
          <CountdownCircleTimer
          isPlaying
          duration={30}
          colors={["#4341B1"] as any} //타입 체크를 일시적으로 우회
          >
          {renderTime}
          </CountdownCircleTimer>
        </TimerWrapper>
      </InfoBox>
    </GradientBackground>
  );
};

export default Question;