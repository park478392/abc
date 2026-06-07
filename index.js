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
    label: "Main Page",
    title: "메인 홈 화면",
    desc: "사이트에 처음 들어왔을 때 프로젝트의 목적을 바로 이해할 수 있도록 만든 첫 화면입니다. 사이버 보안 교육 사이트라는 주제가 잘 드러나도록 제목과 소개 문구를 배치했고, 사용자가 필요한 페이지로 자연스럽게 이동할 수 있도록 네비게이션을 구성했습니다.",
    points: ["프로젝트 목적을 보여주는 첫 화면", "대표 보안 수칙 요약", "페이지 이동을 돕는 네비게이션"],
  },
  issue: {
    label: "Security Issues",
    title: "보안 이슈 페이지",
    desc: "피싱, 랜섬웨어, 개인정보 유출처럼 실제로 자주 발생하는 보안 위협을 사용자가 쉽게 이해할 수 있도록 정리한 페이지입니다. 어려운 보안 용어만 나열하지 않고, 사례와 이미지 자료를 함께 배치해 위험성을 직관적으로 파악할 수 있게 만들었습니다.",
    points: ["실제 보안 위협 사례 정리", "피싱과 랜섬웨어 설명", "뉴스와 이미지 자료 활용", "사용자 눈높이에 맞춘 설명"],
  },
  owasp: {
    label: "OWASP",
    title: "OWASP Top 10",
    desc: "웹 보안에서 중요하게 다루는 OWASP Top 10 취약점을 소개한 페이지입니다. SQL Injection, XSS, CSRF 같은 대표 취약점이 어떤 방식으로 발생하는지 설명하고, 단순한 개념 소개를 넘어 원인과 대응 방법까지 함께 정리했습니다.",
    points: ["대표 웹 취약점 설명", "SQL Injection과 XSS 정리", "취약 코드와 대응 방식 비교", "보안 조치의 필요성 강조"],
  },
  guide: {
    label: "Security Guide",
    title: "보안 수칙 및 가이드",
    desc: "사용자가 실생활에서 바로 적용할 수 있는 보안 습관을 정리한 페이지입니다. 강한 비밀번호 만들기, 공용 WiFi 사용 시 주의점, 의심스러운 링크를 피하는 방법 등을 카드 형태로 보여주고, JavaScript를 활용해 클릭 시 추가 정보와 퀴즈 결과가 나타나도록 구현했습니다.",
    points: ["실생활 보안 수칙 제공", "카드 클릭 인터랙션 구현", "퀴즈 정답 확인 기능", "위험한 행동과 안전한 행동 비교"],
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
      contentDesc.textContent = selected.desc;
      contentPoints.innerHTML = selected.points
        .map((point) => `<span>${point}</span>`)
        .join("");
    });
  });
}
