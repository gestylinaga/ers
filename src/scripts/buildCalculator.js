// ers | Build Calculator

// Grabs Existing Table Elements (rows & headers)
const tableRows = document.querySelectorAll("tr");
const statNamesRaw = document.querySelectorAll("th");

// Creates Table of Stat Names (in order)
let statNames = [];
for (let name of statNamesRaw) {
  statNames.push(name.innerText.toLowerCase());
}

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

// Clears First 2 Table Rows (on class change)
function clearStats() {
  // Clear Starting Stats
  let existingStats = document.querySelectorAll("td");
  existingStats.forEach(e => e.remove());
  // Clear Opt Box Stats
  let existingOptBoxes = document.querySelectorAll("#optBox");
  existingOptBoxes.forEach(e => e.remove());
}

// Creates Stat Number Column (with selected class)
function populateStats(classStats) {
  let i = 0;
  for (let row of tableRows) {
    const newStat = document.createElement("td");
    newStat.setAttribute("id", `starting-${statNames[i]}`);
    newStat.innerHTML = classStats[i];
    newStat.style.textAlign = "center";
    newStat.style.paddingInline = "1rem";
    row.appendChild(newStat);
    i++;
  }
}

// Resets Class Image (on class change)
function getImage(opt) {
  let img = new Image();
  let selectedImg = img.src = `/ers/imgs/${opt}.webp`;
  document.getElementById("selected").src = selectedImg;
}

// Calculates Final Column Totals
function calcTotals() {
  // Create Totals Columns
  let i = 0;
  for (let row of tableRows) {
    const newTotal = document.createElement("td");

    // Parsing correct values to corresponding stats
    let stat = statNames[i];
    let starting = `starting-${stat}`;
    let modifier = `${stat}-modifier`;
    let a = parseInt(document.getElementById(starting).innerText);
    let b = parseInt(document.getElementById(modifier).value);

    // Calculating / displaying new stat total
    newTotal.innerHTML = a + b;
    newTotal.setAttribute("id", `${stat}-total`);
    newTotal.style.textAlign = "center";
    newTotal.style.paddingInline = "1rem";

    // Add updated total to row
    row.appendChild(newTotal);
    i++
  }
}

// Manually Adjusts "Level" Stat / Row
function adjustRL() {
  let totalStats = 0;
  // Add up stat modifier values
  for (let stat of document.querySelectorAll("input")) {
    totalStats += parseInt(stat.value);
  }
  // Subtract level-modifier value
  totalStats -= parseInt(document.getElementById("level-modifier").value);
  console.log(totalStats);

  // Adjust Level Modifier by total
  let rlModifier = document.getElementById("level-modifier");
  rlModifier.value = parseInt(totalStats);

  // manually adjust level-total element
  const startingLevel = parseInt(document.getElementById("starting-level").innerHTML);
  const currentValue = parseInt(document.getElementById("level-modifier").value);
  const totalLevel = document.getElementById("level-total");
  totalLevel.innerHTML = startingLevel + currentValue;

}

// Triggers on Opt Box interaction
function handleStatChange() {
  // Deletes Old Totals
  for (let stat of statNames) {
    let oldStat = document.getElementById(`${stat}-total`);
    oldStat.remove();
  }

  // Calculate New Totals
  calcTotals();
  // Adust Rune Level Stat Manually
  adjustRL();
}

// Creates Table's Individual Opt Boxes
function createOptBoxes() {
  let i = 0;
  // Create an Option Box on Each Table Row
  for (let row of tableRows) {
    // Create container div
    const boxDiv = document.createElement("div");
    boxDiv.style.paddingInline = "1rem";
    boxDiv.style.display = "flex";
    boxDiv.style.justifyContent = "center";
    boxDiv.setAttribute("id", "optBox");

    // Create / Style each input
    const numInput = document.createElement("input");
    numInput.setAttribute("size", "3");
    numInput.setAttribute("type", "number");
    numInput.setAttribute("min", "0");
    numInput.setAttribute("max", "999");
    numInput.setAttribute("value", "0");
    numInput.setAttribute("id", `${statNames[i]}-modifier`);
    numInput.style.paddingBlock = ".5rem";
    numInput.style.textAlign = "center";

    numInput.addEventListener("change", ()=> {
      handleStatChange();
    })

    // Add input to container, then container to row
    boxDiv.appendChild(numInput);
    row.appendChild(boxDiv);
    i++;
  }
}

// Updates Entire Display on Class Change
function updateView() {
  let opt = document.getElementById("classes").value;
  getImage(opt);
  clearStats();
  populateStats(classList[opt])
  createOptBoxes();
  calcTotals();
}

// Update View on initial load & class change
window.onload = updateView;
document.getElementById("classes").onchange = updateView;

