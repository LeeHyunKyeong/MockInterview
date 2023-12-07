import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Wallpaper } from './startpage';
import { FadeInText } from './tutorials';

const Redirection = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const navigate = useNavigate();

  useEffect(() => {
    const sendCodeToBackend = async () => {
      if (code) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/kakaoLoginLogicRedirect/', { code });
          console.log(response.data);
          navigate('/start', { state: { nickname: response.data.nickname } });
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    };

    sendCodeToBackend();

  }, [code, navigate]);

  return (
    <Wallpaper>
      <FadeInText>로그인 중입니다.</FadeInText>
    </Wallpaper>
  );
};

export default Redirection;
