import styled from 'styled-components';
import backgroundImg from '../assets/tutorial_background.svg';
import { useNavigate, useLocation } from 'react-router-dom';

export const Wallpaper = styled.div`
  background-image: url(${backgroundImg});
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const GuideText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 30px;
  margin-bottom: 10px;
`;

export const Selectbtn = styled.button`
  background-color: #2d0f7b;
  width: 200px;
  height: 70px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  border: none;
  border-radius: 0.8rem;
  margin: 10px;
`;

const StartSelectPage = () => {
  const location = useLocation();
  let name;

  if (location && location.state && location.state.nickname) {
    name = location.state.nickname;
    console.log(name);
  } else {
    name = '현경';
  }

  const navigate = useNavigate();
  const PageNavTutorial = () => {
    navigate('/tutorials', { state: { nickname: name } });
  };
  const PageNavMypage = () => {
    navigate('/mypage', { state: { nickname: name } });
  };
  return (
    <Wallpaper>
      <div>
        <GuideText>안녕하세요. {name}님.</GuideText>
        <div>
          <Selectbtn onClick={PageNavTutorial}>튜토리얼</Selectbtn>
          <Selectbtn onClick={PageNavMypage}>마이페이지</Selectbtn>
        </div>
      </div>
    </Wallpaper>
  );
};

export default StartSelectPage;
