// ---------- Daily Entry Form Object ---------- //
const dailyEntryObj = {
  date: new Date().toISOString().slice(0, 10),
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
const accordionItems = document.querySelectorAll(".accordion-item");

// ---------- Accordion ---------- //
accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");

  let header = item.querySelector(".accordion-header");
  // console.log("content", content);

  content.style.display = "none";

  header.addEventListener("click", (event) => {
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }
  });
});

//     accordionItems.forEach((otherItem) => {
//       if (otherItem !== item) {
//         let content = otherItem.querySelector(".accordion-content");
//         if (content.style.display !== "none") {
//           content.style.display = "none";
//         }
//       }
//     });
//   });
// });

// ---------- General Functions ---------- //

const deleteButton = (sectionArray, index, listElement) => {
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "X";

  deleteButton.addEventListener("click", () => {
    sectionArray.splice(index, 1); //delete using index
    if (listElement.id === "medList") {
      // if it's in the medication list, call updateMedList
      updateMedList(sectionArray, listElement);
    } else {
      // for other lists, call update list
      updateList(sectionArray, listElement);
    }
  });

  return deleteButton;
};

// ---------- Journal Entry ---------- //
const journalInput = document.getElementById("fillableEntry");
const flagButton = document.getElementById("flag");

function updateJournalEntry(input) {
  const value = input.value.trim();
  dailyEntryObj.journal = value;
}

function flagClick(flag) {
  flag.addEventListener("click", () => {
    dailyEntryObj.isFlagged = !dailyEntryObj.isFlagged;
    if (dailyEntryObj.isFlagged) {
      flag.classList.add("flagged");
    } else {
      flag.classList.remove("flagged");
    }
  });
}

// --=-------- Radio Trackers ---------- //

function radioValue(name) {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
    return "";
  }
}

// ---------- Medication Tracker ---------- //
const addMedBtn = document.getElementById("addMedicationBtn");
const medList = document.getElementById("medList");
const medInput = document.getElementById("newMedication");
const countInput = document.getElementById("medCount");

function addMedItem(medArray, medInput, countInput, addMedBtn, medList) {
  addMedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newMedItemValue = medInput.value.trim();
    const newMedCountValue = countInput.value;

    if (newMedItemValue && newMedCountValue > 0) {
      let medObject = {
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
    let deleteBtn = deleteButton(medArray, index, medList); //pass index here
    newItem.append(deleteBtn);
    fragment.appendChild(newItem);
  });

  medList.appendChild(fragment);
};

// ---------- Exercise & Habit Trackers ---------- //

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
    let deleteBtn = deleteButton(sectionArray, index, listElement); //pass index here
    newItem.append(deleteBtn); // append the delete button to the new item
    fragment.appendChild(newItem); // append the new item to the fragment
  });
  listElement.appendChild(fragment);
};

// --------- Function Execution, Event Handling, & Form Submission --------- //

// Calling function for adding items to medication section
addMedItem(dailyEntryObj.medications, medInput, countInput, addMedBtn, medList);

// Calling function for adding items to exercise section
addItem(
  dailyEntryObj.exercises,
  newExerciseInput,
  addExerciseBtn,
  exerciseList
);

// Calling function for adding items to habit section
addItem(dailyEntryObj.habits, newHabitInput, addHabitBtn, habitList);

// Listening for flag click
flagClick(flag);

// Listening for form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateJournalEntry(journalInput);
  dailyEntryObj.emotionTracker = radioValue("emotionTracker");
  dailyEntryObj.waterTracker = radioValue("waterTracker");

  console.log("Form Submitted: ", dailyEntryObj);
});
