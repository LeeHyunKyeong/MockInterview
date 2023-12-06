import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProgressStep from '../components/progress-step';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useMediaStream } from '../media-stream-context';
import { useNavigate } from 'react-router-dom';

interface TimeProps {
  remainingTime: number;
}

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

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

const WebcamBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
`;

const QuestionText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 25px; // 타이머와의 간격
`;

const Video = styled.video`
  width: 100%;
  max-width: 550px;
  border-radius: 8px;
`;

const TimerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
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

const Answer: React.FC = () => {
  const navigate = useNavigate()
  const { mediaStream } = useMediaStream();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoRecorder, setVideoRecorder] = useState<MediaRecorder | null>(null);
  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
  const videoChunks = useRef<BlobPart[]>([]);
  const audioChunks = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      startRecording();
    }
  }, [mediaStream]);

  const startRecording = () => {
    if (mediaStream) {
      const videoRecorderOptions = { mimeType: 'video/webm' };
      const videoRecorder = new MediaRecorder(mediaStream, videoRecorderOptions);
      setVideoRecorder(videoRecorder);
      videoRecorder.ondataavailable = (event) => {
        videoChunks.current.push(event.data);
      };
      videoRecorder.start();

      const audioStream = new MediaStream(mediaStream.getAudioTracks());
      const audioRecorder = new MediaRecorder(audioStream);
      setAudioRecorder(audioRecorder);
      audioRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      audioRecorder.start();
    }
  };

  const handleSubmit = async () => {
    // 레코더를 멈춰야 합니다. 레코딩이 끝나고 나서 파일을 전송해야 하기 때문입니다.
    if (videoRecorder && audioRecorder) {
      videoRecorder.onstop = async () => {
        // Video 파일 Blob 생성
        const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
        videoChunks.current = [];
        console.log('Video Blob size:', videoBlob.size);
        console.log('Video Blob type:', videoBlob.type);
  
        audioRecorder.onstop = async () => {
          // Audio 파일 Blob 생성
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          audioChunks.current = [];
          console.log('Audio Blob size:', audioBlob.size);
          console.log('Audio Blob type:', audioBlob.type);
  
          // FormData 객체를 생성하고 파일을 추가합니다.
          const formData = new FormData();
          formData.append('video', videoBlob, 'video.webm');
          formData.append('audio', audioBlob, 'audio.webm');
  
          // try {
          //   const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData, {
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //     },
          //   });
          //   console.log('Files uploaded successfully:', response.data);
          // 미디어 스트림의 각 트랙을 중지합니다.
          if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
          }

          navigate('/submit');
          // } catch (error) {
          //   console.error('Error sending files to backend:', error);
          // }
        };
        audioRecorder.stop();
      };
      videoRecorder.stop();
    }
  };

  const renderTime = ({ remainingTime }: TimeProps) => {
    return (
      <div className="timer" style={{ color: '#004777', fontSize: '40px', fontWeight: 500 }}>
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <GradientBackground>
      <ProgressStep activeStep={3} />
      <InfoBox>
        <Box>
          <WebcamBox>
            <QuestionText>1분 자기소개를 해주세요</QuestionText>
            <Video ref={videoRef} autoPlay muted/>
          </WebcamBox>
          <TimerBox>
            <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#004777"] as any} //타입 체크를 일시적으로 우회
            >
            {renderTime}
            </CountdownCircleTimer>
            <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
          </TimerBox>
        </Box>
      </InfoBox>
    </GradientBackground>
  );
};

export default Answer;