const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

const colors = [
  "#ef4444",
  "#f59e0b",
  "#84cc16",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
  "#f97316",
  "#22c55e",
];

let items = [
  "1\uBC88",
  "2\uBC88",
  "3\uBC88",
  "4\uBC88",
  "5\uBC88",
  "6\uBC88",
  "7\uBC88",
  "8\uBC88",
];
let currentRotation = 0;
let isSpinning = false;

render();
spinBtn.addEventListener("click", spinRoulette);
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);

function render() {
  const degreePerItem = 360 / items.length;

  renderRoulette(degreePerItem);
  renderItemList();

  spinBtn.disabled = isSpinning || items.length < 2;
  if (items.length < 2) {
    resultText.textContent = "\uD56D\uBAA9\uC744 2\uAC1C \uC774\uC0C1 \uCD94\uAC00\uD574 \uC8FC\uC138\uC694.";
  }
}

function renderRoulette(degreePerItem) {
  roulette.innerHTML = "";
  roulette.style.background = makeRouletteGradient(degreePerItem);

  items.forEach((label, index) => {
    const item = document.createElement("span");
    item.className = "roulette-item";
    item.style.setProperty("--angle", `${index * degreePerItem}deg`);
    item.textContent = label;
    roulette.appendChild(item);
  });
}

function makeRouletteGradient(degreePerItem) {
  const offset = degreePerItem / -2;
  const segments = items.map((_, index) => {
    const start = index * degreePerItem;
    const end = (index + 1) * degreePerItem;
    const color = colors[index % colors.length];
    return `${color} ${start}deg ${end}deg`;
  });

  return `conic-gradient(from ${offset}deg, ${segments.join(", ")})`;
}

function renderItemList() {
  itemList.innerHTML = "";

  items.forEach((label, index) => {
    const listItem = document.createElement("li");
    const name = document.createElement("span");
    const removeButton = document.createElement("button");

    name.className = "item-name";
    name.textContent = label;

    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.dataset.index = index;
    removeButton.setAttribute("aria-label", `${label} \uC0AD\uC81C`);
    removeButton.textContent = "x";

    listItem.append(name, removeButton);
    itemList.appendChild(listItem);
  });
}

function addItem(event) {
  event.preventDefault();

  const value = itemInput.value.trim();
  if (!value || isSpinning) return;

  items.push(value);
  itemInput.value = "";
  resultText.textContent = `${value} \uCD94\uAC00\uC644\uB8CC!`;
  render();
  itemInput.focus();
}

function removeItem(event) {
  const button = event.target.closest(".remove-button");
  if (!button || isSpinning) return;

  const index = Number(button.dataset.index);
  const removed = items[index];
  items.splice(index, 1);
  resultText.textContent = `${removed} \uC0AD\uC81C\uC644\uB8CC!`;
  render();
}

function spinRoulette() {
  if (isSpinning || items.length < 2) return;

  const degreePerItem = 360 / items.length;
  const winningIndex = Math.floor(Math.random() * items.length);
  const targetCenter = winningIndex * degreePerItem;
  const extraSpins = 6 + Math.floor(Math.random() * 3);
  const landingRotation = 360 - targetCenter;

  isSpinning = true;
  spinBtn.disabled = true;
  itemInput.disabled = true;
  resultText.textContent = "\uB3CC\uC544\uAC00\uB294 \uC911...";

  currentRotation += extraSpins * 360 + landingRotation - (currentRotation % 360);
  roulette.style.transform = `rotate(${currentRotation}deg)`;

  window.setTimeout(() => {
    isSpinning = false;
    itemInput.disabled = false;
    resultText.textContent = `\uACB0\uACFC: ${items[winningIndex]} \uB2F9\uCCA8!`;
    render();
  }, 4000);
}
