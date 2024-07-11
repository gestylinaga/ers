// ers | Build Calculator

const tableRows = document.querySelectorAll("tr");

// Class List with Stats Spread
const classList = {
  "confessor": [10, 13, 10, 12, 12, 9, 14, 9, 10],
  "vagabond": [15, 10, 11, 14, 13, 9, 9, 7, 9],
  "samurai": [12, 11, 13, 12, 15, 9, 8, 8, 9],
  "prisoner": [11, 12, 11, 11, 14, 14, 6, 9, 9],
  "warrior": [11, 12, 11, 10, 16, 10, 8, 9, 8],
  "hero": [14, 9, 12, 16, 9, 7, 8, 11, 7],
  "prophet": [10, 14, 8, 11, 10, 7, 16, 10, 7],
  "astrologer": [9, 15, 9, 8, 12, 16, 7, 9, 6],
  "bandit": [10, 11, 10, 9, 13, 9, 8, 14, 5],
  "wretch": [10, 10, 10, 10, 10, 10, 10, 10, 1]
}

function clearStats() {
  // Clear Starting Stats
  let existingStats = document.querySelectorAll("td");
  existingStats.forEach(e => e.remove());
  // Clear Opt Box Stats
  let existingOptBoxes = document.querySelectorAll("#optBox");
  existingOptBoxes.forEach(e => e.remove());
}

function populateStats(classStats) {
  let i = 0;
  for (let row of tableRows) {
    const newStat = document.createElement("td");
    newStat.setAttribute("id", "statNum");
    newStat.innerHTML = classStats[i];
    row.appendChild(newStat);
    i++;
  }
}

function getImage(opt) {
  let img = new Image();
  let selectedImg = img.src = `/ers/imgs/${opt}.webp`;
  document.getElementById("selected").src = selectedImg;
}

function createOptBoxes() {
  for (let row of tableRows) {
    const boxDiv = document.createElement("div");
    boxDiv.style.paddingInline = "1rem";
    boxDiv.style.display = "flex";
    boxDiv.style.justifyContent = "center";
    boxDiv.setAttribute("id", "optBox");

    const numInput = document.createElement("input");
    numInput.setAttribute("size", "5");
    numInput.setAttribute("type", "number");
    numInput.setAttribute("min", "0");
    numInput.setAttribute("max", "999");
    numInput.setAttribute("placeholder", "0");
    numInput.style.paddingBlock = ".5rem";
    numInput.addEventListener("change", ()=> {
      console.log("change")
    })

    boxDiv.appendChild(numInput);
    row.appendChild(boxDiv);
  }
}

function updateView() {
  let opt = document.getElementById("classes").value;
  getImage(opt);
  clearStats();
  populateStats(classList[opt])
  createOptBoxes();
}

// Update View on initial load & class change
window.onload = updateView;
document.getElementById("classes").onchange = updateView;

