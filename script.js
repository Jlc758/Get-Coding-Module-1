// ----------------- Daily Entry Form Object ----------------- //
const dailyEntry = {
  date: new Date().toISOString().slice(0, 10),
  journalEntry: "",
  isFlagged: false,
  emotionTracker: "",
  waterTracker: "",
  medications: [],
  exercises: [],
  habits: [],
};

// DOM Variables
const form = document.getElementById("dailyEntry");
const accordionItems = document.querySelectorAll(".accordion-item");

//-----------------Accordion-----------------//
accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  let header = item.querySelector(".accordion-header");
  console.log("content", content);

  content.style.display = "none";

  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }

    // accordionItems.forEach((otherItem) => {
    //   if (otherItem !== item) {
    //     let content = otherItem.querySelector(".accordion-content");
    //     if (content.style.display !== "none") {
    //       content.style.display = "none";
    //     }
    //   }
    // });
  });
});

//----------General Functions-----------//
const deleteButton = (sectionArray, index, listElement) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", () => {
    sectionArray.splice(index, 1); // Delete using index
    if (listElement.id === "medList") {
      // If it's the medication list, call updateMedList
      updateMedList(sectionArray, listElement);
    } else {
      // For other lists, call updateList
      updateList(sectionArray, listElement);
    }
  });

  return deleteButton;
};

//----------- Journal Entry-----------//
const journalInput = document.getElementById("fillableEntry");
const flag = document.getElementById("flag");

function updateJournalEntry(input) {
  const value = input.value.trim();
  dailyEntry.journalEntry = value;
}

function listenForFlagClick(flag) {
  flag.addEventListener("click", () => {
    dailyEntry.isFlagged = !dailyEntry.isFlagged;
  if (dailyEntry.isFlagged) {
    flag.classList.add("flagged");
  } else {
    flag.classList.remove("flagged");
  }
  });
};

//-----------Radio Trackers-----------//
function getSelectedRadioValue(name) {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return "";
}

//--------Medication Tracker----------//
const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const newMedInput = document.getElementById("newMedication");
const medCountInput = document.getElementById("medCount");

function addMedItem(medArray, medInput, countInput, medBtn, medList) {
  medBtn.addEventListener("click", () => {
    const newMedItemValue = medInput.value.trim();
    const newMedCountValue = countInput.value;

    if (newMedItemValue && newMedCountValue > 0) {
      const medObject = {
        MedText: newMedItemValue,
        MedCount: newMedCountValue,
      };

      medArray.push(medObject);
      updateMedList(medArray, medList);
      medInput.value = "";
      countInput.value = "";
    }
  });
}

const updateMedList = (medArray, medList) => {
  medList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;
    let deleteBtn = deleteButton(medArray, index, medList); // Pass index here
    newItem.append(deleteBtn);
    fragment.appendChild(newItem);
  });

  medList.appendChild(fragment);
};

//---------Exercise & Habit Trackers-----------//
const newExerciseInput = document.getElementById("newExercise");
const addExerciseBtn = document.getElementById("addExerciseBtn");
const exerciseList = document.getElementById("exerciseList");

const newHabitInput = document.getElementById("newHabit");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

function addItem(sectionArray, input, addBtn, listElement) {
  addBtn.addEventListener("click", () => {
    addItemToArray(sectionArray, input, listElement);
    console.log("New item added to section!");
  });
}

function addItemToArray(sectionArray, input, listElement) {
  let newItemText = input.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listElement);
    input.value = "";
  }
}

const updateList = (sectionArray, listElement) => {
  listElement.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, index, listElement); // Pass index here
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  listElement.appendChild(fragment);
};

//--------- Function Execution, Event Handling and Form Submission -----------//

// Calling function for adding items to medication section
addMedItem(
  dailyEntry.medications,
  newMedInput,
  medCountInput,
  addMedBtn,
  medList
);

// Calling function for adding items to exercise section
addItem(dailyEntry.exercises, newExerciseInput, addExerciseBtn, exerciseList);
// Calling function for adding items to habit section
addItem(dailyEntry.habits, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
listenForFlagClick(flag);

// Listening for form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateJournalEntry(journalInput);
  dailyEntry.emotionTracker = getSelectedRadioValue("emotionTracker");
  dailyEntry.waterTracker = getSelectedRadioValue("waterTracker");
  
  console.log("Form submitted: ", dailyEntry);
});
