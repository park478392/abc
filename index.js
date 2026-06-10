const memberButtons = document.querySelectorAll(".member-toggle");

memberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    card.classList.add("is-open");
  });
});

const typingTitle = document.querySelector("#typing-title");

if (typingTitle) {
  const lineOne = typingTitle.dataset.lineOne || "";
  const lineTwo = typingTitle.dataset.lineTwo || "";
  const fullText = `${lineOne}\n${lineTwo}`;
  let index = 0;

  typingTitle.innerHTML = '<span class="typing-caret"></span>';

  const typeTitle = () => {
    const currentText = fullText.slice(0, index);
    const [firstLine = "", secondLine = ""] = currentText.split("\n");

    typingTitle.innerHTML = `${firstLine}<br />${secondLine}<span class="typing-caret"></span>`;

    if (index < fullText.length) {
      index += 1;
      setTimeout(typeTitle, 85);
    }
  };

  setTimeout(typeTitle, 350);
}

const learningText = document.querySelector("#learning-text");

if (learningText) {
  const learningItems = ["HTML", "CSS", "JavaScript"];
  let learningIndex = 0;

  setInterval(() => {
    learningIndex = (learningIndex + 1) % learningItems.length;
    learningText.textContent = `Currently Learning: ${learningItems[learningIndex]}`;
  }, 2000);
}

const contentTabs = document.querySelectorAll("[data-content-tab]");
const contentLabel = document.querySelector("#content-panel-label");
const contentTitle = document.querySelector("#content-panel-title");
const contentDesc = document.querySelector("#content-panel-desc");
const contentPoints = document.querySelector("#content-panel-points");

const contentData = {
  home: {
    label: "메인 홈",
    title: "메인 홈 화면",
    desc: [
      "사이트에 처음 들어왔을 때 프로젝트의 목적을 바로 이해할 수 있도록 만든 첫 화면입니다.",
      "중간고사 때는 소개와 이동 중심이었다면, 기말고사에서는 사용자가 바로 참여할 수 있는 기능을 추가했습니다.",
      "보안 습관 체크리스트를 통해 비밀번호, 2단계 인증, 링크 확인, 업데이트, 백업 습관을 직접 체크할 수 있게 했습니다.",
      "최신 기사 기반 위험 점수와 추천 확인 항목을 보여주어 보안 점검의 시작점 역할을 하도록 구성했습니다.",
    ],
    points: ["보안 습관 체크리스트", "최신 기사 기반 위험 점수", "주요 페이지 바로가기"],
  },
  issue: {
    label: "보안 이슈",
    title: "보안 이슈 페이지",
    desc: [
      "피싱, 랜섬웨어, 개인정보 유출처럼 실제로 자주 발생하는 보안 위협을 뉴스 카드로 정리했습니다.",
      "뉴스 카테고리 필터와 더보기 기능을 추가해 사용자가 원하는 이슈를 골라 볼 수 있게 했습니다.",
      "각 뉴스 카드는 제목만 보여주는 것이 아니라 클릭하면 요약과 원본 기사 링크를 확인할 수 있도록 구성했습니다.",
      "유튜브 보안 트렌드 영상과 채널별 필터를 배치해 글과 영상 자료를 함께 활용할 수 있도록 발전시켰습니다.",
    ],
    points: ["뉴스 카테고리 필터", "유튜브 영상 자동 불러오기", "채널별 영상 분류"],
  },
  owasp: {
    label: "OWASP",
    title: "OWASP Top 10",
    desc: [
      "웹 보안에서 중요하게 다루는 OWASP Top 10 취약점을 정리한 페이지입니다.",
      "취약점 이름만 나열하지 않고, 어떤 상황에서 문제가 발생하는지와 왜 위험한지를 설명했습니다.",
      "취약 코드와 보안 조치 방향을 함께 보여주어 개발 관점에서 어떤 부분을 조심해야 하는지 이해할 수 있게 했습니다.",
      "XSS, 접근 통제, 인증 실패처럼 실습 페이지에서 다루는 주제와 연결되도록 구성했습니다.",
    ],
    points: ["OWASP 핵심 취약점 정리", "취약 원인과 대응 방법", "보안 실습과 연결"],
  },
  practice: {
    label: "보안 실습",
    title: "대화형 보안 취약점 실습",
    desc: [
      "기말고사에서 가장 크게 확장된 실습형 페이지입니다.",
      "XSS, 접근 통제, 무차별 대입 공격을 취약한 환경과 안전한 환경으로 나누어 배치했습니다.",
      "사용자는 안내된 미션을 따라 입력값을 넣거나 브라우저 저장소를 조작하면서 공격이 어떤 방식으로 성공하는지 확인할 수 있습니다.",
      "공격 결과를 직접 확인한 뒤, 코드 비교 영역에서 취약한 구현과 보안 조치된 구현의 차이를 볼 수 있습니다.",
    ],
    points: ["BAD / GOOD 환경 비교", "XSS·접근 통제·무차별 대입 실습", "취약 코드와 보안 코드 비교"],
  },
  diagnosis: {
    label: "위험 진단",
    title: "실생활 보안 위험 진단",
    desc: [
      "사용자가 직접 입력한 정보를 바탕으로 보안 위험도를 확인할 수 있는 진단 페이지입니다.",
      "비밀번호는 길이, 문자 조합, 반복 패턴을 분석하고 메일은 피싱에 자주 쓰이는 위험 신호를 확인합니다.",
      "URL 검사는 HTTPS 여부, IP 주소 사용, 단축 링크, 의심 키워드를 점검하고 결과를 점수와 이유로 보여줍니다.",
      "검사 결과가 단순히 안전 또는 위험으로 끝나지 않고 어떤 부분을 개선해야 하는지 안내하도록 만들었습니다.",
    ],
    points: ["비밀번호 안전도 검사", "피싱 메일 위험도 검사", "URL 안전도 검사"],
  },
  guide: {
    label: "보안 수칙",
    title: "보안 수칙 및 가이드",
    desc: [
      "사용자가 실생활에서 바로 적용할 수 있는 보안 습관을 정리한 페이지입니다.",
      "계정 관리, 기기 보안, 피싱 대응, 데이터 보호 탭을 만들고 선택한 탭에 따라 카드 내용이 바뀌도록 구현했습니다.",
      "각 카드에는 위험 상황, 대응 방법, 강화 방법, 관리 방법을 함께 넣어 단순한 문장보다 실천하기 쉬운 정보가 되도록 했습니다.",
      "O/X 보안 상식 퀴즈를 추가해 자신의 보안 이해도를 점검하고 해설을 통해 다시 학습할 수 있게 했습니다.",
    ],
    points: ["탭으로 분류한 보안 수칙", "동적으로 바뀌는 카드", "O/X 퀴즈와 결과 피드백"],
  },
};

if (contentTabs.length && contentLabel && contentTitle && contentDesc && contentPoints) {
  contentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = contentData[tab.dataset.contentTab];

      if (!selected) return;

      contentTabs.forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");

      contentLabel.textContent = selected.label;
      contentTitle.textContent = selected.title;
      contentDesc.innerHTML = selected.desc.map((item) => `<li>${item}</li>`).join("");
      contentPoints.innerHTML = selected.points
        .map((point) => `<span>${point}</span>`)
        .join("");
    });
  });
}
