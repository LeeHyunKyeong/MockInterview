import React from 'react';
import styled from 'styled-components';
import ProgressStep from '../components/progress-step';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useNavigate } from 'react-router-dom';

const GradientBackground = styled.div`
  height: 100vh; //전체화면
  background-image: linear-gradient(to bottom, #8e2de2cc, #4ca2cdcc);
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

const SubmitText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const SubmitButton = styled.button`
  margin-top: 30px;
  background-color: transparent; // 배경색 투명
  border: 2px solid white;
  cursor: pointer;
  transition: background-color 0.3s ease; // 배경색 변경시 트랜지션 효과
  width: 220px;
  height: 55px;
  border-radius: 40px;
  display: flex;
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  color: white;
  font-weight: 600;
  font-size: 16px;

  &:hover {
    background-color: white; // 마우스 오버시 배경색 흰색으로 변경
    color: black;
  }
`;

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const PageNavStart = () => {
    navigate('/start');
  };
  return (
    <GradientBackground>
      <ProgressStep activeStep={4} />
      <InfoBox>
        <SubmitText>제출이 정상적으로 완료되었습니다.</SubmitText>
        <SubmitText>분석 보고서를 생성중이니 잠시만 기다려주세요!</SubmitText>
        <SubmitButton onClick={PageNavStart}>홈으로 이동하기</SubmitButton>
      </InfoBox>
    </GradientBackground>
  );
};

export default Submit;
