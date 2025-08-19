const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;

app.set('trust proxy', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const tracks = [
  {
    name: '트랙1: AI SDGs 아이디어톤',
    poster: '/images/트랙 1 포스터.png',
    teams: [
      {
        name: 'KM Change Makers',
        image: '/images/리빙랩_Joy Ecomatics.png'
      },
      {
        name: '마이구미',
        image: '/images/마이구미.png',
        features: 'AI 코스 추천, 로컬 정보 제공, 미션 인증, 후기 등록 및 리워드 제공.',
        tech: '챗GPT 기반 추천·후기 요약, PartyRock 챗봇, Canva 디자인 자료 활용.'
      },
      {
        name: '에버리프(Everleaf)',
        image: '/images/에버리프(Everleaf).png'
      }
    ]
  },
  {
    name: '트랙2: AI 사회문제해결 리빙랩',
    poster: '/images/트랙 2 포스터.png',
    teams: [
      {
        name: 'Joy Ecomatics',
        image: '/images/리빙랩_Joy Ecomatics.png'
      },
      {
        name: 'DLYS',
        image: '/images/리빙랩_DLYS.png'
      },
      {
        name: '공감코드',
        image: '/images/리빙랩_공감코드.png'
      },
            {
        name: 'AI Dream Lab',
        image: '/images/리빙랩_AIDreamLab.png'
      },
            {
        name: 'CSE',
        image: '/images/리빙랩_cse.png'
      },
            {
        name: '언더독',
        image: '/images/리빙랩_언더독.png'
      }
    ]
  }
];

app.get('/', (req, res) => {
  res.render('index', { tracks });
});

app.listen(port, () => {
  console.log(`RISE UIC Node.js 서버 실행중: http://localhost:${port}`);
});

