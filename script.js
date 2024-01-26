const exercises = [];
const habits = [];
const medications = [];
const journalEntries = [];

const dailyEntryObj = {
  date: new Date(),
  journal: "",
  isFlagged: false,
  emotionTracker: "",
  waterTracker: "",
  medications: [],
  exercises: [],
  habits: [],
};

// DOM Variables
const form = document.getElementById("dailyEntry");
let addMedForm = document.querySelector("#addMedicationForm");
let accordionItems = document.querySelectorAll(".accordion-item");
const flagButton = document.getElementById("flag");
const saveEntryBtn = document.getElementById("saveEntry");
let radioChoices = document.getElementsByClassName("radioChoices");
let submitFormBtn = document.getElementById("submitButton");

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

function addMedItem(medArray, medBtnID, medListID) {
  let addForm = document.getElementById(medBtnID);
  let date = new Date();

  addForm.addEventListener("click", (event) => {
    event.preventDefault();
    let newMedInput = document.getElementById("newMedication").value; //added value here to change in addMedItem()
    let medCountInput = document.getElementById("medCount").value; // added same
    if (newMedInput && medCountInput > 0) {
      const medObject = {
        MedText: newMedInput,
        MedCount: medCountInput,
      };

      medArray.push(medObject);
      updateMedList(medArray, medListID);
      newMedInput = "";
      medCountInput = "";
    }
  });
}

accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  //! Added this as clicking anywhere inside the content was toggling the accordion. This way it only toggles when clicking the header
  let header = item.querySelector(".accordion-header");
  console.log("content", content);

  content.style.display = "none";

  //! switch to header here
  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        let content = otherItem.querySelector(".accordion-content");
        if (content.style.display !== "none") {
          content.style.display = "none";
        }
      }
    });
  });
});

const deleteButton = (sectionArray, newItem, listID) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", () => {
    let removeItem = sectionArray.indexOf(newItem);
    if (removeItem !== -1) {
      console.log("delete " + sectionArray[removeItem]);
      sectionArray.splice(removeItem, 1);

      //! Need to update the DOM again after you splice from the array
      updateList(sectionArray, listID);
    }
  });

  return deleteButton;
};

function updateIsFlagged() {
  dailyEntryObj.isFlagged = true;
  console.log("Flagged entry");
}

flagButton.addEventListener("click", () => {
  updateIsFlagged();
});

function updateJournal() {
  let newJournalInput = document.getElementById("fillableEntry");
  // let updateJournal = newJournalInput.textContent;
  dailyEntryObj.journal = newJournalInput.textContent;
}

saveEntryBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updateJournal();
  console.log("Updated journal property");
  console.log(dailyEntryObj);
});

Array.from(radioChoices).forEach((radio) => {
  radio.addEventListener("change", function () {
    if (radio.name === "emotionTracker") {
      dailyEntryObj.emotionTracker = this.value;
      console.log("Emotion selected");
    } else if (radio.name === "waterTracker") {
      dailyEntryObj.waterTracker = this.value;
      console.log("Water selected");
    }
  });
});

const updateMedList = (medArray, listID) => {
  let updatingList = document.getElementById(listID);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;

    let deleteBtn = deleteButton(medArray, updatedItem, listID);
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  updatingList.appendChild(fragment);
};

function addItem(sectionArray, inputID, btnID, listID) {
  let addForm = document.getElementById(btnID);

  addForm.addEventListener("click", (event) => {
    event.preventDefault();
    addItemToArray(sectionArray, inputID, listID);
    console.log("New item added to section!");
  });
}

function addItemToArray(sectionArray, inputID, listID) {
  let newItemInput = document.getElementById(inputID);
  let newItemText = newItemInput.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listID);
    newItemInput.value = "";
  }
}

const updateList = (sectionArray, listID) => {
  let updatingList = document.getElementById(listID);
  updatingList.innerHTML = "";
  sectionArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;

    const fragment = document.createDocumentFragment();

    fragment.append(newItem); // Append the new item to the fragment
    updatingList.append(fragment);
  });

  console.log("Updated list");
  console.log("Exercises: " + exercises, "Habits: " + habits);
};

// Calling function for adding items to exercise section
addItem(exercises, "newExercise", "addExerciseBtn", "exerciseList");
// Calling function for adding items to habit section
addItem(habits, "newHabit", "addHabitBtn", "habitList");

addMedItem(medications, "addMedicationBtn", "medList");

dailyEntryObj;
