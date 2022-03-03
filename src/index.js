function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const canvas = document.querySelector("#canvas");

const height = window.innerHeight;
const width = window.innerWidth;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

//create an array of 10 element, height should be less than half of the screen height
const array = (() => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(generateRandomNumber(50, height - 50));
  }
  return arr;
})();

//draw a base lint at bottom
ctx.beginPath();
ctx.moveTo(0, height - 50);
ctx.lineTo(width - 50, height - 50);
ctx.strokeStyle = "red";
ctx.stroke();
ctx.closePath();

//draw the lines of array

const drawedItemsPath = [];

array.forEach((element, i) => {
  const clr = ["green", "yellow", "blue", "lightblue", "orange"];
  const color = clr[generateRandomNumber(0, 4)];
  ctx.fillStyle = color;
  const xWhereToStart = 50 * i;

  const yWhereToStart = height - 50 - element;
  const yWhereToEnd = element;

  ctx.fillRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
  ctx.closePath();
  drawedItemsPath.push({
    color,
    yWhereToEnd,
    xWhereToStart,
    yWhereToStart,
    iWidth: 20,
    element,
    height,
    i
  });
});

const sortedDrawItems = drawedItemsPath.sort((a, b) => b.element - a.element);

renderSort();
function pick(x, idx) {
  return new Promise((res) => {
    setTimeout(() => {
      replaceItem(x, idx);
      res(x);
    }, 1000);
  });
}

function replaceItem(data, idx) {
  ctx.beginPath();
  ctx.fillStyle = "white";
  const { xWhereToStart, yWhereToStart, yWhereToEnd, color, i } = data;
  ctx.clearRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
  ctx.fillRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
  ctx.closePath();

  //draw circle in end
  ctx.beginPath();
  ctx.fillStyle = color || "black";
  let x = idx * 20 + 20 + 20;
  const xNewStart = width - x;
  console.log(idx, color, xNewStart, 20, yWhereToStart, yWhereToEnd);
  ctx.fillRect(xNewStart, yWhereToStart, 20, yWhereToEnd);
  ctx.closePath();
}

async function renderSort() {
  for (let i = 0; i < sortedDrawItems.length; i++) {
    await pick(sortedDrawItems[i], i);
  }
}
