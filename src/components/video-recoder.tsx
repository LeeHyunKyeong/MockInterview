import React, { useRef, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import { IoIosVideocam } from "react-icons/io";
import { IoVideocamOff } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useMediaStream } from '../media-stream-context';

const VideoWrapper = styled.div`
  display: flex;
  align-items: center; 
  justify-content: flex-start;
  margin: 20px 0 0 220px;
  gap: 50px; // 비디오와 상태 메시지 사이의 간격
`;

const Video = styled.video`
  width: 100%;
  max-width: 550px;
  border-radius: 8px;
`;

const StatusMessages = styled.div`
  display: flex;
  flex-direction: column; //메세지들을 세로로 쌓음
  gap: 20px; //메시지 사이의 간격
`;

const PermissionMessage = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
  padding: 20px; //내부 여백
  border-radius: 8px;
  width: 350px;
  height: 120px;
  display: flex;
  flex-direction: row; // 가로로 배치
  align-items: center; // 수직 방향으로 중앙 정렬
  justify-content: center; // 수평 방향으로 중앙 정렬
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column; // 세로로 배치
  align-items: flex-start; // 텍스트를 아이콘의 왼쪽에 정렬
  justify-content: center; // 세로 방향으로 중앙 정렬
`;

const MessageTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: white;
  margin-left: 15px;
  margin-bottom: 0.3em; // 다음 메시지와의 간격
`;

const ReadyTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: #D9D9D9;
  margin-left: 15px;
`;

const MessageText = styled.div`
  font-weight: bold;
  color: white;
  font-size: 15px;
  margin-left: 15px;
`;

const StartButton = styled.button`
  background-color: transparent; // 배경색 투명
  border: 3px solid white;
  cursor: pointer;
  transition: background-color 0.3s ease; // 배경색 변경시 트랜지션 효과
  width: 80px;
  height: 80px;
  border-radius: 50%; // 완전한 원형 모양
  display: flex;
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬

  &:hover {
    background-color: white; // 마우스 오버시 배경색 흰색으로 변경
  }
`;

const VideoRecorder: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/question'); // Navigate to Question page
  };

  const { setMediaStream } = useMediaStream();
  const videoRef = useRef<HTMLVideoElement>(null);
    const [permissionStatus, setPermissionStatus] = useState({
    microphone: false,
    camera: false,
  });

  const getMediaPermission = useCallback(async () => {
    try {
      const audioConstraints: MediaStreamConstraints = { audio: true };
      const videoConstraints: MediaStreamConstraints = { audio: true, video: true };

      await navigator.mediaDevices.getUserMedia(audioConstraints);
      setPermissionStatus(prev => ({ ...prev, microphone: true }));

      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      
      setMediaStream(videoStream); // Context에 MediaStream 저장

      setPermissionStatus(prev => ({ ...prev, camera: true }));

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (err) {
      console.error(err);
    }
  }, [setMediaStream]);

  useEffect(() => {
    getMediaPermission();
  }, []);

  return (
    <VideoWrapper>
      <Video ref={videoRef} autoPlay muted/>
      <StatusMessages>
        {permissionStatus.microphone ? (
          <PermissionMessage>
            <FaMicrophone size={70} color="white" />
            <div>
              <MessageTitle>음성 인식 성공</MessageTitle>
              <MessageText>목소리를 충분히 크게 내주세요!</MessageText>
            </div>
          </PermissionMessage>
        ) : (
          <PermissionMessage>
            <FaMicrophoneSlash size={70} color="#D9D9D9" />
            <div>
              <ReadyTitle>음성 인식 준비중...</ReadyTitle>
            </div>
          </PermissionMessage>
        )}

        {permissionStatus.camera ? (
          <PermissionMessage>
            <IoIosVideocam size={80} color="white" />
            <div>
              <MessageTitle>얼굴 인식 성공</MessageTitle>
              <MessageText>가운데 위치를 최대한 유지해주세요!</MessageText>
            </div>
          </PermissionMessage>
        ) : (
          <PermissionMessage>
            <IoVideocamOff size={80} color="#D9D9D9" />
            <div>
              <ReadyTitle>웹캠 인식 준비중...</ReadyTitle>
            </div>
          </PermissionMessage>
        )}
      </StatusMessages>
      {permissionStatus.camera && permissionStatus.microphone && (
        <StartButton onClick={handleStartClick}>
          <IoIosArrowForward size={45} color="white" />
        </StartButton>
      )}
    </VideoWrapper>
  );
};

export default VideoRecorder;