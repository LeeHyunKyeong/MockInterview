import React, { useState } from 'react';
import styled from 'styled-components';
import { IoEllipsisVertical } from 'react-icons/io5';

const AnalysisContainer = styled.div`
  margin-left: 40px;
  width: 400px;
  height: 400px;
  padding: 15px;
`;

const Video = styled.div`
  width: 100%;
  max-width: 380px;
  border-radius: 8px;
`;

const DateAndQuestion = styled.div`
  display: flex;
  justify-content: space-between; // 양 끝에 요소들을 정렬
  align-items: center;
  width: 100%; // 전체 너비를 사용
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const QuestionLabel = styled.strong`
  font-weight: bold;
  display: block; // 새로운 라인에 질문 라벨을 표시
  margin-top: 10px; // 날짜와 질문 라벨 사이 간격
`;

const DropdownIcon = styled(IoEllipsisVertical)`
  cursor: pointer;
  position: relative;
`;

const DropdownIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative; //드롭다운 메뉴의 위치를 이 컨테이너에 상대적으로 설정
`;

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 20px; // 아이콘 아래에 위치
  right: 0; // 아이콘의 바로 왼쪽에 위치
  background-color: white;
  border: 1px solid #ddd;
  z-index: 1000;
  display: ${props => props.show ? 'block' : 'none'};
`;

const DropdownItem = styled.div`
  padding: 10px;
  white-space: nowrap; //텍스트가 줄바꿈되지 않도록 설정
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; // 버튼 사이의 간격
  width: 100%; // 전체 너비를 차지
`;

const Button = styled.button`
  flex: 1; // 버튼이 컨테이너의 전체 너비를 균등하게 차지
  padding: 10px 0;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface DropdownMenuProps {
  show: boolean;
}

const AnalysisContent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // 백엔드에서 받아올 질문 내용을 state로 관리합니다.
  // 예시를 위해 하드코딩된 상태로 시작하지만, 이후에 API 호출로 대체될 수 있습니다.
  const [question, setQuestion] = useState("1분 자기소개를 해주세요");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <AnalysisContainer>
      <Video>
        {/* 영상 데이터 렌더링 */}
      </Video>
      <DateAndQuestion>
        <DateContainer>
          <Date>날짜</Date>
          <div>2023.11.23</div>
        </DateContainer>
        <DropdownIconContainer>
          <DropdownIcon onClick={toggleDropdown} />
          {showDropdown && (
            <DropdownMenu show={showDropdown}>
              <DropdownItem>삭제</DropdownItem>
            </DropdownMenu>
          )}
        </DropdownIconContainer>
      </DateAndQuestion>
      <QuestionLabel>질문 {question}</QuestionLabel>
      <ButtonContainer>
        <Button>분석 레포트 확인</Button>
        <Button>해당 질문 재연습</Button>
      </ButtonContainer>
    </AnalysisContainer>
  );
};
export default AnalysisContent;