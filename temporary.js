// Variables

const flagButton = document.getElementById("flag");
const saveEntryBtn = document.getElementById("saveEntry");

let submitFormBtn = document.getElementById("submitButton");

//
function addArrayToDailyEntryObj() {
  if (exercises > 0) {
    dailyEntryObj.exercises = exercises;
  } else if (habits > 0) {
    dailyEntryObj.habits = habits;
  } else if (medications > 0) {
    dailyEntryObj.medications = medications;
  }
}

submitFormBtn.addEventListener("submit", (event) => {
  addArrayToDailyEntryObj();
  console.log(dailyEntryObj);
});

//  Save entry (unnecessary)
saveEntryBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updateJournal();
  console.log("Updated journal property");
  console.log(dailyEntryObj);
});

// General Functions (Updates Required)
