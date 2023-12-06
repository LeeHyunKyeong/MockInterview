import React, { useState } from 'react';
import styled from 'styled-components';
import { Wallpaper, GuideText, Selectbtn } from './startpage';
import { useNavigate, useLocation } from 'react-router-dom';

const FadeInText = styled(GuideText)`
  text-align: center;
  line-height: 1.4em;
  opacity: 0;
  animation: fadeIn 2s forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const Tutorials = () => {
  const [index, setIndex] = useState(0);
  const location = useLocation();
  let name;

  if (location && location.state && location.state.nickname) {
    name = location.state.nickname;
    console.log(name);
  } else {
    name = '현경';
  }

  const words = [
    `안녕하세요, ${name}님.<br />지금부터 튜토리얼을 시작할게요.`,
    '먼저, 면접 연습을 위해<br />오디오와 웹캠을 허용해주세요.',
    '질문을 시작하기 전에<br />마이크와 웹캠을 테스트 할 수 있어요',
    '잠시 준비시간을 갖고 준비가 됐다면<br />시작 버튼을 눌러주세요.',
    '약 60초 동안 질문에 답변을 해주세요.<br />조금만 기다리면 분석보고서를 보내드려요!',
    '그럼 시작해볼까요?',
  ];
  const navigate = useNavigate();
  const onNext = () => {
    if (index === words.length - 1) {
      navigate('/test'); // 다음 페이지로 이동
    } else {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };
  return (
    <Wallpaper>
      <div>
        <FadeInText
          key={index}
          dangerouslySetInnerHTML={{ __html: words[index] }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Selectbtn onClick={onNext}>
            {index === words.length - 1 ? '시작하기' : '다음'}
          </Selectbtn>
        </div>
      </div>
    </Wallpaper>
  );
};

export default Tutorials;
