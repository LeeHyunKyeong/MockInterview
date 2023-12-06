import React from 'react';
import LoginBackground from '../assets/no_login.svg';
import styled from 'styled-components';
import KakaoLogin from '../assets/kakao_login_large_wide.png';
const LoginWallpaper = styled.div`
  background-image: url(${LoginBackground});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const MainText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 10px;
  line-height: 1.4em;
`;

const LoginPage = () => {
  const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <LoginWallpaper>
      <div>
        <MainText>
          취업 성공의 길을
          <br />
          우리와 함께 해요!
        </MainText>
        <img
          src={KakaoLogin}
          alt="loginbtn"
          style={{ width: '350px', height: 'auto', marginTop: '10px' }}
          onClick={() => (window.location.href = KakaoURL)}
        />
      </div>
    </LoginWallpaper>
  );
};

export default LoginPage;
