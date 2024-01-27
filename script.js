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
  //   let removeItem = sectionArray.indexOf(newItem);
  //   if (removeItem !== -1) {
  //     console.log("delete " + sectionArray[removeItem]);
  //     sectionArray.splice(removeItem, 1);

  //     updateList(sectionArray, listElement);
  //   }
  // });

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

// --=-------- Radio Trackers ---------- //
let radioChoices = document.getElementsByClassName("radioChoices");

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

// ---------- Medication Tracker ---------- //

const updateMedList = (medArray, listElement) => {
  let updatingList = document.getElementById(listElement);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  medArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${updatedItem.MedText} - Count: ${updatedItem.MedCount}`;

    let deleteBtn = deleteButton(medArray, updatedItem, listElement);
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  updatingList.appendChild(fragment);
};

function addMedItem(medArray, medBtnID, medlistElement) {
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
      updateMedList(medArray, medlistElement);
      newMedInput = "";
      medCountInput = "";
    }
  });
}

// ---------- Exercise & Habit Trackers ---------- //
let addMedForm = document.querySelector("#addMedicationForm");

function addItem(sectionArray, inputID, btnID, listElement) {
  let addForm = document.getElementById(btnID);

  addForm.addEventListener("click", (event) => {
    event.preventDefault();
    addItemToArray(sectionArray, inputID, listElement);
    console.log("New item added to section!");
  });
}

function addItemToArray(sectionArray, inputID, listElement) {
  let newItemInput = document.getElementById(inputID);
  let newItemText = newItemInput.value.trim();

  if (newItemText) {
    sectionArray.push(newItemText);
    updateList(sectionArray, listElement);
    newItemInput.value = "";
  }
}

const updateList = (sectionArray, listElement) => {
  let updatingList = document.getElementById(listElement);
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

// --------- Function Execution, Event Handling, & Form Submission --------- //

// Calling function for adding items to exercise section
addItem(exercises, "newExercise", "addExerciseBtn", "exerciseList");
// Calling function for adding items to habit section
addItem(habits, "newHabit", "addHabitBtn", "habitList");

addMedItem(medications, "addMedicationBtn", "medList");
