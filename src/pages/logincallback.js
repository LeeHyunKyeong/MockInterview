import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  }, [code]);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
