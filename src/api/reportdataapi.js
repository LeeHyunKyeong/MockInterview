import axios from 'axios';

// 사용자가 게시글을 클릭했을 때 실행되는 함수
export async function onReportClick(postId) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/report?report_id=${postId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
