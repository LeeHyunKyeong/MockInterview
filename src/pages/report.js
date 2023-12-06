import grinning from '../assets/emotions/grinning.svg';
import joy from '../assets/emotions/joy.svg';
import styled from 'styled-components';
import { onReportClick } from '../api/reportdataapi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReportWallpaper = styled.div`
  background-color: #4d1cc9;
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 2rem;
  width: 90%;
  height: auto;
`;

const Innerbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 2rem;
  width: 100%;
  height: auto;
  padding-bottom: 50px;
  margin-bottom: 50px;
`;

const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateBox = styled.div`
  margin-left: 30px;
  margin-bottom: 14px;
  margin-top: 50px;
  color: white;
  font-weight: 600;
`;
const QuestionText = styled.div`
  font-size: 40px;
  font-weight: 800;
  padding-top: 90px;
  padding-left: 50px;
`;
const Item = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;
const EmojiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #683fd2;
  width: 80px;
  height: 80px;
  border-radius: 1rem;
`;

const EmojiContainer = styled.div`
  width: 80px;
  height: 100px;
`;

const EmojiSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 50px;
  padding-top: 50px;
`;
const ReportItemContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const TextEmo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #683fd2;
  width: 230px;
  height: 206px;
  border-radius: 1rem;
`;

const IText = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;
const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  background-color: #dcd3f3;
  border-radius: 1rem;
  font-size: 25px;
  padding: 20px;
  font-weight: 500;
`;
const Report = () => {
  const { postID } = useParams();
  const [result, setResult] = useState([
    '2023-11-23',
    '1분 자기소개를 해주세요.',
    1,
    '수',
    '있는',
    '이런',
    1,
    0,
    1,
    0,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await onReportClick(postID); // API 호출
      if (response) {
        console.log(response?.data); // 응답 데이터 출력
        setResult(Object.values(response?.data)); // 응답 데이터를 state에 저장
      }
    };

    fetchData();
  }, []);

  const speedmsg = [
    '말의 빠르기는 아주 적절해요! 말하면서 급하게 느껴지지 않으면서도 듣는 사람이 지루하지 않을 만큼의 속도감을 유지하고 있어요. 이대로 계속 연습해주세요. 참고로 적절한 말의 빠르기는 평균적으로 120~150단어/분 입니다.',
    '현재 말의 빠르기가 조금 빠른 편이에요. 너무 빨리 말하면 듣는 사람이 받아들이기 힘들 수 있어요. 조금 더 여유롭게, 효과적인 강조와 휴식을 활용하여 말해보세요. 참고로 적절한 말의 빠르기는 평균적으로 120~150단어/분 입니다.',
  ];
  const wordmsg = [
    '현재 자주 사용하는 단어가 반복되는 경향이 있어요. 어휘의 다양성이 부족하면 듣는 사람이 지루해할 수 있어요. 단어 선택을 다양화하고, 문맥에 맞는 단어를 사용하는 연습을 해보세요.',
  ];

  const volumemsg = [
    '목소리 크기가 적절합니다. 너무 크지도, 작지도 않아서 듣는 사람이 편안하게 인식할 수 있어요. 이대로 계속 유지하시면 좋을 것 같아요.',
    '현재 목소리 크기가 다소 작은 편입니다. 너무 작은 목소리는 자신감이 없어 보일 수 있으며, 듣는 사람이 받아들이는데 어려움이 있을 수 있어요. 목소리를 좀 더 크게 내어보세요.',
  ];

  const tonemsg = [
    '목소리 톤이 적절합니다. 너무 높거나 낮지 않아서 듣는 사람이 편안하게 인식할 수 있어요. 이대로 계속 유지하시면 좋을 것 같아요.',
    '현재 목소리 톤이 조금 낮은 편입니다. 너무 낮은 톤은 어두운 느낌을 줄 수 있어요. 음성의 밝기를 조금 더 올려서 연습해보세요.',
  ];

  const gazemsg = [
    '시선 처리가 아주 좋습니다. 듣는 사람에게 적절하게 시선을 주고, 때때로 멀리 보는 것도 잊지 않으셨네요. 이렇게만 계속 연습해주세요.',
    '시선 처리가 조금 아쉽습니다. 한 곳만 응시하게 되면 불안정한 모습으로 보일 수 있어요. 듣는 사람에게 시선을 주되, 때때로 멀리 보는 것도 잊지 않는 것이 좋습니다.',
  ];

  const expressionmsg = [
    '표정 처리가 아주 좋습니다. 웃음을 잘 유지하면서도 감정에 따라 다양한 표정을 보여주셨어요. 이대로 계속 연습해주세요.',
    '표정 처리가 조금 아쉽습니다. 얼굴 표정이 한결같이 일정하면, 감정의 빈약함을 보여줄 수 있어요. 감정에 따라 표정을 다양하게 연출해보세요.',
  ];
  const Emoji = ({ what, emo }) => {
    let emojiSrc;
    if (emo === 0) {
      emojiSrc = grinning;
    } else if (emo === 1) {
      emojiSrc = joy;
    }
    return (
      <EmojiContainer>
        <Item>{what}</Item>
        <EmojiBox>
          <img
            src={emojiSrc}
            alt={emo}
            aria-label="emoji"
            style={{ width: '60px', height: '60px' }}
          />
        </EmojiBox>
      </EmojiContainer>
    );
  };
  const ReportMsg = ({ item, emo, word }) => {
    let emojiSrc;
    let message;
    let msgList;

    if (item === '말의 빠르기') msgList = speedmsg;
    else if (item === '목소리 크기') msgList = volumemsg;
    else if (item === '목소리 톤') msgList = tonemsg;
    else if (item === '시선처리') msgList = gazemsg;
    else if (item === '표정') msgList = expressionmsg;
    else if (item === '자주 사용한 단어') msgList = wordmsg;

    if (item !== '자주 사용한 단어') {
      if (emo === 0) {
        emojiSrc = grinning;
        message = <MessageBox>{msgList[1]}</MessageBox>;
      } else if (emo === 1) {
        emojiSrc = joy;
        message = <MessageBox>{msgList[0]}</MessageBox>;
      }
    } else {
      message = <MessageBox>{msgList[0]}</MessageBox>;
    }

    return (
      <ReportItemContainer>
        <TextEmo>
          <IText>{item}</IText>
          {item !== '자주 사용한 단어' ? (
            <img
              src={emojiSrc}
              alt={emo}
              aria-label="emoji"
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            <IText style={{ fontSize: '30px' }}>
              "{word[0]},{word[1]},{word[2]}"
            </IText>
          )}
        </TextEmo>
        {message}
      </ReportItemContainer>
    );
  };

  return (
    <ReportWallpaper>
      <Container>
        <DateBox>{result[0]}</DateBox>
        <Innerbox>
          <RowBox>
            <QuestionText>{result[1]}</QuestionText>
            <EmojiSet>
              <Emoji what="말의 빠르기" emo={result[2]} key="speed" />
              <Emoji what="목소리 크기" emo={result[6]} key="volume" />
              <Emoji what="목소리 톤" emo={result[7]} key="tone" />
              <Emoji what="시선 처리" emo={result[8]} key="gaze" />
              <Emoji what="표정" emo={result[9]} key="expression" />
            </EmojiSet>
          </RowBox>
          <ReportMsg
            className="first-reportmsg"
            item="말의 빠르기"
            emo={result[2]}
          />
          <ReportMsg
            item="자주 사용한 단어"
            word={[result[3], result[4], result[5]]}
          />
          <ReportMsg item="목소리 크기" emo={result[6]} />
          <ReportMsg item="목소리 톤" emo={result[7]} />
          <ReportMsg item="시선처리" emo={result[8]} />
          <ReportMsg item="표정" emo={result[9]} />
        </Innerbox>
      </Container>
    </ReportWallpaper>
  );
};

export default Report;
