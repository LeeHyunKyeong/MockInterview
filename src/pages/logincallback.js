import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../assets/tutorial_background.svg';

const LoginGuide = styled.div`
  background-image: url(${backgroundImg});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-weight: 800;
  font-size: 30px;
  color: white;
`;

const Redirection = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const navigate = useNavigate();
  useEffect(() => {
    const sendCodeToBackend = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/login-callback/',
          {
            code: code,
          }
        );
        console.log(response.data);
        navigate('/start', { state: { nickname: response.data.nickname } });
      } catch (error) {
        console.error(`Error: ${error}`);
        // 오류 처리를 추가합니다.
      }
    };

    if (code) {
      sendCodeToBackend();
    }

    // 3초 후에 start 페이지로 이동합니다.
    const timeoutId = setTimeout(() => {
      navigate('/start');
    }, 3000);

    // cleanup 함수에서 setTimeout을 취소합니다.
    return () => {
      clearTimeout(timeoutId);
    };
  }, [code]);

  return <LoginGuide>로그인 중입니다.</LoginGuide>;
};

export default Redirection;
