import React from 'react';
import styled from 'styled-components';
import ProgressStep from '../components/progress-step';
import VideoRecorder from '../components/video-recoder';

const GradientBackground = styled.div`
  height: 100vh; //전체화면
  background-image: linear-gradient(to bottom, #8E2DE2CC, #4CA2CDCC);
`;

const Test: React.FC = () => {
  return (
    <GradientBackground>
      <ProgressStep activeStep={1}/>
      <VideoRecorder />
    </GradientBackground>
  );
};
export default Test;