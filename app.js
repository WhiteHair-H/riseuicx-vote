// app.js
let viewCount = 0; // 조회수 변수
let visitedIPs = new Set(); // 접속한 IP 주소를 저장하는 Set
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;

app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일: /public, 그리고 프로젝트 루트의 /images 도 /images로 서빙
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// (선택) 팀별 partial 파일 매핑: views/teams/<파일명>.ejs
// include 방식으로 사용할 때 안전한 화이트리스트로만 include 하도록 도와줌
const teamTplMap = {
  'KM Change Makers': 'KMChangeMakers',
  '지속러너스': '지속러너스',
  'ImpactAI': 'ImpactAI',
  '에버리프(Everleaf)': '에버리프',
  'Electric': 'Electric',
  '그린인사이트': '그린인사이트',
  'COMMUNURSE': 'COMMUNURSE',
  'ON:IT': 'ONIT',
  '마이구미': '마이구미',
  'CTU Logos': 'CTULogos',
  '와트솔루션': '와트솔루션',
  // 리빙랩 트랙 팀들 - 파일이 존재하는 것만
  'Joy Ecomatics': 'JoyEcomatics',
  'DLYS': 'DLYS',
  '공감코드': '공감코드',
  'AI Dream Lab': 'AIDreamLab',
  'CSE': 'CSE',
  '언더독': '언더독'
};

const tracks = [
  {
    name: '트랙1: AI SDGs 아이디어톤',
    poster: '/images/트랙 1 포스터.png',
    teams: [
      { name: 'KM Change Makers', image: '/images/KM Change Makers.png' },
      { name: '지속러너스', image: '/images/지속러너스.png' },
      { name: 'ImpactAI', image: '/images/Impact AI.png' },
      { name: '에버리프(Everleaf)', image: '/images/에버리프(Everleaf).png' },
      { name: 'Electric', image: '/images/Electric.png' },
      { name: '그린인사이트', image: '/images/그린인사이트.png' },
      { name: 'COMMUNURSE', image: '/images/COMMUNURSE.png' },
      { name: 'ON:IT', image: '/images/ONIT.png' },
      { name: '마이구미', image: '/images/마이구미.png' },
      { name: 'CTU Logos', image: '/images/CTU Logos.png' },
      { name: '와트솔루션', image: '/images/와트솔루션.png' }
    ]
  },
  {
    name: '트랙2: AI 사회문제해결 리빙랩',
    poster: '/images/트랙 2 포스터.png',
    teams: [
      { name: 'Joy Ecomatics', image: '/images/리빙랩_Joy Ecomatics.png' },
      { name: 'DLYS', image: '/images/리빙랩_DLYS.png' },
      { name: '공감코드', image: '/images/리빙랩_공감코드.png' },
      { name: 'AI Dream Lab', image: '/images/리빙랩_AIDreamLab.png' },
      { name: 'CSE', image: '/images/리빙랩_cse.png' },
      { name: '언더독', image: '/images/리빙랩_언더독.png' }
    ]
  }
];

app.get('/', (req, res) => {
  // 클라이언트 IP 주소 가져오기 (프록시 환경 고려)
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
    (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
    req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  
  // 새로운 IP인 경우에만 접속수 증가
  if (!visitedIPs.has(clientIP)) {
    visitedIPs.add(clientIP);
    viewCount++;
    console.log(`새 방문자: ${clientIP}, 총 접속수: ${viewCount}`);
  } else {
    console.log(`재방문: ${clientIP}, 접속수 유지: ${viewCount}`);
  }
  
  // teamTplMap을 같이 내려주면 index.ejs에서 include('teams/' + teamTplMap[team.name]) 가능
  res.render('index', { tracks, viewCount, teamTplMap });
});

// 관리자용 조회수 확인 페이지
app.get('/admin/views', (req, res) => {
  res.send(`
    <h1>총 접속수: ${viewCount}</h1>
    <h2>방문한 IP 목록 (${visitedIPs.size}개):</h2>
    <ul>
      ${Array.from(visitedIPs).map(ip => `<li>${ip}</li>`).join('')}
    </ul>
    <p><a href="/admin/reset">접속수 초기화</a></p>
  `);
});

// 관리자용 접속수 초기화 페이지
app.get('/admin/reset', (req, res) => {
  const oldCount = viewCount;
  viewCount = 0;
  visitedIPs.clear();
  res.send(`<h1>접속수 초기화 완료!</h1><p>이전 접속수: ${oldCount} → 현재: ${viewCount}</p><p><a href="/admin/views">돌아가기</a></p>`);
});

app.listen(port, () => {
  console.log(`RISE UIC Node.js 서버 실행중: http://localhost:${port}`);
});
