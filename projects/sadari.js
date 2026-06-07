const menuInput = document.querySelector("#menuInput");
const addMenuButton = document.querySelector("#addMenuButton");
const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");
const menuList = document.querySelector("#menuList");
const result = document.querySelector("#result");
const ladderCanvas = document.querySelector("#ladderCanvas");
const ladderCover = document.querySelector("#ladderCover");
const numberChoices = document.querySelector("#numberChoices");
const ctx = ladderCanvas.getContext("2d");

const menus = [];
let bridges = [];
let selectedPath = [];
let selectedStartColumn = null;
let isCovered = true;

function makeBridges() {
  bridges = [];

  if (menus.length < 2) {
    return;
  }

  const rows = Math.max(5, menus.length * 2);

  for (let row = 0; row < rows; row += 1) {
    const usedColumns = new Set();
    const bridgeCount = Math.floor(Math.random() * Math.max(1, menus.length - 1)) + 1;

    for (let count = 0; count < bridgeCount; count += 1) {
      const column = Math.floor(Math.random() * (menus.length - 1));

      if (usedColumns.has(column) || usedColumns.has(column - 1) || usedColumns.has(column + 1)) {
        continue;
      }

      usedColumns.add(column);
      bridges.push({ row, column });
    }
  }
}

function getLadderLayout() {
  const width = ladderCanvas.width;
  const height = ladderCanvas.height;
  const top = 56;
  const bottom = height - 56;
  const left = 48;
  const right = width - 48;
  const columnGap = menus.length > 1 ? (right - left) / (menus.length - 1) : 0;
  const rowCount = Math.max(5, menus.length * 2);
  const rowGap = (bottom - top) / (rowCount + 1);

  return { width, height, top, bottom, left, columnGap, rowGap };
}

function drawText(text, x, y, maxWidth) {
  const clipped = text.length > 8 ? `${text.slice(0, 8)}...` : text;
  ctx.fillText(clipped, x, y, maxWidth);
}

function drawLadder() {
  const { width, height, top, bottom, left, columnGap, rowGap } = getLadderLayout();

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfdff";
  ctx.fillRect(0, 0, width, height);

  if (menus.length < 2) {
    ctx.fillStyle = "#8a94a6";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("메뉴를 2개 이상 추가하면 사다리가 나타납니다.", width / 2, height / 2);
    return;
  }

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#334155";

  menus.forEach((menu, index) => {
    const x = left + columnGap * index;

    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();

    ctx.fillStyle = "#1f2937";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    drawText(`${index + 1}번`, x, 26, 80);
    drawText(menu, x, height - 24, 90);
  });

  ctx.strokeStyle = "#f59e0b";
  bridges.forEach(({ row, column }) => {
    const x1 = left + columnGap * column;
    const x2 = left + columnGap * (column + 1);
    const y = top + rowGap * (row + 1);

    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
  });

  if (selectedPath.length > 1) {
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 6;
    ctx.beginPath();
    selectedPath.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
        return;
      }

      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
}

function updateCover() {
  ladderCover.classList.toggle("hidden", !isCovered);

  if (menus.length < 2) {
    ladderCover.textContent = "메뉴를 추가해 주세요";
    return;
  }

  ladderCover.textContent = "번호를 고르고 사다리타기!";
}

function traceLadder(startColumn) {
  const { top, bottom, left, columnGap, rowGap } = getLadderLayout();
  const sortedBridges = [...bridges].sort((a, b) => a.row - b.row);
  const path = [{ x: left + columnGap * startColumn, y: top }];
  let column = startColumn;

  sortedBridges.forEach((bridge) => {
    if (bridge.column !== column && bridge.column + 1 !== column) {
      return;
    }

    const y = top + rowGap * (bridge.row + 1);
    const currentX = left + columnGap * column;
    const nextColumn = bridge.column === column ? column + 1 : column - 1;
    const nextX = left + columnGap * nextColumn;

    path.push({ x: currentX, y });
    path.push({ x: nextX, y });
    column = nextColumn;
  });

  path.push({ x: left + columnGap * column, y: bottom });

  return { column, path };
}

function resetRound() {
  selectedPath = [];
  selectedStartColumn = null;
  isCovered = true;
}

function renderMenus() {
  menuList.innerHTML = "";

  if (menus.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "아직 추가된 메뉴가 없습니다.";
    menuList.appendChild(emptyItem);
    return;
  }

  menus.forEach((menu, index) => {
    const item = document.createElement("li");
    item.textContent = menu;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "secondary";
    removeButton.textContent = "삭제";
    removeButton.addEventListener("click", () => {
      menus.splice(index, 1);
      resetRound();
      makeBridges();
      renderMenus();
      renderNumberChoices();
      updateGuideText();
      drawLadder();
      updateCover();
    });

    item.appendChild(removeButton);
    menuList.appendChild(item);
  });
}

function renderNumberChoices() {
  numberChoices.innerHTML = "";

  menus.forEach((menu, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${index + 1}번`;
    button.title = menu;
    button.classList.toggle("selected", selectedStartColumn === index);
    button.addEventListener("click", () => {
      selectedStartColumn = index;
      selectedPath = [];
      isCovered = true;
      renderNumberChoices();
      updateGuideText();
      drawLadder();
      updateCover();
    });

    numberChoices.appendChild(button);
  });
}

function updateGuideText() {
  if (menus.length < 2) {
    result.textContent = "메뉴를 2개 이상 추가해 주세요.";
    return;
  }

  if (selectedStartColumn === null) {
    result.textContent = "출발할 번호를 선택해 주세요.";
    return;
  }

  result.textContent = `${selectedStartColumn + 1}번 선택 완료! 사다리타기 버튼을 눌러주세요.`;
}

function addMenu() {
  const menu = menuInput.value.trim();

  if (!menu) {
    menuInput.focus();
    return;
  }

  menus.push(menu);
  resetRound();
  makeBridges();
  menuInput.value = "";
  menuInput.focus();
  renderMenus();
  renderNumberChoices();
  updateGuideText();
  drawLadder();
  updateCover();
}

function pickMenu() {
  if (menus.length < 2) {
    updateGuideText();
    return;
  }

  if (selectedStartColumn === null) {
    updateGuideText();
    return;
  }

  const traced = traceLadder(selectedStartColumn);

  selectedPath = traced.path;
  isCovered = false;
  drawLadder();
  updateCover();
  result.textContent = `${selectedStartColumn + 1}번 출발! 오늘의 점심은 ${menus[traced.column]}!`;
}

function resetMenus() {
  menus.length = 0;
  bridges = [];
  resetRound();
  menuInput.value = "";
  renderMenus();
  renderNumberChoices();
  updateGuideText();
  drawLadder();
  updateCover();
  menuInput.focus();
}

addMenuButton.addEventListener("click", addMenu);
startButton.addEventListener("click", pickMenu);
resetButton.addEventListener("click", resetMenus);

menuInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addMenu();
  }
});

renderMenus();
renderNumberChoices();
updateGuideText();
drawLadder();
updateCover();
