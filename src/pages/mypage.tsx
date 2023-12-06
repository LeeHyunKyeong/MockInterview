import React, { useState } from 'react';
import styled from 'styled-components';
import { IoHomeOutline } from "react-icons/io5";
import ProfileImageSrc from '../assets/profile-image.png';
import AnalysisContent from '../components/analysis-content';
import QuestionContent from '../components/question-content';

const IconWrapper = styled.div`
  padding: 18px;
  border-bottom: 1px solid #BEBEBE;
`;

const ProfileBox = styled.div`
  background-color: #F6F6F6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height:100px;
  margin-bottom: 5px;
`;

const Nickname = styled.div`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
`;

const StatsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%; // 박스 전체 폭
  padding: 10px;
`;

const Stat = styled.div`
  flex: 1;
  text-align: center;
`;

const StatNumber = styled.strong`
  font-size: 1.3em;
  font-weight: bold;
`;

interface TabProps {
  isActive: boolean;
}

const TabContainer = styled.div`
  display: flex;
  padding: 30px 50px;
`;

const Tab = styled.div<TabProps>`
  margin-right: 50px;
  padding-bottom: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 3px solid ${props => props.isActive ? 'black' : 'transparent'};
  color: ${props => props.isActive ? 'black' : 'grey'};
`;

const Mypage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' 또는 'questions'

  return (
    <>
      <IconWrapper>
        <IoHomeOutline size={25}/>
      </IconWrapper>
      <ProfileBox>
        <ProfileImage src={ProfileImageSrc} alt="Profile" />
        <Nickname>이현경 님</Nickname>
        <StatsBox>
          <Stat>연습한 질문 <StatNumber>1</StatNumber>개</Stat>
          <Stat>총 영상 <StatNumber>1</StatNumber>개</Stat>
        </StatsBox>
      </ProfileBox>
      <TabContainer>
        <Tab 
          isActive={activeTab === 'analysis'}
          onClick={() => setActiveTab('analysis')}
        >
          분석 결과
        </Tab>
        <Tab 
          isActive={activeTab === 'questions'}
          onClick={() => setActiveTab('questions')}
        >
          질문 목록
        </Tab>
      </TabContainer>
      {activeTab === 'analysis' ? <AnalysisContent /> : <QuestionContent />}
    </>
  );
};

export default Mypage;