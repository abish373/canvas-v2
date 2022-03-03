function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const canvas = document.querySelector("#canvas");

const height = window.innerHeight;
const width = window.innerWidth;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, width, height);

//create an array of 10 element, height should be less than half of the screen height
const array = (() => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
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
  ctx.fillStyle = clr[i];
  const xWhereToStart = 50 * i; //need to

  const yWhereToStart = height - 50 - element;
  const yWhereToEnd = element;

  ctx.fillRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
  ctx.closePath();
  drawedItemsPath.push({
    color: clr[i],
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
function pick(x) {
  return new Promise((res) => {
    setTimeout(() => {
      replaceItem(x);
      res(x);
    }, 1000);
  });
}

function replaceItem(data) {
  ctx.beginPath();
  // ctx.fillStyle = "white";
  const { xWhereToStart, yWhereToStart, yWhereToEnd } = data;
  ctx.clearRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
  ctx.fillRect(xWhereToStart, yWhereToStart, 20, yWhereToEnd);
}

async function renderSort() {
  for (let x of sortedDrawItems) {
    await pick(x);
  }
}
