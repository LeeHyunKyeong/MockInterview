import axios from 'axios';

// 사용자가 게시글을 클릭했을 때 실행되는 함수
export function onReportClick(postId) {
  // 게시글 ID를 사용하여 백엔드에 HTTP 요청을 보냄
  axios
    .get(`http://127.0.0.1:8000/inerview/report?report_id=${postId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}
