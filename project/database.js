//database.js

const axios = require("axios");
const { sleep }= require("./handleRequest");
const { disconnectDB } = require("./connectDB");
const queryList = [
  // 컴퓨터 주변기기
  "마우스", "마우스","키보드", "모니터", "노트북", "프린터", 
  "스캐너", "데스크탑", "태블릿", "스피커", "헤드폰", 
  "마이크", "웹캠", "USB", "하드 디스크", 
  "마우스 패드", "이어폰", "그래픽카드", 
  "SSD", "USB허브",
  //가전제품
  "청소기","무선청소기","냉장고","세탁기","김치냉장고","전자레인지","오븐","가스레인지",
  "인덕션","에어프라이어","로봇청소기", "식기세척기", "믹서기", "블렌더", "커피 메이커", 
  "커피 머신", "전기 주전자", "전기 포트", "다리미", "건조기", "공기청정기", "가습기", "제습기",
  "히터", "난로", "스팀 다리미", "사운드바", "프로젝터", "CCTV", "홈캠",
  // 의류
  "티셔츠", "바지", "원피스", "스커트", "셔츠", 
  "맨투맨", "후드티", "자켓", "코트", "점퍼", 
  "가디건", "청바지", "슬랙스", "블라우스", "니트", 
  "청자켓", "언더웨어", "브라", "양말", "안경", "MLB", "비니",
  // 가구
  "소파", "침대", "테이블", "의자", "책상", 
  "수납장", "옷장", "선반", "식탁", "서랍장", 
  "벽시계", "TV", "세탁기", "냉장고", "전자레인지", 
  "세면대", "욕실 선반", "걸이",
  // 미용용품
  "화장품", "클렌징", "스킨", "메이크업", "바디",
  "헤어", "향수", "네일", "립스틱", "선크림", 
  "염색", "샴푸", "컨디셔너", "팩", "고데기",
  "블러셔", "섀도우", "립스틱", "파운데이션", "헤어 스프레이",
  // 반려동물
  "사료", "사료", "애견용품", "목줄", "애견옷", "애견 캐리어", 
  "강아지 가방", "USB허브", "강아지 간식", "고양이 간식", "츄르", 
  "캣닢", "강아지 영양제",
  // 취미
  "그림", "자수", "뜨개질", "바느질",
  "도자기", "피아노", "기타", "음악",
  "요리", "헬스", "다이빙", "등산", "캠핑", 
  "낚시", "바둑", "체스", "골프", "수영", "어항",
  // 전자기기
  "스마트폰", "태블릿", "노트북", "데스크탑", "스마트워치",
  "이어폰", "블루투스", "블루투스 이어폰", "버즈",  "에어팟",  
  "아이패드",  "갤럭시 탭",  "카메라", "드론", "스마트홈",
  "콘솔", "모니터", "프린터", "스캐너", "USB", "HDD", "VR",
  //브랜드-PC관련
  "로지텍",  "ASUS", "삼성",  "애플",  "LG",  "하웨이",  
  "레이저",  "MSI",  "샤오미",  "레노버",  "HP", "DELL", 
  "한성컴퓨터", "주연테크",
  //브랜드-옷
  "캘빈클라인", "나이키", "아디다스", "에잇세컨즈", "스파오", 
  "캔버스", "PUMA", "내셔널지오그래픽", "H&M", "Zara", "UNIQLO",
  "언더아머", "GUESS", "FILA",
  //브랜드-화장품
  "피지오겔", "피에르떼", "아벤느", "이니스프리", "미쟝센", "닥터지",
  "도루코", "아이디얼", "니베아", "더페이스샵", "설화수", "미샤", 
  "애터미", "헤라", "네이쳐리퍼블릭", "AHC", "토니모리",
  //명품
  "GUCCI", "HERMES", "BERLUTI", "LOUIS VUITTON", "PRADA", 
  "BURBERRY", "BALENCIAGA", "THOM BROWNE", "MONTBLANC", "롤렉스", 
  //잡
  "연필", "샤프", "일렉기타", "베이스", "테이프", "가위", "과도", 
  "식칼", "수건", "모자", "부채", "안경닦이", "종이", "A4용지", 
  "볼펜", "수정테이프", "필통", "폴라로이드", "스티커", "피규어", 
  "선풍기", "에어컨", "축구", "농구", "야구", "글러브", "배드민턴",
  "테니스", "탁구", "배구", "족구", "인라인", "킥보드","셔틀콕", 
  "휴대폰", "스마트폰", "오디오 인터페이스", "오인페", "지갑", 
  "휴대용", "휴대용", "이불", "담요", "인형", "인테리어", "커튼", 
  "인형", "양모펠트", "닌텐도", "스위치", "게임", "닌텐도 칩", 
  "게이밍", "무드등", "건전지", "무선 이어폰", "드라이기", "노트", 
  "클리어파일", "화일", "캐리어", "장난감", "마스크", "자전거", 
  "온도계", "체온계", "물티슈", "휴지", "키친타올"
];
console.log(queryList.length);
/**
 * 
 * @param {*} connection DB 연결
 * @param {*} query 읽어올 데이터 쿼리
 */
async function fetchDataAndSaveToDB(connection, query) {
  try {
    // 네이버 API 요청
    const response = await axios.get(
      "https://openapi.naver.com/v1/search/shop",
      {
        headers: {
          "X-Naver-Client-Id": "3BScfGDn5DZgS5ac84Wq",
          "X-Naver-Client-Secret": "CXgIgZlFqa",
        },
        params: {
          query: `${query}`,
          display: 100,
          sort: "sim",
        },
      }
    );
    console.log(query + " data is collected...");

    // 받은 데이터
    const data = response.data.items;

    // OracleDB에 데이터 삽입
    for (let i = 0; i < data.length; i++) {
      await connection.execute(
        `INSERT INTO productInfo (productId, productName, productPrice, imageLink, dataLink, category1, category2, category3, category4, hprice) VALUES (:productId, :productName, :productPrice, :imageLink, :dataLink, :category1, :category2, :category3, :category4, :hprice)`,
        {
          productId: data[i].productId,
          productName: data[i].title,
          productPrice: data[i].lprice,
          imageLink: data[i].image,
          dataLink: data[i].link,
          category1: data[i].category1,
          category2: data[i].category2,
          category3: data[i].category3,
          category4: data[i].category4,
          hprice: data[i].hprice,
        },
        { autoCommit: true }
      );
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}


async function updateTable(connection) {
  connection.execute(`TRUNCATE TABLE productInfo`);
  try {
    for (const query of queryList) {
      await fetchDataAndSaveToDB(connection, query);
      await sleep(1000); // 1초 대기 API 요청 속도 규정에 따르기 위함.
    }
  } catch (error) {
    console.error(error);
  } finally {
    await disconnectDB(connection);
  }
}
module.exports = { fetchDataAndSaveToDB, updateTable };
