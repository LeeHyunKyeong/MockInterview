import React, { useState } from 'react'
import styled from 'styled-components'

type StepStyleProps = {
  isActive: boolean;
};

type StepLineProps = {
  activeStep: number;
};

type ProgressStepProps = {
  activeStep: number;
};

const MainContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 70px; //위에서 얼마나 떨어질지
`

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`
const StepCount = styled.span`
  font-size: 19px;
  color: #f3e7f3;
`

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%); //Y축 이동을 제거하고 X축만 조정
  white-space: nowrap; //글자가 줄바꿈 되지 않도록 함
`;

const StepLabel = styled.span`
  font-size: 14px;
  color: white;
  text-align: center;
  display: block; //span을 블록 레벨 요소로 만듦
`;

const StepStyle = styled.div<StepStyleProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#8D31DC' : '#ffffff'}; // Active color
  border: 3px solid ${props => props.isActive ? '#8D31DC' : '#f3e7f3'}; // Inactive color
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepLine = styled.div<StepLineProps>`
  position: absolute;
  height: 4px;
  background-color: #f3e7f3; // 기본 색상
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    width: ${props => ((props.activeStep - 1) / (steps.length - 1)) * 100}%;
    background-color: #8D31DC; // Active line color
    transition: width 0.4s ease;
  }
`;

const steps = [
  {
    label: '웹캠/마이크 테스트',
    step: 1,
  },
  {
    label: '질문 확인',
    step: 2,
  },
  {
    label: '답변',
    step: 3,
  },
  {
    label: '제출',
    step: 4,
  },
]

const ProgressStep: React.FC<ProgressStepProps> = ({ activeStep }) => {
  return (
    <MainContainer>
      <StepContainer>
        <StepLine activeStep={activeStep} />
        {steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle isActive={step <= activeStep}>
              <StepCount>{step}</StepCount>
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
    </MainContainer>
  );
};
export default ProgressStep;

//      <button onClick={handleNextClick}>시작하기</button>