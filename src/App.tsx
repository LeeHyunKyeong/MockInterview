import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/test';
import Question from './pages/question';
import Answer from './pages/answer';
import Submit from './pages/submit';
import Mypage from './pages/mypage';
import { MediaStreamProvider } from './media-stream-context';
import LoginPage from './pages/loginpage';
import StartSelectPage from './pages/startpage';
import Report from './pages/report';
import Redirection from './pages/logincallback';
import Tutorials from './pages/tutorials';

function App() {
  return (
    <MediaStreamProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/start" element={<StartSelectPage />}></Route>
          <Route path="logining" element={<Redirection />}></Route>
          <Route path="/tutorials" element={<Tutorials />}></Route>
          <Route path="/report/:postID" element={<Report />} />{' '}
          <Route path="/test" element={<Test />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Router>
    </MediaStreamProvider>
  );
}

export default App;
