const exercises = [];
const habits = [];
const medications = [];

const dailyEntry = {
  date: new Date(),
  journal: "",
  isFlagged: false,
  emotionTracker: null,
  waterTracker: null,
  medications: [],
  exercises: [],
  habits: [],
};

// DOM Variables
const form = document.getElementById("dailyEntry");
const newMedInput = document.getElementById("newMedication").value; //added value here to change in addMedItem()
const medCountInput = document.getElementById("medCount").value; // added same
let addMedForm = document.querySelector("#addMedicationForm");
let accordionItems = document.querySelectorAll(".accordion-item");
const flags = document.querySelectorAll(".flag");

function addMedItem(medArray, medBtnID, medListID) {
  let addForm = document.getElementById(medBtnID);
  let date = new Date();

  addForm.addEventListener("click", (event) => {
    // const newMedItemInput = document.getElementById(medInput);
    // const newMedItemValue = newMedItemInput.value;
    // const newMedCountInput = document.getElementById(countInput);
    // const newMedCountValue = newMedCountInput.value;
    event.preventDefault();
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

// Event Listeners
// addMedForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   addMedication();
// });

// for (const flag of flags)
//   flag.addEventListener("click", () => {
//     flag.style.backgroundColor = "#e5989b";
//     setTimeout(() => {
//       flag.style.backgroundColor = "#83c5be";
//     }, 1000);
//   })
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

// General functions
function updateJournalEntry() {
  const journalInput = document.getElementById("fillableEntry");
  dailyEntry.journalEntry = journalInput.value;
}

const updateMedList = (medArray, listID) => {
  // let updatingList = createList(containerID, listID);
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
  // console.log("Updated list");
  // console.log("Exercises: " + exercises, "Habits: " + habits);
};

function addItem(sectionArray, inputID, btnID, listID) {
  let addForm = document.getElementById(btnID);
  let date = new Date();
  console.log(date);
  addForm.addEventListener("click", (event) => {
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
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateJournalEntry();

    console.log("Daily Entry weee: ", dailyEntry);
  });
}

// function createList(containerID, listID) {
//   let existingList = document.getElementById(listID);
//   if (!existingList) {
//     let list = document.createElement("ul");
//     list.id = listID;
//     document.getElementById(containerID).appendChild(list);
//     return list;
//   }
//   return existingList;
// }

const updateList = (sectionArray, listID) => {
  // let updatingList = createList(containerID, listID);
  let updatingList = document.getElementById(listID);
  updatingList.textContent = "";
  const fragment = document.createDocumentFragment();

  sectionArray.forEach((updatedItem) => {
    let newItem = document.createElement("li");
    newItem.textContent = updatedItem;
    let deleteBtn = deleteButton(sectionArray, updatedItem, listID);
    newItem.append(deleteBtn); // Append the delete button to the new item
    fragment.appendChild(newItem); // Append the new item to the fragment
  });
  updatingList.appendChild(fragment);
  console.log("Updated list");
  console.log("Exercises: " + exercises, "Habits: " + habits);
};

// Calling function for adding items to exercise section
addItem(
  exercises,
  "newExercise",
  "addExerciseForm",
  "exerciseList",
  "addExercise"
);
// Calling function for adding items to habit section
addItem(habits, "newHabit", "addHabitForm", "habitList", "addHabit");

addMedItem(medications, "addMedicationBtn", "medList");

addItem(null, "fillableEntry", "dailyEntry", null, "submitButton");
