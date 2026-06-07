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
